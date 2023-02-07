<template>
  <div>
    <a-button class="new-btn" shape="round" @click="handleAllClick">
      所有项目 <a-badge :count="count" :number-style="{ backgroundColor: '#108ee9' }" v-if="allClick" />
    </a-button>
    <a-button class="new-btn" shape="round" @click="handleMyClick">
      我的项目<a-badge :count="count" :number-style="{ backgroundColor: '#108ee9' }" v-if="myClick"></a-badge>
    </a-button>
    <a-button class="new-btn" shape="round" @click="handleJoinClick">
      加入的项目<a-badge :count="count" :number-style="{ backgroundColor: '#108ee9' }" v-if="joinClick"></a-badge>
    </a-button>
    <a-button class="new-btn" shape="round" @click="handleCloseClick">
      关闭的项目<a-badge :count="count" :number-style="{ backgroundColor: '#108ee9' }" v-if="closeClick"></a-badge>
    </a-button>
    <a-table
      :columns="columns"
      :data-source="dataList"
      :scroll="{ x: 1200, y: 1000 }"
      :pagination="pagination"
      @change="handleTableChange"
      :rowKey="(tableDatas) => tableDatas.id"
    >
      <span slot="name" slot-scope="text, record">
        <a @click="handleInfoClick(record)">{{ record.name }}</a>
      </span>
      <span slot="task" slot-scope="text, record">
        运行中：{{ record.runningJobNum }} 已成功：{{ record.successJobNum }}
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="handleChangeClick(record)">关闭 </a>
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

import { closeManagedProject } from '@/api/project'

const joinColumns = [
  {
    title: '项目名称',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    align: 'center',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '描述',
    width: 200,
    dataIndex: 'description',
    key: 'description',
    align: 'center'
  },
  {
    title: '创建时间',
    dataIndex: 'creationAt',
    align: 'center',
    key: 'creationAt'
  },
  {
    title: '项目管理者',
    dataIndex: 'manager',
    align: 'center',
    key: 'manager'
  },
  {
    title: '项目管理者站点名称',
    dataIndex: 'managingSiteName',
    align: 'center',
    key: 'managingSiteName'
  },
  {
    title: '项目管理者站点ID',
    dataIndex: 'managingSitePartyId',
    align: 'center',
    key: 'managingSitePartyId'
  },
  {
    title: '成员',
    dataIndex: 'participantsNum',
    align: 'center',
    key: 'participantsNum'
  },
  {
    title: '任务',
    dataIndex: 'tasks',
    align: 'center',
    align: 'center',
    key: 'tasks',
    scopedSlots: { customRender: 'task' }
  },
  {
    title: '操作',
    key: 'operation',
    align: 'center',
    fixed: 'right',
    width: 230,
    scopedSlots: { customRender: 'action' }
  }
];

const myColumns = [
  {
    title: '项目名称',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    align: 'center',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '描述',
    width: 200,
    align: 'center',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'creationAt',
    key: 'creationAt'
  },
  {
    title: '项目管理者',
    align: 'center',
    dataIndex: 'manager',
    key: 'manager'
  },

  {
    title: '操作',
    key: 'operation',
    align: 'center',
    fixed: 'right',
    width: 230,
    scopedSlots: { customRender: 'action' }
  }
];
const allColumns = [
  {
    title: '项目名称',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    align: 'center',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '描述',
    width: 200,
    align: 'center',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: '创建时间',
    dataIndex: 'creationAt',
    align: 'center',
    key: 'creationAt'
  },
  {
    title: '项目管理者',
    dataIndex: 'manager',
    align: 'center',
    key: 'manager'
  },
  {
    title: '项目管理者站点名称',
    dataIndex: 'managingSiteName',
    align: 'center',
    key: 'managingSiteName'
  },
  {
    title: '项目管理者站点ID',
    dataIndex: 'managingSitePartyId',
    align: 'center',
    key: 'managingSitePartyId'
  },

  {
    title: '操作',
    key: 'operation',
    align: 'center',
    fixed: 'right',
    width: 230,
    scopedSlots: { customRender: 'action' }
  }
];
const closeColumns = [
  {
    title: '项目名称',
    align: 'center',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '描述',
    width: 200,
    align: 'center',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'creationAt',
    key: 'creationAt'
  },
  {
    title: '项目管理者',
    align: 'center',
    dataIndex: 'manager',
    key: 'manager'
  },
  {
    title: '项目管理者站点名称',
    align: 'center',
    dataIndex: 'managingSiteName',
    key: 'managingSiteName'
  },
  {
    title: '项目管理者站点ID',
    align: 'center',
    dataIndex: 'managingSitePartyId',
    key: 'managingSitePartyId'
  }
];

