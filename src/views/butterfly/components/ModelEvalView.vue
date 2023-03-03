<template>
  <a-spin :spinning="loading">
    <div class="eval-score-container">
      <div class="block-title">Evaluation Scores</div>
      <div class="adjust-block">
        <div class="adjust-title">Quantile: </div>
        <a-slider class="adjust-slider" v-model:value="quantileValue" :min="0" :max="1" :step="0.1" @afterChange="handleQuantileChange"/>
        <a-input-number class="adjust-input" v-model:value="quantileValue" :min="0" :max="1" :step="0.1" size="small" @change="handleQuantileChange"/>
        <a-tooltip placement="top" style="display: inline-block">
          <template #title>
            <span><!--            TODO --></span>
          </template>
          <a-icon type="question-circle" theme="filled" />
        </a-tooltip>
      </div>
      <a-table :columns="quantileCols" :data-source="quantileData" :rowKey="(record) => record.name" :pagination="false"></a-table>
    </div>
    <div class="eval-score-container">
      <div class="block-title">Confusion Matrix</div>
      <div class="adjust-block">
        <div class="adjust-title">Classification Threshold: </div>
        <a-slider class="adjust-slider" v-model:value="thresholdValue" :min="0" :max="1" :step="0.1" @afterChange="handleThresholdChange"/>
        <a-input-number class="adjust-input" v-model:value="thresholdValue" :min="0" :max="1" :step="0.1" size="small" @change="handleThresholdChange"/>
        <a-tooltip placement="top" style="display: inline-block">
          <template #title>
            <span><!--            TODO --></span>
          </template>
          <a-icon type="question-circle" theme="filled" />
        </a-tooltip>
      </div>
      <a-table :columns="thresholdCols" :data-source="thresholdData" :rowKey="(record) => record.name" :pagination="false"></a-table>
    </div>
  </a-spin>
</template>

<script>
import { getThresholdEval } from '@/api/graph'

export default {
  name: 'model-eval-view',
  props: {
    node: {
      required: true,
      type: Object
    }
  },
  components: {
  },
  data() {
    return {
      userRoles: [],
      loading: false,
      quantileValue: 0.5,
      clsThreshold: 0.5,
      quantileCols: [{
        title: '',
        dataIndex: 'name',
        key: 'name',
      },{
        title: 'dataset',
        dataIndex: 'dataset',
        key: 'dataset',
      },{
        title: 'auc',
        dataIndex: 'auc',
        key: 'auc',
      },{
        title: 'ks',
        dataIndex: 'ks',
        key: 'ks',
      },{
        title: 'precision',
        dataIndex: 'precision',
        key: 'precision',
      },{
        title: 'recall',
        dataIndex: 'recall',
        key: 'recall',
      },],
      quantileData: [{
        name: 'hetero_lr_0',
        dataset: 'train',
        auc: '0.979322',
        ks: '0.847431',
        precision: '0.947214',
        recall: '0.904762'
      }],
      thresholdValue: 0.5,
      thresholdCols: [
        {
          title: '',
          dataIndex: 'name',
          key: 'name',
        }
      ]
    }
  },
  mounted() {
    this.userRoles = this.$store.getters.roles
    this.loading = false
  },
  watch: {
    node: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.loading = true
          this.queryMetrics()
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    queryMetrics() {
      this.loading = false
    },
    handleQuantileChange(val) {
      console.log(val)
    },
    handleThresholdChange(val) {
      this.thresholdValue = val
      this.getThresholdEval(opts)
    },
    getThresholdEval() {
      let opts = {
        projectUuid: this.node.projectUuid,
        taskUuid: this.node.taskUuid,
        nodeId: this.node.nodeId,
        roles: this.userRoles,
        threshold: this.thresholdValue
      }
      getThresholdEval(opts).then((response) => {
        if (response.code === 0) {

        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
  .adjust-block {
    //display: inline-block;
    height: 40px;
  }
  .adjust-title {
    text-align: left;
    line-height: 36px;
    display: inline-block;
  }
  .adjust-slider {
    display: inline-block;
    width: 200px;
    margin: 0 10px 0 10px
  }
  .adjust-input {
    display: inline-block;
    margin-right: 10px;
  }
  .block-title {
    font-weight: bold;
    font-size: 18px;
  }
</style>