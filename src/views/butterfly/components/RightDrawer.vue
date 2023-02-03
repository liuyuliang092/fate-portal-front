<template>
  <div class="dag-form">
    <div v-if="this.onclickNodeData.nodeId != 'reader'">
      <form-create v-model="formData" :rule="rule" :option="option" @submit="onSubmit"> </form-create>
    </div>
    <div v-if="this.onclickNodeData.nodeId === 'reader'">
      <dataset :onclickNodeData="this.onclickNodeData"></dataset>
    </div>
  </div>
</template>

<script>
import { getAlgorithmParams, saveAlgorithmParamsSettings, getAlgorithmParamsSettings } from '@/api/graph'
import dataset from './DataSet'
export default {
  props: {
    selectCell: {
      default: ''
    },
    onclickNodeData: {
      type: Object
    },
  },
  components: { dataset },
  created() {
    //超参查询
    console.info('node click node data = ', this.onclickNodeData)
  },
  watch: {
    async onclickNodeData() {
      const { nodeId } = this.onclickNodeData;
      this.rule = [];
      const res = await getAlgorithmParams(nodeId);
      if (res.code === 0) {
        this.rule = res.data ? eval(res.data.paramValue) : [];
        console.log('onclickNodeData = ', this.onclickNodeData)
        getAlgorithmParamsSettings(this.onclickNodeData).then(res => {
          if (res.code === 0) {
            this.formData.coverValue(JSON.parse(res.data.paramSettings));
            console.info('form data back = ', this.formData.form)
          }
        })
      }
    }
  },
  data() {
    return {
      formState: {
        username: '',
        password: '',

      },
      formData: {},
      rule: [],
      option: {},
      params: {}
    }
  },
  methods: {
    // 关闭
    closeFn() {
      this.$emit('updateVisable', false)
    },
    async onSubmit() {
      const { nodeId, dslNodeId, projectUuid, taskUuid } = this.onclickNodeData;
      this.params.dslNodeId = dslNodeId;
      this.params.projectUuid = projectUuid;
      this.params.taskUuid = taskUuid;
      this.params.nodeId = nodeId;
      this.params.paramSettings = JSON.stringify(this.formData.form);
      console.info('settings data = ', JSON.stringify(this.formData.form))
      const res = await saveAlgorithmParamsSettings(this.params)
      if (res.code === 0) {
        this.$message.success(res.message);
      } else {
        this.$message.warning(res.message);
      }
    }

  }
}

</script>

<style lang="scss">
.dag-form {
  .ant-col {
    .ant-col-3 {
      width: 40%;
    }
    .ant-col-12 {
      width: 60%;
    }
  }
}
</style>