export default {
  name: 'projectlist',
  components: {},
  data() {
    return {
      columns: [],
      dataList: [],
      myColumns: [],
      allColumns: [],
      joinColumns: [],
      closeColumns: [],
      allClick: true,
      myClick: false,
      joinClick: false,
      closeClick: false,
      pagination: {
        total: 0,
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],
        showTotal: total => `共有 ${total} 条数据`,
      },
      queryParam: {
        current: 1,
        pageSize: 10
      },
    };

  },
  methods: {
    handleTableChange(pagination) {
      this.pagination.current = pagination.current;
      this.pagination.pageSize = pagination.pageSize;
      this.queryParam.current = pagination.current;
      this.queryParam.pageSize = pagination.pageSize;
      console.info('page select = ',this.queryParam)
      this.initProjectList(this.queryParam);
    },
    handleMyClick() {
      console.log('myProjects = ', this.myProjects)
      this.columns = myColumns
      this.dataList = this.myProjects
      this.myClick = true
      this.allClick = false
      this.joinClick = false
      this.closeClick = false
    },
    handleAllClick() {
      console.log('allProjects = ', this.allProjects)
      this.columns = allColumns
      this.dataList = this.allProjects.records
      this.myClick = false
      this.allClick = true
      this.joinClick = false
      this.closeClick = false
      const pagination = { ...this.pagination };
      pagination.total = this.allProjects.total;
      this.pagination = pagination;
    },
    handleJoinClick() {
      console.log('joinedProjects = ', this.joinedProjects)
      this.dataList = this.joinedProjects
      this.columns = joinColumns
      this.myClick = false
      this.allClick = false
      this.joinClick = true
      this.closeClick = false
    },
    handleCloseClick() {
      console.log('closedProjects = ', this.closedProjects)
      this.columns = closeColumns
      this.dataList = this.closedProjects
      this.myClick = false
      this.allClick = false
      this.joinClick = false
      this.closeClick = true
    },
    handleInfoClick(record) {
      this.$router.push({ name: 'project-info', params: { uuid: record.uuid, from: 'project' } }).catch(() => {
        console.log('跳转出错,这个错误从哪里来的')
      })
    },
    handleChangeClick(record) {
      if (record.managedByThisSite) {
        closeManagedProject(record.uuid).then(res => {
          if (res.code === 0) {
            //关闭成功,更新数据
            this.$message.success('成功关闭该任务')
            this.$store.dispatch('getAllProjectList')
          }
        })
      } else {
        this.$message.error('无法关闭非本站点创建的项目')
      }
      console.log(record)
    },
    initProjectList(queryParam) {
      this.$store.dispatch('getAllProjectList',queryParam).then(() => {
        this.handleAllClick();

      });
    }
  },
  computed: {
    //关闭的项目
    closedProjects: {
      get: function () {
        return this.$store.getters.closedProjects
      }
    },
    //加入的项目
    joinedProjects: {
      get: function () {
        return this.$store.getters.joinedProjects
      }
    },
    //被邀请的项目
    invitedProjects: {
      get: function () {
        return this.$store.getters.invitedProjects
      }
    },
    //我的项目
    myProjects: {
      get: function () {
        return this.$store.getters.myProjects
      }
    },
    //我参与的所有项目
    allProjects: {
      get: function () {
        return this.$store.getters.allProjects
      }
    },
    count: {
      get: function () {
        return this.dataList ? this.dataList.length : 0
      }
    }
  },
  mounted() {
    this.columns = allColumns;
  },
  created() {
    this.initProjectList(this.queryParam);
  }
}
</script>

<style scoped>
.new-btn {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
