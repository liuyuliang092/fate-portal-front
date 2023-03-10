<template>
  <div>
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <div style="margin-bottom: 10px" class="head">
        <div class="headleft">
          <a-button @click="showModal"> <a-icon type="to-top" />上传本地数据 </a-button>
        </div>
        <div class="headright">
          <a-input-search v-model="searchName" placeholder="输入搜索内容" style="width: 200px" @search="onSearch" />

          <a-button type="dashed" @click="handleReloadDataList"><a-icon type="reload" /></a-button>
        </div>
      </div>

      <a-table :columns="columns" :data-source="data" :pagination="pagination">
        <span slot="name" slot-scope="text, record">
          <a @click="handleInfoClick(record.dataId)">{{ record.name }}</a>
        </span>
        <span slot="desc" slot-scope="text, record">
          特征量：{{ record.featureSize }} 样本量：{{ record.sampleSize }}
        </span>
        <span slot="tag" slot-scope="tag">
          <a-tag color="green">
            {{ tag === 0 ? '已成功' : '失败' }}
          </a-tag>
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleFileDownload(record.dataId)">下载</a>
          <a-divider type="vertical" />
          <a @click="handleDeleteClick(record.dataId)">删除</a>
        </span>
      </a-table>
      <ChunkUpload ref="ChunkUpload"></ChunkUpload>
      <a-modal
        title="您想要删除这条数据吗？"
        :visible="visibleDelete"
        :confirm-loading="confirmLoadingDelete"
        @ok="handleDeleteOk"
        @cancel="handleDeleteCancel"
      >
        <p>数据删除后无法被恢复</p>
      </a-modal>
    </a-card>
  </div>
</template>

<script>
/**
 *
 *  Copyright 2019 The FATE Authors. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

import { deleteDataFile, uploadLocalData, downloadDataFile } from '@/api/data'
import ChunkUpload from './ChunkUpload.vue'

export default {
  name: 'data-index',
  components: { ChunkUpload },
  data() {
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        filteredValue: this.searchName ? this.searchName : null,
        scopedSlots: { customRender: 'name' }
      },
      {
        title: '数据ID',
        dataIndex: 'dataId',
        key: 'dataId'
      },
      {
        title: '创建时间',
        dataIndex: 'creationTime',
        key: 'creationTime'
      },
      {
        title: '简介',
        dataIndex: 'desc',
        key: 'desc',
        scopedSlots: { customRender: 'desc' }
      },
      {
        title: '上传任务状态',
        key: 'uploadJobStatus',
        dataIndex: 'uploadJobStatus',
        scopedSlots: { customRender: 'tag' }
      },
      // {
      //   title: '操作',
      //   key: 'action',
      //   scopedSlots: { customRender: 'action' }
      // }
    ]
    return {
      searchName: '',
      tmpDelDataId: '',
      columns,
      visible: false,
      confirmLoading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '请输入数据名称', trigger: 'blur' }],
        description: [{ required: true, message: '请输入数据描述', trigger: 'blur' }]
      },
      fileList: [],
      visibleDelete: false,
      confirmLoadingDelete: false,
      pagination: {
        total: 0,
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],
        showTotal: total => `共有 ${total} 条数据`,
      },
    }
  },
  computed: {
    data: {
      get: function () {
        console.info('data list = ', this.$store.getters.dataList)
        return this.$store.getters.dataList
      },
      set: function (newValue) {
        this.$store.dispatch('setDataList', newValue)
      }
    }
  },
  methods: {
    handleFileDownload(dataId) {
      console.info('data uuid = ', dataId)
      downloadDataFile(dataId)
    },
    onSearch(value) {
      console.log(value)
      if (this.searchName && this.searchName !== '') {
        this.data = this.data.filter(p => p.name.indexOf(this.searchName) !== -1)
      } else {
        this.$store.dispatch('getDataList')
      }
    },
    handleReloadDataList() {
      this.$store.dispatch('getDataList')
    },
    handleInfoClick(dataId) {
      console.log(dataId)
      this.$router.push({ name: 'data-info', params: dataId }).catch(() => {
        console.log('跳转出错,这个错误从哪里来的')
      })
    },
    showModal() {
      this.$refs.ChunkUpload.showModal();
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file]
      return false
    },
    handleOk(e) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
        } else {
          console.log('error submit!!')
          return false
        }
      })
      const { fileList } = this
      const formData = new FormData()
      fileList.forEach(file => {
        formData.append('file', file)
      })
      this.uploading = true
      uploadLocalData(formData, this.form.name, this.form.description).then(response => {
        if (response.code === 0) {
          this.fileList = []
          this.uploading = false
          this.$message.success('upload successfully.')
          this.$store.dispatch('getDataList')
        } else {
          this.uploading = false
          this.$message.error('upload failed.')
        }
      })
      this.confirmLoading = true
    },
    handleDeleteClick(id) {
      this.visibleDelete = true
      this.tmpDelDataId = id
    },
    handleCancel(e) {
      console.log('Clicked cancel button')
      this.visible = false
    },
    //删除数据
    handleDeleteOk(e) {
      this.confirmLoadingDelete = true
      if (this.tmpDelDataId) {
        deleteDataFile(this.tmpDelDataId).then(res => {
          if (res.code === 0) {
            this.visibleDelete = false
            this.confirmLoadingDelete = false
            this.tmpDelDataId = ''
            // setTimeout(() => {
            //   this.visibleDelete = false
            //   this.confirmLoadingDelete = false
            //   this.tmpDelDataId = ''
            // }, 2000)
            this.$store.dispatch('getDataList')
          }
        })
      }
    },
    handleDeleteCancel(e) {
      console.log('Clicked cancel button')
      this.visibleDelete = false
      this.tmpDelDataId = ''
    }
  },
  mounted() {
    this.$store.dispatch('getDataList')
  }
}
</script>
<style scoped>
.head {
  display: flex;
  justify-content: space-between;
}
</style>
