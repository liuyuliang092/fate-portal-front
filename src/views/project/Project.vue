<template>
  <div>
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false"
      ><a-button class="new-btn" @click="handleCreateProject"> 新建项目 </a-button>
      <a-tabs @change="callback">
        <a-tab-pane key="1" tab="项目列表">
          <project-list ref="child" />
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

import ProjectList from './components/ProjectList.vue'
import ProjectInvite from './components/ProjectInvite.vue'
import { createNewProject } from '@/api/project'
export default {
  name: 'project-index',
  provide() {
    return {
      reload: this.reload
    }
  },
  components: { ProjectInvite, ProjectList},
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
      },
      queryParam: {
        current: 1,
        pageSize: 10
      },
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
          createNewProject({ description: this.form.description, name: this.form.name }).then(response => {
            if (response.code === 0) {
              this.$store.dispatch('getAllProjectList',this.queryParam).then(() => {
                this.$refs.child.handleAllClick();
                this.visible = false
              });
            }
          });
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
