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

      <a-table :columns="columns" :data-source="data">
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
      <a-modal
        title="上传本地数据"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
        ok-text="上传"
        cancel-text="取消"
      >
        <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-model-item label="名称" ref="name" prop="name">
            <a-input
              v-model="form.name"
              @blur="
                () => {
                  $refs.name.onFieldBlur()
                }
              "
            />
          </a-form-model-item>
          <a-form-model-item label="描述" prop="description">
            <a-input v-model="form.description" type="textarea" />
          </a-form-model-item>
          <a-form-model-item label="文件">
            <a-upload :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload">
              <a-button> <a-icon type="folder" /> BROWSE </a-button>
            </a-upload>
          </a-form-model-item>
        </a-form-model>
      </a-modal>
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
import { deleteDataFile, uploadLocalData, downloadDataFile } from '@/api/data'

export default {
  name: 'data-index',
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
      {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' }
      }
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
      confirmLoadingDelete: false
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
      this.visible = true
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
      // formData.append('name', this.form.name)
      // formData.append('description', this.form.description)
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
      // You can use any AJAX library you like
      // reqwest({
      //   url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      //   method: 'post',
      //   processData: false,
      //   data: formData,
      //   success: () => {
      //     this.fileList = []
      //     this.uploading = false
      //     this.$message.success('upload successfully.')
      //   },
      //   error: () => {
      //     this.uploading = false
      //     this.$message.error('upload failed.')
      //   }
      // })
      this.confirmLoading = true

      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
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
