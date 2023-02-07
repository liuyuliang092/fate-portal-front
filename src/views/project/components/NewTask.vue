<template>
  <div>
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <a-button type="link" class="back" @click="handleBack"> <a-icon type="double-left" />返回</a-button>
      <a-form-model
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        labelAlign="left"
        :rules="rules"
        ref="ruleForm"
      >
        <div class="site">
          <div class="info"><a-icon type="down" /> 任务信息</div>
        </div>
        <a-form-model-item label="类型">
          <a-radio-group :options="plainOptions" v-model="form.type" :default-value="form.type" @change="onChange1" />
        </a-form-model-item>
        <a-form-model-item label="名称" ref="name" prop="name">
          <a-input
            v-model="form.name"
            @blur="
              () => {
                $refs.name.onFieldBlur()
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item label="描述">
          <a-input v-model="form.desc" type="textarea" />
        </a-form-model-item>
        <a-form-model-item
          ><a-button> 取消 </a-button>
          <a-button type="primary" style="margin-left: 10px" @click="onSubmit"> 提交 </a-button>
        </a-form-model-item>
      </a-form-model>
      <!-- <div class="site">
          <div class="info"><a-icon type="down" /> 数据配置</div>
        </div>
        <div class="bottom">
          <a-button @click="handleSelectMemberAndData"> 编辑成员和数据 </a-button>
        </div>
        <a-table :columns="columns" :data-source="data">
          <span slot="dataaction">
            <a @click="handleSelectMemberAndData">请选择</a>
          </span>
          <span slot="tagaction">
            <a @click="handleSelectMemberAndData">请选择</a>
          </span>
        </a-table>
        <div v-if="value1 !== 'PSI'">
          <div class="site">
            <div class="info"><a-icon type="down" /> 模型配置</div>
          </div>

          <a-form-model-item label="模型名称" ref="modelName" prop="modelName">
            <a-input v-model="form.modelName" />
          </a-form-model-item>
          <a-form-model-item label="算法" v-if="value === 'json'">
            <a-select default-value="123" style="width: 120px">
              <a-select-option value="123"> 123 </a-select-option>
              <a-select-option value="456"> 456 </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="验证集（可选项）" v-if="value === 'json'">
            <a-input v-model="form.fateAddress" />
          </a-form-model-item>

          <a-radio-group button-style="solid" v-model="value" @change="onChange" class="bottom">
            <a-radio-button value="jiaohu"> 交互式 </a-radio-button>
            <a-radio-button value="json"> JSON </a-radio-button>
          </a-radio-group>
          <a-button v-if="value === 'json'" style="margin-left: 10px">生成配置文件</a-button>

          <a-form-model-item label="工作流DSL" v-if="value === 'json'">
            <a-input v-model="form.desc" type="textarea" />
          </a-form-model-item>
          <a-form-model-item label="算法配置" v-if="value === 'json'">
            <a-input v-model="form.desc" type="textarea" />
          </a-form-model-item>
        </div>
        <a-form-model-item
          ><a-button> 取消 </a-button>
          <a-button type="primary" style="margin-left: 10px" @click="onSubmit"> 提交 </a-button>
        </a-form-model-item>
      </a-form-model>
      <a-modal
        title="选择成员和数据"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
        destroyOnClose="true"
      >
        <div class="info">
          <a-button> 重置选择 </a-button>
        </div>
        <a-table :columns="columns" :data-source="data">
          <span slot="dataaction" slot-scope="record">
            <a-select style="width: 120px">
              <a-select-option v-for="option in record.dataActionOptionsList" :value="option.value" :key="option.value">{{
                option.label
              }}</a-select-option>
            </a-select>
            </span>
                    <span slot="tagaction" slot-scope="record">
            <a-select style="width: 120px">
              <a-select-option v-for="option in record.dataColumns" :value="option.value" :key="option.value">{{option.label}}</a-select-option>
            </a-select>
          </span>             
        </a-table>
      </a-modal> -->
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

import { createNewJob, getParticipantList, getAssociatedDataListForProject, getParticipantAndDataList } from '@/api/project'
import { getDataHeaders } from '@/api/data'
export default {
  name: 'project-info',
  components: {},
  data() {
    // const plainOptions = ['模型训练', '预测', 'PSI']
    const plainOptions = [{ 'label': '模型训练', 'value': '0' }]
    const columns = [
      {
        title: '成员',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '关联数据',
        key: 'data',
        scopedSlots: { customRender: 'dataaction' }
      },
      {
        title: '标签列',
        key: 'action',
        scopedSlots: { customRender: 'tagaction' }
      }
    ]
    const rules = {
      name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
      modelName: [{ required: true, message: '请输入模型名称', trigger: 'blur' }]
    }

    return {
      plainOptions,
      labelCol: { span: 3 },
      wrapperCol: { span: 14 },
      form: {
        name: '',
        desc: '',
        type: '0'
      },
      addressFront: 'http://',
      fmlAddressFront: 'http://',
      columns,
      data: [],
      visible: false,
      confirmLoading: false,
      value: 'json',
      rules,
      projectUuid: '',
      siteDataList: [],
      dataColumns: [{ "value": "id", "label": "id" }, { "value": "name", "label": "name" }],
      dataUuid: '',
      columnId: '',
    }
  },
  methods: {
    handleBack() {
      this.$router.push({ name: 'project-info', params: { from: 'newTask', key: '2', uuid: this.projectUuid } }).catch(() => {
        console.log('登录跳转首页出错,这个错误从哪里来的')
      })
    },
    onChange1(e) {
      console.log('radio1 checked', e.target.value)
    },
    onSubmit() {
      console.log('submit!form = ', this.form,'projectUuid = ',this.projectUuid)
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          createNewJob(this.form, this.projectUuid).then(res => {
            if (res.code === 0) {
              this.$message.success(res.message);
            } else {
              this.$message.warning(res.message);
            }
            this.redirectTask();
          })
          
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleSelectMemberAndData() {
      this.visible = true
      this.getParticipantList(this.projectUuid, false);
      this.getAssociatedDataListForProject(this.projectUuid);
      this.getParticipantAndDataList(this.projectUuid);
    },

    handleDataChange(uuid) {
      getDataHeaders(uuid).then(res => {
        if (res.code === 0) {
          this.dataColumns = [];
          res.data.map(column => {
            let columns = { value: column, label: column }
            this.dataColumns.push(columns)
          })
        }
      })
      console.info('select data uuid = ', this.dataColumns)
    },

    getParticipantAndDataList(projectUuid) {
      getParticipantAndDataList(projectUuid).then(res => {
        if (res.code === 0) {
          this.data = res.data
        }
      })
    },

    getParticipantList(projectUuid, isall) {
      getParticipantList(projectUuid, isall).then(res => {
        if (res.code === 0) {
          this.data = res.data
        }
      })
    },

    getAssociatedDataListForProject(projectUuid) {
      getAssociatedDataListForProject(projectUuid).then(res => {
        if (res.code === 0) {
          this.siteDataList = [];
          res.data.map(data => {
            let dataList = { value: data.dataUuid, label: data.name }
            this.siteDataList.push(dataList);
            console.info('data list = ', this.siteDataList)
          })
        }
      })
    },

    handleOk(e) {
      console.info('data uuid = ', this.dataUuid)
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleCancel(e) {
      console.log('Clicked cancel button')
      this.visible = false
    },
    onChange(e) {
      this.redirectDag();
    },

    redirectDag(){
      this.$router.push({ name: 'butterfly/algoDag', params: { projectUuid: this.projectUuid } }).catch(() => {
        console.log('跳转出错,这个错误从哪里来的')
      });
    },
    redirectTask(){
      this.$router.push({ name: 'project-info', params: { from: 'newTask', key: '2', uuid: this.projectUuid } }).catch(() => {
        console.log('登录跳转首页出错,这个错误从哪里来的')
      });
    }

  },
  mounted() {
    this.projectUuid = this.$route.params.projectUuid;
    // this.getParticipantList(this.projectUuid, false);
  }
}
</script>
<style scoped>
.site {
  height: 2rem;
  background-color: rgba(216, 227, 233);
  color: gray;
  margin-bottom: 24px;
}
.info {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.bottom {
  margin-bottom: 24px;
}
.back {
  margin-bottom: 10px;
}
</style>
