<template>
  <div>
    <a-button @click="handleCreate" class="create-btn"> 新建任务 </a-button>
    <a-table :columns="columns" :data-source="data">
      <span slot="action" slot-scope="record">
        <a-space>
          <a @click="handleControlClick(record)">进入工作台</a>
          <a @click="handleDelete(record)">删除</a>
        </a-space>
      </span>
      <span slot="type" slot-scope="record">
        <a-space>
          <div v-if="record.type==0">模型训练</div>
        </a-space>
      </span>
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

import { getJobListForProject } from '@/api/project'
import { deleteJob } from '@/api/task'
export default {
  name: 'task-manage',
  components: {},
  props: {
    uuid: {}
  },
  data() {
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'creationTime',
        key: 'creationTime'
      },
      {
        title: '完成时间',
        dataIndex: 'finishTime',
        key: 'finishTime'
      },
      {
        title: 'ID',
        key: 'fateJobId',
        dataIndex: 'fateJobId'
      },
      {
        title: '任务类型',
        dataIndex: 'type',
        key: 'type',
        scopedSlots: { customRender: 'type' }
      },
      {
        title: '发起者',
        dataIndex: 'initiatingSiteName',
        key: 'initiatingSiteName'
      },
      {
        title: '状态',
        key: 'statusStr',
        dataIndex: 'statusStr',
        scopedSlots: { customRender: 'statusStr' }
      },
      {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' }
      }
    ]

    const data = []

    return {
      data: [],
      columns,
      projectUuid: ''
    }
  },
  mounted() {
    this.projectUuid = this.uuid ? this.uuid : this.$route.params.uuid
  },

  methods: {
    handleCreate() {
      this.$router.push({ name: 'project/newTask', params: { projectUuid: this.projectUuid } }).catch(() => {
        console.log('登录跳转首页出错,这个错误从哪里来的')
      })
    },

    handleControlClick(record) {
      console.info('controlClick = ', record)
      this.$router.push({ name: 'butterfly/algoDag', params: { projectUuid: this.projectUuid, taskUuid: record.uuid } }).catch(() => {
        console.log('跳转出错,这个错误从哪里来的')
      })
    },

    handleDelete(record) {
      console.info('delete = ', record)
      deleteJob(record.uuid).then(res=>{
        if(res.code === 0){
          this.$message.success(res.message);
        }else{
          this.$message.warning(res.message);
        }
        getJobListForProject(record.projectUuid).then(response => {
          if (response.code === 0) {
            this.data = response.data.records
          }
        })
      })
    }
  },

  watch: {
    projectUuid: {
      handler(newValue, oldValue) {
        console.log('new uuid = ', newValue, 'old uuid = ', oldValue)
        getJobListForProject(newValue).then(response => {
          if (response.code === 0) {
            this.data = response.data.records
            console.log("all jobs")
          }
        })
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.create-btn {
  margin-bottom: 10px;
}
</style>
