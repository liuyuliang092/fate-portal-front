<template>
  <div>
    <a-spin :spinning="quantileLoading">
      <div class="eval-score-container">
        <div class="block-title">Evaluation Scores</div>
        <div class="adjust-block">
          <div class="adjust-title">Quantile:</div>
          <a-slider class="adjust-slider" v-model:value="quantileValue" :min="0" :max="1" :step="0.1"
                    @afterChange="handleQuantileChange" />
          <a-input-number class="adjust-input" v-model:value="quantileValue" :min="0" :max="1" :step="0.1" size="small"
                          @change="handleQuantileChange" />
          <a-tooltip placement="top" style="display: inline-block">
            <template #title>
              <span><!--            TODO --></span>
            </template>
            <a-icon type="question-circle" theme="filled" />
          </a-tooltip>
        </div>
        <a-table :columns="quantileCols" :data-source="quantileData" :rowKey="(record) => record.name"
                 :pagination="false"></a-table>
      </div>
    </a-spin>
    <a-spin :spinning="thresholdLoading">
      <div class="eval-score-container">
        <div class="block-title">Confusion Matrix</div>
        <div class="adjust-block">
          <div class="adjust-title">Classification Threshold:</div>
          <a-slider class="adjust-slider" v-model:value="thresholdValue" :min="0" :max="1" :step="0.1"
                    @afterChange="handleThresholdChange" />
          <a-input-number class="adjust-input" v-model:value="thresholdValue" :min="0" :max="1" :step="0.1" size="small"
                          @change="handleThresholdChange" />
          <a-tooltip placement="top" style="display: inline-block">
            <template #title>
              <span><!--            TODO --></span>
            </template>
            <a-icon type="question-circle" theme="filled" />
          </a-tooltip>
        </div>
        <a-table :columns="thresholdCols" :data-source="thresholdData" :rowKey="(record, index) => index"
                 :pagination="false"></a-table>
      </div>
    </a-spin>
    <a-tabs type="card" @change="choosePlot">
      <a-tab-pane v-for="item in plots" :key="item.key" :tab="item.title">
        <!--        <div class="plot-title">{{item.title}}</div>-->
        <a-spin :spinning="chartLoading">
          <div :id="'plot-' + item.key" style="width: 100%; height: 400px"></div>
        </a-spin>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { getPlotData, getThresholdEval, getQuantileEval } from '@/api/graph'

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
    const mergeRenderer = (value, row, index) => {
      const obj = {
        children: value,
        attrs: {}
      }
      if (index === 0) {
        obj.attrs.rowSpan = 2
      } else {
        obj.attrs.rowSpan = 0
      }
      return obj
    }
    return {
      userRoles: [],
      quantileLoading: false,
      thresholdLoading: false,
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
      quantileData: [],
      thresholdValue: 0.5,
      thresholdCols: [
        {
          title: '',
          dataIndex: 'name',
          key: 'name',
          customRender: mergeRenderer
        }, {
          title: 'dataset',
          dataIndex: 'dataset',
          key: 'dataset',
          customRender: mergeRenderer
        }, {
          title: 'F1-score',
          dataIndex: 'f1',
          key: 'f1',
          customRender: mergeRenderer
        }, {
          title: 'true label \\ predict label',
          dataIndex: 'label',
          key: 'label',
        }, {
          title: '0',
          dataIndex: '0',
          key: '0',
        }, {
          title: '1',
          dataIndex: '1',
          key: '1',
        }
      ],
      thresholdData: [],
      plots: [
        {
          key: 'roc',
          title: 'ROC'
        },
        {
          key: 'ks',
          title: 'K-S'
        },
        {
          key: 'lift',
          title: 'Lift'
        },
        {
          key: 'gain',
          title: 'Gain'
        },
        {
          key: 'precision',
          title: 'Precision Recall'
        },
        {
          key: 'accuracy',
          title: 'Accuracy'
        }
      ],
      currentPlot: 'roc',
      chart: null,
      chartLoading: true
    }
  },
  mounted() {
    this.userRoles = this.$store.getters.roles
  },
  watch: {
    node: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.queryMetrics()
        }
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    currentPlotTitle() {
      let title = ''
      this.plots.forEach(e => {
        if (e.key === this.currentPlot) {
          title = e.title
        }
      })
      return title
    }
  },
  methods: {
    queryMetrics() {
      this.getQuantileEval()
      this.getThresholdEval()
      this.choosePlot()
    },
    handleQuantileChange(val) {
      this.quantileValue = val
      this.getQuantileEval()
    },
    getQuantileEval() {
      console.log('quantile', this.quantileValue)
      this.quantileLoading = true
      getQuantileEval().then(response => {
        if (response.code === 0) {
          this.quantileData = response.data
        }
        this.quantileLoading = false
      })
    },
    handleThresholdChange(val) {
      this.thresholdValue = val
      this.getThresholdEval()
    },
    getThresholdEval() {
      console.log('threshold', this.thresholdValue)
      this.thresholdLoading = true
      let opts = {
        projectUuid: this.node.projectUuid,
        taskUuid: this.node.taskUuid,
        nodeId: this.node.nodeId,
        roles: this.userRoles,
        threshold: this.thresholdValue
      }
      getThresholdEval(opts).then((response) => {
        if (response.code === 0) {
          this.thresholdData = response.data
        }
        this.thresholdLoading = false
      })
    },
    choosePlot(key) {
      this.chartLoading = true
      console.log('tab key == ', key)
      if (key) this.currentPlot = key
      if (this.chart) this.chart.dispose()
      this.chart = null
      this.$nextTick(() => {
        this.plot()
      })
    },
    plot() {
      getPlotData().then(response => {
        if (response.code === 0) {
          this.chart = this.$echarts.init(document.getElementById('plot-' + this.currentPlot));
          let option = {
            title: {
              text: this.currentPlotTitle
            },
            showSymbol: false,
            tooltip: {
              trigger: "axis",
              triggerOn: "mousemove|click",   // tooltip触发事件
            },
            legend: {
              data: response.data.legend
            },
            xAxis: {
              type: 'value',
              axisTick: {
                alignWithLabel: true
              },
              axisPointer: {
                show: true,
                type: "line",
                label: {
                  show: true
                },
              },
              splitNumber: 5
            },
            yAxis: {
              axisLine: {show: true},
              type: 'value'
            },
            series: response.data.series,

          };
          // 使用刚指定的配置项和数据显示图表。
          this.chart.setOption(option);
          console.log('chart', this.chart)
        }
        this.chartLoading = false
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
  .eval-score-container {
    margin-bottom: 20px;
  }
  .plot-title {
    font-weight: bold;
    font-size: 14px;
  }
</style>