<template>
  <div>
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <a-button type="link" class="back" @click="handleBack"> <a-icon type="double-left" />返回</a-button>
      <a-tabs @change="callback" :activeKey="activeKey">
        <a-tab-pane key="1" tab="项目信息">
          <ul>
            <li>角色：{{ detailInfo.role }}</li>
            <li>名称：{{ detailInfo.projectName }}</li>
            <li>描述：{{ detailInfo.description }}</li>
            <li>创建时间：{{ detailInfo.creationTime }}</li>
            <li>项目管理者：{{ detailInfo.manager }}</li>
          </ul>
          <a-button type="primary" @click="showModal(detailInfo.uuid)"> 关闭项目 </a-button>
          <a-modal
            title="关闭"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            @cancel="handleCancel"
          >
            <p>你想要关闭这个项目么？</p>
          </a-modal>
        </a-tab-pane>
        <a-tab-pane key="2" tab="任务管理"> <task-manage :uuid="detailInfo.projectUuid" /> </a-tab-pane>
        <a-tab-pane key="3" tab="数据管理">
          <data-manage :uuid="detailInfo.projectUuid" />
        </a-tab-pane>
        <a-tab-pane key="4" tab="模型管理">
          <modal-manage :uuid="detailInfo.projectUuid" />
        </a-tab-pane>
        <a-tab-pane key="5" tab="成员管理">
          <people-manage :uuid="detailInfo.projectUuid" />
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
import TaskManage from './TaskManage.vue'
import PeopleManage from './PeopleManage.vue'
import ModalManage from './ModalManage.vue'
import DataManage from './DataManage.vue'

import { getProjectDetail, closeManagedProject } from '@/api/project'

export default {
  name: 'project-info',
  components: { PeopleManage, DataManage, TaskManage, ModalManage },
  data() {
    return {
      detailInfo: {
        // autoApprovalEnabled: false,
        // creationTime: '2022NIAN',
        // description: '1234',
        // managedByThisSite: false,
        // manager: '55',
        // managingSiteName: '555',
        // managingSitePartyId: 15,
        // name: '123',
        // uuid: '123'
      },
      tmpCloseProject: '',
      visible: false,
      confirmLoading: false,
      activeKey:'1'
    }
  },
  methods: {
    callback(key) {
      console.log(key)
      this.activeKey = key
    },
    handleBack() {
      this.$router.push({ path: '/project' }).catch(() => {
        console.log('登录跳转首页出错,这个错误从哪里来的')
      })
    },
    showModal(uuid) {
      this.visible = true
      this.tmpCloseProject = uuid
    },
    handleOk() {
      if (this.tmpCloseProject && this.detailInfo.managedByThisSite) {
        closeManagedProject(this.tmpCloseProject).then(res => {
          if (res.code === 200) {
            this.confirmLoading = true
            setTimeout(() => {
              this.visible = false
              this.confirmLoading = false
            }, 2000)
          }
        })
      } else {
        this.$message.error('您没有权限关闭该项目')
        this.handleCancel()
      }
    },
    handleCancel(e) {
      console.log('Clicked cancel button')
      this.visible = false
      this.tmpCloseProject = ''
    }
  },
  mounted() {
    console.log('project uuid 1 = ', this.$route.params)
    this.detailInfo.uuid = this.$route.params.uuid;
    
    if (this.$route.params.from === 'project') {
      getProjectDetail(this.$route.params.uuid).then(response => {
        if (response.code === 0) {
          this.detailInfo = response.data
        }
      })
    } else{
      this.activeKey = this.$route.params.key;
    }
    this.detailInfo.uuid = this.$route.params.uuid;
  }
}
</script>
<style scoped>
.back {
  margin-bottom: 10px;
}
</style>
