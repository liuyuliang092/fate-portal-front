<template>
  <div>
    <a-button-group style="margin-bottom: 10px;"
      ><a-button @click="handleFileDownload(originData.dataId)"> <a-icon type="vertical-align-bottom" />下载 </a-button>
      <a-button @click="handleDeleteClick(originData.dataId)"> <a-icon type="delete" />删除</a-button></a-button-group
    >
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false" style="margin-bottom: 20px;">
      <a-descriptions>
        <a-descriptions-item label="名称" :span="3">
          {{ originData.name }}
        </a-descriptions-item>
        <a-descriptions-item label="ID" :span="3">
          {{ originData.dataId }}
        </a-descriptions-item>
        <a-descriptions-item label="描述" :span="3">
          特征量：{{ originData.featureSize }} 样本量：{{ originData.sampleSize }}
        </a-descriptions-item>
        <a-descriptions-item label="数据文件" :span="3">
          <a @click="handleFileDownload(originData.dataId)">{{ originData.filename }}</a>
        </a-descriptions-item>
        <a-descriptions-item label="表格名称" :span="3">
          {{ originData.tableName }}
        </a-descriptions-item>
        <a-descriptions-item label="上传任务状态" :span="3">
          <a-tag color="green">
            {{ originData.uploadJobStatus === 0 ? '已成功' : '失败' }}
          </a-tag>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false" style="margin-bottom: 20px;">
      <h3>数据概览</h3>
      <hr style="height:1px;border:none;border-top:1px solid  gray;" />
      <a-descriptions>
        <a-descriptions-item label="样本数量" :span="3">
          {{ originData.featureSize }}
        </a-descriptions-item>
        <!-- <a-descriptions-item label="ID Metadata" :span="3">
          <a-switch default-checked @change="onChange" />
        </a-descriptions-item> -->
        <a-descriptions-item label="特征大小" :span="3">
          {{ originData.featuresArray }}
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <h3>数据预览（仅显示前十行）</h3>

      <a-table :columns="columns" :data-source="data"> </a-table>
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

import { getDataDetailInfo, downloadDataFile } from '@/api/data'
const columns = [
  {
    dataIndex: 'id',
    key: 'id',
    title: 'id'
  },
  {
    title: 'x0',
    dataIndex: 'x0',
    key: 'x0'
  },
  {
    title: 'x1',
    dataIndex: 'x1',
    key: 'x1'
  },
  {
    title: 'x2',
    dataIndex: 'x2',
    key: 'x2'
  },
  {
    title: 'x3',
    dataIndex: 'x3',
    key: 'x3'
  },
  {
    title: 'x4',
    dataIndex: 'x4',
    key: 'x4'
  },
  {
    title: 'x5',
    dataIndex: 'x5',
    key: 'x5'
  },
  {
    title: 'x6',
    dataIndex: 'x6',
    key: 'x6'
  },
  {
    title: 'x7',
    dataIndex: 'x7',
    key: 'x7'
  },
  {
    title: 'x8',
    dataIndex: 'x8',
    key: 'x8'
  },
  {
    title: 'x9',
    dataIndex: 'x9',
    key: 'x9'
  }
]

const data = [
  {
    x0: '1',
    id: 'John Brown',
    x1: '32',
    x2: '55',
    x3: '32',
    x4: '55',
    x5: '32',
    x6: '55',
    x7: '32',
    x8: '55',
    x9: '55'
  }
]
export default {
  name: 'data-info',
  data() {
    return {
      originData: {
        creationTime: '123',
        dataId: '123',
        description: '123',
        featuresArray: ['X1', 'X2', 'X3'],
        featureSize: 123,
        filename: '123.CSV',
        name: '123',
        previewArray: '1,2,3',
        sampleSize: 123,
        tableName: 'TABLENAME',
        uploadJobStatus: 0
      },
      data,
      columns,
      visibleDelete: false,
      confirmLoadingDelete: false,
      tmpDelDataId: ''
    }
  },
  methods: {
    onChange(checked) {
      console.log(`a-switch to ${checked}`)
    },
    handleDeleteClick(dataId) {
      this.visibleDelete = true
      this.tmpDelDataId = dataId
    },

    handleDeleteOk(e) {
      this.confirmLoadingDelete = true
      if (this.tmpDelDataId) {
        deleteDataFile(this.tmpDelDataId).then(res => {
          if (res.code === 0) {
            setTimeout(() => {
              this.visibleDelete = false
              this.confirmLoadingDelete = false
              this.tmpDelDataId = ''
            }, 2000)
            alert('删除成功')
          }
        })
      }
    },
    handleDeleteCancel(e) {
      console.log('Clicked cancel button')
      this.visibleDelete = false
      this.tmpDelDataId = ''
    },
    handleFileDownload(dataId) {
      downloadDataFile(dataId)
    }
  },
  mounted() {
    const dataId = this.$route.params
    getDataDetailInfo(dataId).then(response => {
      if (response.code === 0) {
        this.originData = response.data
      } else {
        this.$message.error('请求数据详细信息失败')
      }
    })
  }
}
</script>
<style scoped></style>
