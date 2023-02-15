<template>
  <div>
    <a-table :columns="columns" :data-source="data" :pagination="pagination">
      <!-- <span slot="action">
        <a @click="handleDeleteModal">删除</a>
      </span> -->
    </a-table>
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

import { getModelList } from '@/api/project'
export default {
  name: '',
  components: {},
  props: ['uuid'],
  data() {
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '模型ID',
        dataIndex: 'modelId',
        key: 'modelId'
      },
      {
        title: '版本',
        dataIndex: 'modelVersion',
        key: 'modelVersion'
      },
      {
        title: '创建时间',
        key: 'createTime',
        dataIndex: 'createTime'
      }
      // {
      //   title: '操作',
      //   key: 'action',
      //   scopedSlots: { customRender: 'action' }
      // }
    ]

    const data = [
      {
        componentName: '123',
        createTime: '123',
        jobName: '123',
        jobUuid: '123',
        modelId: '123',
        modelVersion: '123',
        name: '123',
        partyId: 123,
        projectName: '123',
        projectUuid: '123',
        role: '123',
        uuid: '123'
      }
    ]

    return {
      data,
      columns,
      pagination: {
        total: 0,
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ["1","10", "20", "50", "100"],
        showTotal: total => `共有 ${total} 条数据`,
      },
    }
  },
  watch: {
    uuid: {
      handler(newValue, oldValue) {
        console.log(newValue, oldValue)
        getModelList(newValue).then(response => {
          if (response.code === 0) {
            this.data = response.data
          } else {
            alert(res.message)
          }
        })
      },
      immediate: true
    }
  },
  methods: {}
}
</script>

<style scoped></style>
