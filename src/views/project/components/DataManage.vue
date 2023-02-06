<template>
  <div>
    <a-button @click="handleCreate" class="create-btn"> 关联数据 </a-button>
    <a-table :columns="columns" :data-source="data">
      <span slot="action" slot-scope="text, record">
        <a @click="handleDataCancelClick(record.dataUuid)" v-if="record.dataUuid">取消关联</a>
      </span>
    </a-table>
    <a-modal
      title="本地关联数据"
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
import {
  getAssociatedDataListForProject,
  removeLocalDataFromCurrentProject,
  getAvailableLocalDataForProject,
  associateLocalDataToCurrentProject
} from '@/api/project'
export default {
  name: '',
  components: {},
  props: ['uuid', 'participant'],
  data() {
    const membercolumns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '创建时间',
        key: 'creationTime',
        dataIndex: 'creationTime'
      }
    ]
    const memberdata = [
      // {
      //   key: '1',
      //   name: 'portal15',
      //   creationTime: '2022',
      //   dataId: '15',
      //   providingSiteName: '5',
      //   providingSitePartyId: 15,
      //   description: '111',
      //   providingSiteUuid: '456'
      // }
    ]
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '数据提供者',
        dataIndex: 'providingSiteName',
        key: 'providingSiteName'
      },
      {
        title: '数据提供者ID',
        dataIndex: 'providingSitePartyId',
        key: 'providingSitePartyId'
      },
      {
        title: '更新时间',
        key: 'updateTime',
        dataIndex: 'updateTime'
      },
      {
        title: '创建时间',
        key: 'creationTime',
        dataIndex: 'creationTime'
      },
      {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' }
      }
    ]

    const data = [

    ]
    return {
      data,
      columns,
      membercolumns,
      memberdata,
      visible: false,
      confirmLoading: false,
      selectedRowKeys: []
    }
  },
  watch: {
    uuid: {
      handler(newValue, oldValue) {
        console.log(newValue, oldValue)
        getAssociatedDataListForProject(newValue).then(response => {
          if (response.code === 0) {
            this.data = this.data.concat(response.data)
          } else {
            alert(res.message)
          }
        })
      },
      immediate: true
    }
  },
  methods: {
    //获得本地关联数据
    handleCreate() {
      this.visible = true
      getAvailableLocalDataForProject(this.uuid).then(res => {
        if (res.code === 0) {
          this.memberdata = res.data.records
        } else {
          alert(res.message)
        }
      })
    },
    handleOk(e) {
      console.log(this.selectedRowKeys)
      this.selectedRowKeys.forEach(item => {
        console.log(this.memberdata[item].dataId)
        const params = {
          uuid: this.uuid,
          dataId: this.memberdata[item].dataId,
          name: this.memberdata[item].name
        }
        associateLocalDataToCurrentProject(params).then(res => {
          if (res.code === 0) {
            alert('关联成功')
          } else {
            alert('关联失败')
          }
          this.visible = false
          this.confirmLoading = false
        })
      })
      // this.confirmLoading = true
      // setTimeout(() => {
      //   this.visible = false
      //   this.confirmLoading = false
      // }, 2000)
    },
    handleCancel(e) {
      console.log('Clicked cancel button')
      this.visible = false
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    handleDataCancelClick(dataid) {
      console.log(this.uuid)
      this.uuid &&
        removeLocalDataFromCurrentProject({ uuid: this.uuid, dataUUID: dataid }).then(res => {
          if (res.code === 0) {
            // this.data = res.data
          } else {
            alert(res.message)
          }
        })
    }
  }
}
</script>

<style scoped>
.create-btn {
  margin-bottom: 10px;
}
</style>
