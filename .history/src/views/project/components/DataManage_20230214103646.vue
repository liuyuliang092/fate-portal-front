<template>
  <div>
    <a-button @click="handleCreate" class="create-btn"> 关联数据 </a-button>
    <a-table 
    :columns="columns" 
    :data-source="data"
    :pagination="pagination"
    >
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
    const memberdata = []
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
      selectedRowKeys: [],
      pagination: {
        total: 0,
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],
        showTotal: total => `共有 ${total} 条数据`,
      },
    }
  },
  watch: {
    uuid: {
      handler(newValue, oldValue) {
        console.log(newValue, oldValue)
        this.getAssociatedDataListForProject(newValue);
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
          this.$message.warning(res.message);
        }
      })
    },
    handleOk(e) {
      this.selectedRowKeys.forEach(item => {
        const params = {
          uuid: this.uuid,
          dataId: this.memberdata[item].dataId,
          name: this.memberdata[item].name
        }
        associateLocalDataToCurrentProject(params).then(res => {
          if (res.code === 0) {
            this.$message.success('associate success');
            console.info('project associated data,uuid = ', this.uuid)
            this.getAssociatedDataListForProject(this.uuid);
          } else {
            this.$message.warning('associate failed');
          }
          this.visible = false
          this.confirmLoading = false
        })
      })
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
    },
    getAssociatedDataListForProject(projectUuid) {
      getAssociatedDataListForProject(projectUuid).then(response => {
        if (response.code === 0) {
          this.data = this.data.concat(response.data)
        } else {
          this.$message.warning(res.message);
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
