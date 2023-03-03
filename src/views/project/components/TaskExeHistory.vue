<template>
  <div class="task-exe-his-container">
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <a-button type="link" class="back" @click="handleBack"> <a-icon type="double-left" />返回</a-button>
      <a-table :data-source="exeList" :columns="columns" :pagination='pagination' :rowKey="(record) => record.uuid">
        <span slot="type" slot-scope="text, record">
          <a-space>
            <div v-if="record.type==0">模型训练</div>
          </a-space>
        </span>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import { getTaskExeHis } from '@/api/task'

export default {
  name: 'project-task-exe-his',
  data() {
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        scopedSlots: { customRender: 'name' }
      },
      {
        title: '任务ID',
        // TODO: 确认实际字段名称
        key: 'uuid',
        dataIndex: 'uuid'
      },
      {
        title: 'FATE任务ID',
        key: 'fateJobId',
        dataIndex: 'fateJobId'
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
      // {
      //   title: '操作',
      //   key: 'action',
      //   scopedSlots: { customRender: 'action' }
      // }
    ]
    return {
      projectUuid: '',
      taskUuid: '',
      exeList: [],
      columns,
      pagination: {
        total: 0,
        pageSize: 10,
        current: 1,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],
        showTotal: total => `共有 ${total} 条数据`,
        onChange: (pageNo, pageSize) => this.handlePageChange(pageNo, pageSize),
        onShowSizeChange: (pageNo, pageSize) => this.handlePageChange(pageNo, pageSize)
      },
    }
  },
  mounted() {
    this.projectUuid = this.$route.query.projectUuid
    this.taskUuid = this.$route.query.taskUuid
    this.getTaskExeHis()
  },
  watch: {
    taskUuid: {
      handler(newVal, oldVal) {
        if (newVal && newVal != oldVal) {
          this.getTaskExeHis()
        }
      }
    }
  },
  methods: {
    getTaskExeHis() {
      let opts = {
        taskUuid: this.taskUuid,
        projectUuid: this.projectUuid,
        pageNo: this.pagination.current,
        pageSize: this.pagination.pageSize
      }
      console.log('query-task-exe-his = ', opts)
      getTaskExeHis(opts).then(response => {
        if (response.code === 0) {
          this.exeList = response.data
          // TODO: check with back-end
        }
      })
    },
    handlePageChange(pageNo, pageSize) {
      this.pagination.current = pageNo
      this.pagination.pageSize = pageSize
      this.getTaskExeHis()
    },
    handleBack() {
      this.$router.push({name: 'project-task', params: {uuid: this.projectUuid}})
    }
  }
}
</script>