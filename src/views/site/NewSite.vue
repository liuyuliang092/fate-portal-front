<template>
  <div>
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        labelAlign="left"
      >
        <div class="site">
          <div class="info"><a-icon type="down" />站点信息</div>
        </div>

        <a-form-model-item label="名称" prop="name" ref="name">
          <a-input
            @blur="
              () => {
                $refs.name.onFieldBlur()
              }
            "
            v-model="form.name"
          />
        </a-form-model-item>
        <a-form-model-item label="站点地址" prop="externalHost" ref="externalHost">
          <a-row>
            <a-col :span="4">
              <a-select style="width: 120px" @change="handleAddressChange" v-model="form.https">
                <a-select-option value="false"> http:// </a-select-option>
                <a-select-option value="true"> https:// </a-select-option>
              </a-select>
            </a-col>
            <a-col :span="20">
              <a-input
                @blur="
                  () => {
                    $refs.externalHost.onFieldBlur()
                  }
                "
                v-model="form.externalHost"
              />
            </a-col>
          </a-row>
        </a-form-model-item>
        <a-form-model-item label="组织ID" prop="partyId" ref="partyId">
          <a-input
            v-model="form.partyId"
            @blur="
              () => {
                $refs.partyId.onFieldBlur()
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item label="站点端口号" prop="externalPort" ref="externalPort">
          <a-input
            v-model="form.externalPort"
            @blur="
              () => {
                $refs.externalPort.onFieldBlur()
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item label="描述" prop="description" ref="description">
          <a-input
            v-model="form.description"
            type="textarea"
            @blur="
              () => {
                $refs.description.onFieldBlur()
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item label="FML Manager 终端" prop="fmlManagerEndpoint" ref="fmlManagerEndpoint">
          <a-input
            v-model="form.fmlManagerEndpoint"
            @blur="
              () => {
                $refs.fmlManagerEndpoint.onFieldBlur()
              }
            "
          />
          <a-button @click="registerFml">注册</a-button>
        </a-form-model-item>
        <div class="site">
          <div class="info"><a-icon type="down" /> FATE-FLOW配置</div>
        </div>

        <a-form-model-item label="FATE-Flow 地址" prop="fateFlowHost" ref="fateFlowHost">
          <a-input
            v-model="form.fateFlowHost"
            @blur="
              () => {
                $refs.fateFlowHost.onFieldBlur()
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item label="端口" prop="fateFlowHttpPort" ref="fateFlowHttpPort">
          <a-input
            v-model="form.fateFlowHttpPort"
            @blur="
              () => {
                $refs.fateFlowHttpPort.onFieldBlur()
              }
            "
          />
          <a-button @click="checkFateFlow">检测</a-button>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ offset: 5 }">
          <a-button type="primary" @click="onSubmit"> 保存 </a-button>
          <a-button style="margin-left: 10px" @click="onCancle"> 取消 </a-button>
        </a-form-model-item>
      </a-form-model>
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

import { getSiteData, updateSiteInfo, connectToFmlManageAndRegister, checkFateFlowHealth } from '@/api/site'
export default {
  name: 'new-site',
  components: {},
  data() {
    return {
      labelCol: { span: 3, offset: 2 },
      wrapperCol: { span: 14 },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        description: [{ required: true, message: '请输入描述', trigger: 'blur' }],
        externalHost: [{ required: true, message: '请输入站点地址', trigger: 'blur' }],
        partyId: [{ required: true, message: '请输入组织ID', trigger: 'blur' }],
        externalPort: [{ required: true, message: '请输入站点端口', trigger: 'blur' }],
        fmlManagerEndpoint: [
          {
            required: true,
            message: '请输入FML地址,以https://或者http://开头',
            trigger: 'blur',
            pattern: new RegExp('^(http(s)?:\/\/)')
          }
        ],
        fateFlowHost: [{ required: true, message: '请输入fate-flow地址', trigger: 'blur' }],
        fateFlowHttpPort: [{ required: true, message: '请输入fate-flow端口', trigger: 'blur' }]
      },
      form: {
        createAt: '',
        deleteAt: {
          time: '',
          valid: ''
        },
        description: '',
        externalHost: '',
        externalPort: '',
        fateFlowConnected: '',
        fateFlowConnectedAt: '',
        fateFlowGrpcPort: '',
        fateFlowHost: '',
        fateFlowHttpPort: '',
        fmlManagerConnected: '',
        fmlManagerConnectedAt: '',
        fmlManagerEndpoint: '',
        fmlManagerServerName: '',
        https: 'false',
        id: '',
        kubeflowConfig: {
          kubeconfig: '',
          minioAccessKey: '',
          minioEndpoint: '',
          minioRegion: '',
          minioSecretKey: '',
          minioSslEnabled: ''
        },
        kubeflowConnected: '',
        kubeflowConnectedAt: '',
        name: '',
        partyId: '',
        updatedAt: '',
        uuid: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.log('form = ', this.form)
          const uuid = window.sessionStorage.getItem('uuid')
          if (uuid !== undefined) {
            this.form.uuid = uuid
          }
          //上传数据
          updateSiteInfo(this.form).then(res => {
            if (res.code === 0) {
              alert('创建站点成功')
            } else {
              alert('创建站点失败')
            }
          })
          return true
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onCancle() {
      this.$refs.ruleForm.resetFields()
    },
    handleAddressChange(value) {
      console.log(`selected ${value}`)
      //this.addressFront = value
    },
    handleFMLChange(value) {
      //this.fmlAddressFront = value
      console.log(`selected ${value}`)
    },
    registerFml() {
      connectToFmlManageAndRegister(this.form).then(res => {
        alert(res.message)
        // if (res.code === 0) {
        //   alert('register fml manager success')
        // } else {
        //   alert('register fml manager failed')
        // }
      })
    },
    checkFateFlow() {
      checkFateFlowHealth().then(res => {
        alert(res.message)
        // if (res.code === 0) {
        //   alert('register fml manager success')
        // } else {
        //   alert('register fml manager failed')
        // }
      })
    }
  },
  mounted() {
    getSiteData().then(res => {
      window.sessionStorage.setItem('uuid', '')
      if (res.code === 0) {
        if (res.data) {
          this.form = res.data
          this.form.https = res.data.https === 0 ? 'true' : 'false'
          this.form.externalHost = res.data.externalHost
          console.info('init form = {}', this.form)
          window.sessionStorage.setItem('uuid', res.data.uuid)
        }
      } else {
        alert(res.message)
      }
    })
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
</style>
