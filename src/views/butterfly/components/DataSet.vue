<template>
  <a-form-model ref="dynamicValidateForm" :model="dynamicValidateForm" v-bind="formItemLayoutWithOutLabel">
    <a-form-model-item v-for="(domain, index) in dynamicValidateForm.domains" :key="domain.key" v-bind="formItemLayout">
      <a-form-model-item label="数据集">
        <a-select
          v-model="dynamicValidateForm.value[index]['data_uuid']"
          placeholder="please select dataset"
          style="width: 100%; margin-right: 8px"
        >
          <a-select-option v-for="item in domain.dataActionOptionsList" :key="item.value">
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="是否Y标签">
        <a-radio-group v-model="dynamicValidateForm.value[index]['with_label']" @change="onChange">
          <a-radio :value="0"> 是 </a-radio>
          <a-radio :value="1"> 否 </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <!-- <a-form-model-item label="标签值">
        <a-select
          v-model="dynamicValidateForm.value[index]['label_name']"
          placeholder="please select label"
          style="width: 100%; margin-right: 8px"
        >
        <a-select-option v-for="(item, index) in (domain.dataActionOptionsList.find(item=>item.value === dynamicValidateForm.value[index]['data_uuid']) || {}).columnList" :key="index">
          {{ item }}
        </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="标签类型">
        <a-select
          v-model="dynamicValidateForm.value[index]['label_type']"
          placeholder="please select label type"
          style="width: 100%; margin-right: 8px"
        >
        <a-select-option v-for="(item, index) in domain.labelTypeList" :key="index">
          {{ item }}
        </a-select-option>
        </a-select>
      </a-form-model-item> -->
      <a-form-model-item v-show="false">
        <a-input v-model="dynamicValidateForm.value[index]['site_uuid']" />
      </a-form-model-item>
    </a-form-model-item>
    <a-form-model-item v-bind="formItemLayout">
      <a-button type="primary" html-type="submit" @click="submitForm('dynamicValidateForm')"> 提交 </a-button>
      <!-- <a-button style="margin-left: 10px" @click="resetForm('dynamicValidateForm')"> Reset </a-button> -->
    </a-form-model-item>
  </a-form-model>
</template>
  <script>
import { getParticipantAndDataList } from '@/api/project'
import { getDataHeaders } from '@/api/data'
import { saveAlgorithmParamsSettings, getAlgorithmParamsSettings } from '@/api/graph'
export default {
  props: {
    onclickNodeData: {}
  },
  data() {
    return {
      formValue: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      },
      dynamicValidateForm: {
        domains: [],
        value: []
      },
      data_uuid: '',
      with_label: 0,
      label_name: '',
      label_type: '',
      columnList: [],
      params: {},
      mock_data: [
        {
          "key": "584156a482874ee0a268ed5f7443f99a",
          "name": "site1", "dataActionOptionsList": [{ "value": "ae8be05296924fcb8bcb88c9d9f896a3", "label": "site1-2023-010301", "columnList": ["id", "x1", "x2", "x3"] }],
          "labelTypeList": ["int", "string", "float"]
        },

        {
          "key": "6015294c293846b0881360e1151d90ea", "name": "site2", "dataActionOptionsList":
            [{ "value": "cb8a00b4a39343db98f3734f23080356", "label": "site2-2023-0103001" }],
          "labelTypeList": ["int", "string", "float"]
        }
      ]
    };
  },
  mounted() {
    this.getParticipantAndDataList(this.onclickNodeData.projectUuid);
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.info('form =', this.dynamicValidateForm.value)
          this.params = this.onclickNodeData;
          this.params.paramSettings = JSON.stringify(this.dynamicValidateForm.value);
          console.info(JSON.stringify(this.params));
          saveAlgorithmParamsSettings(this.params).then(res => {
            if (res.code === 0) {
              this.$message.success(res.message);
            } else {
              this.$message.warning(res.message);
            }
          })
        } else {
          console.log('error save!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.dynamicValidateForm.value = this.dynamicValidateForm.domains.map(item =>
        ({ 'with_label': '', 'label_name': '', 'label_type': '', 'data_uuid': '', 'site_uuid': item.key }))
    },
    getParticipantAndDataList(projectUuid) {
      // this.dynamicValidateForm.domains = this.mock_data
      console.info('query data set,project uuid = ',projectUuid)
      getParticipantAndDataList(projectUuid).then(res => {
        debugger
        if (res.code === 0) {
          this.dynamicValidateForm.domains = res.data
          console.info('domains = ', this.dynamicValidateForm.domains)
          this.dynamicValidateForm.value = this.dynamicValidateForm.domains.map(item =>
            ({ 'with_label': '', 'label_name': '', 'label_type': '', 'data_uuid': '', 'site_uuid': item.key }))
        }
      })
      getAlgorithmParamsSettings(this.onclickNodeData).then(res => {
        if (res.code === 0) {
          this.dynamicValidateForm.value = JSON.parse(res.data.paramSettings);
        }
      })
    },
    onChange(e) {
      console.log('radio checked', e.target.value);
    },
  },
};
  </script>
  <style>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
  