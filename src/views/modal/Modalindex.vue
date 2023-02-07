<template>
  <div>
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <div style="margin-bottom: 10px;" class="head">
        <div class="headleft"></div>
        <div class="headright">
          <a-input-search placeholder="输入搜索内容" v-model="searchName" style="width: 200px" @search="onSearch" />
          <a-button type="dashed" @click="handleModelReload"><a-icon type="reload"/></a-button>
        </div>
      </div>

      <a-table :columns="columns" :data-source="data" :key="data.name">
        <span slot="action" slot-scope="record">
          <a @click="handleModelDownload(record.uuid)">下载</a>
          <a-divider type="vertical" />
          <a @click="handleDeleteClick(record.uuid)">删除</a>
        </span>
      </a-table>
      <a-modal
        title="您想要删除这个模型吗？"
        :visible="visibleDelete"
        :confirm-loading="confirmLoadingDelete"
        @ok="handleDeleteOk"
        @cancel="handleDeleteCancel"
      >
        <p>模型删除后无法被恢复</p>
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

import { deleteModel } from '@/api/model'
export default {
  name: 'modal-index',
  data() {
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        filteredValue: this.searchName ? this.searchName : null
      },
      {
        title: '模型ID',
        dataIndex: 'model_id',
        key: 'model_id'
      },
      {
        title: '模型版本',
        dataIndex: 'model_version',
        key: 'model_version'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time'
      },
      {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' }
      }
    ]
    return {
      searchName: '',
      columns,
      visible: false,
      confirmLoading: false,
      fileList: [],
      visibleDelete: false,
      confirmLoadingDelete: false,
      tmpDelModel: ''
    }
  },
  methods: {
    onSearch(value) {
      console.log('搜索：' + value)
      if (this.searchName && this.searchName !== '') {
        this.data = this.data.filter(p => p.name.indexOf(this.searchName) !== -1)
      } else {
        this.$store.dispatch('getModelList')
      }
    },
    handleModelReload() {
      this.$store.dispatch('getModelList')
    },
    handleModelDownload(uuid) {
      //下载模型
      console.log('下载模型：' + uuid)
    },
    showModal() {
      this.visible = true
    },

    handleDeleteClick(id) {
      this.visibleDelete = true
      this.tmpDelModel = id
    },

    handleDeleteOk(e) {
      if (this.tmpDelModel) {
        this.confirmLoadingDelete = true
        console.log('删除模型：' + this.tmpDelModel)
        deleteModel(this.tmpDelModel)
        setTimeout(() => {
          this.visibleDelete = false
          this.confirmLoadingDelete = false
          this.tmpDelModel = ''
        }, 2000)
        //删除成功后
        this.$store.dispatch('getModelList')
      }
    },
    handleDeleteCancel(e) {
      console.log('Clicked cancel button')
      this.visibleDelete = false
      this.tmpDelModel = ''
    }
  },
  computed: {
    data: {
      get: function() {
        return this.$store.getters.modelList
      },
      set: function(newValue) {
        this.$store.dispatch('setModelList', newValue)
      }
    }
  },
  created() {
    this.$store.dispatch('getModelList')
  }
}
</script>
<style scoped>
.head {
  display: flex;
  justify-content: space-between;
}
</style>
