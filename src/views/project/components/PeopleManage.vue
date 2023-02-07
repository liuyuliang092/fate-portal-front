<template>
  <div>
    <a-button @click="handleCreate" class="create-btn"> 邀请新成员 </a-button>
    <a-table :columns="columns" :data-source="data">
      <span slot="action" slot-scope="text, record">
        <a>删除</a>
      </span>
    </a-table>
    <!-- <a-pagination
      v-model="current"
      :page-size-options="pageSizeOptions"
      :total="total"
      show-size-changer
      :page-size="pageSize"
      @showSizeChange="onShowSizeChange"
    >
      <template slot="buildOptionText" slot-scope="props">
        <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
        <span v-if="props.value === '50'">全部</span>
      </template>
    </a-pagination> -->
    <a-modal
      title="邀请新成员"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-table
        :columns="membercolumns"
        :data-source="memberdata"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      >
      </a-table>
    </a-modal>
  </div>
</template>
<script>
import { getParticipantList, inviteOtherSiteToProject } from '@/api/project'
export default {
  name: '',
  components: {},
  props: ['uuid'],
  data() {
    const membercolumns = [
      {
        title: '名称',
        key: 'siteName',
        dataIndex: 'siteName'
      },
      {
        title: '创建时间',
        key: 'creationAt',
        dataIndex: 'creationAt'
      },
      {
        title: '角色',
        dataIndex: 'role',
        key: 'role'
      },
      {
        title: '状态',
        key: 'status',
        dataIndex: 'status'
      }
    ]
    const memberdata = []
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '组织ID',
        dataIndex: 'partyId',
        key: 'partyId'
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description'
      },
      {
        title: '创建时间',
        key: 'createTime',
        dataIndex: 'createTime'
      },
      {
        title: '角色',
        dataIndex: 'role',
        key: 'role'
      },
      {
        title: '状态',
        key: 'status',
        dataIndex: 'status'
      },
      {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' }
      }
    ]

    return {
      data: [],
      columns,
      membercolumns,
      memberdata,
      visible: false,
      confirmLoading: false,
      selectedRowKeys: [],
      // pageSizeOptions: ['10', '20', '30', '40', '50'],
      // current: 1,
      // pageSize: 10,
      // total: 50,
    }
  },
  methods: {
    handleCreate() {
      this.visible = true
      let uuid = this.uuid;
      getParticipantList(uuid, true).then(response => {
        if (response.code === 0) {
          this.memberdata = response.data
        } else {
          alert(response.message)
        }
      })

    },
    handleOk(e) {
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      inviteOtherSiteToProject(this.memberdata[this.selectedRowKeys], this.uuid).then(res => {
        if (res.code === 0) {
          this.$message.success('invite success');
          this.getParticipantList(this.uuid);
        } else {
          this.$message.warning('invite failed');
        }
        this.visible = false
      })
    },
    handleCancel(e) {
      this.visible = false
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    getParticipantList(projectUuid) {
      getParticipantList(projectUuid, false).then(response => {
        if (response.code === 0) {
          this.data = response.data
        } else {
          this.$message.warning(response.message);
        }
      })
    }

    // onShowSizeChange(current, pageSize) {
    //   getParticipantList(newValue, current, this.pageSize).then(response => {
    //     if (response.code === 0) {
    //       this.data = response.data.records
    //       this.total = response.data.total
    //     } else {
    //       alert(res.message)
    //     }
    //   })
    //   this.pageSize = pageSize;
    // }
  },
  watch: {
    uuid: {
      handler(newValue, oldValue) {
        this.getParticipantList(newValue);
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
.ant-pagination {
  text-align: right;
}
</style>
