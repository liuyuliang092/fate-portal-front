<template>
  <div>
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false"
      ><a-button class="new-btn" @click="handleCreateProject">
        新建项目
      </a-button>
      <a-tabs @change="callback">
        <a-tab-pane key="1" tab="项目列表">
          <project-list />
        </a-tab-pane>
        <a-tab-pane key="2" tab="项目邀请">
          <project-invite />
        </a-tab-pane>
        <!-- <a-tab-pane key="3" tab="项目邀请">
          <x6-flow />
        </a-tab-pane> -->
      </a-tabs>
      <a-modal
        title="创建新项目"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-model-item ref="name" label="名称" prop="name">
            <a-input
              @blur="
                () => {
                  $refs.name.onFieldBlur()
                }
              "
              v-model="form.name"
            />
          </a-form-model-item>
          <a-form-model-item label="描述" prop="description">
            <a-input v-model="form.description" type="textarea" />
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    </a-card>
  </div>
</template>

<script>
import ProjectList from './components/ProjectList.vue'
import ProjectInvite from './components/ProjectInvite.vue'
import X6Flow from './x6-flow.vue'
import { createNewProject } from '@/api/project'
export default {
  name: 'project-index',
  provide() {
    return {
      reload: this.reload
    }
  },
  components: { ProjectInvite, ProjectList, X6Flow },
  data() {
    return {
      visible: false,
      confirmLoading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
          //{ min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
        ],
        description: [{ required: true, message: '请输入项目描述', trigger: 'blur' }]
      }
    }
  },
  methods: {
    callback(key) {
      console.log(key)
    },
    handleCreateProject() {
      this.visible = true
    },
    handleOk(e) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.log('form' , this.form)
          console.log('form name' , this.form.name)
          console.log('form description' , this.form.description)
          debugger
          //上传数据
          createNewProject({ description: this.form.description, name: this.form.name }).then(response => {
            debugger
            if (response.code === 0) {
              this.confirmLoading = true
              setTimeout(() => {
                this.visible = false
                this.confirmLoading = false
              }, 2000)
            }
          })
          //创建完成，更新数据
          this.$store.dispatch('getAllProjectList')
          return true
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleCancel(e) {
      console.log('Clicked cancel button')
      this.visible = false
    }
  }
}
</script>
<style scoped>
.new-btn {
  margin-bottom: 10px;
}
</style>
