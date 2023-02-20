<template>
  <div>
    <a-space>
      <a-button @click="save"> 保存 </a-button>
      <a-button @click="run"> 运行 </a-button>
    </a-space>
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

import { VueGraphData } from '../graph/data';
import { saveGraphData, runGraph, getComponentsStatus } from '@/api/graph'
export default {
  props: {
    vueGraph: {},
    nodeStatusList: {},
    taskUuid: {},
    projectUuid: {}
  },
  data() {
    return {
      timer: null,
      continueQuery: true,
    }
  },
  mounted() {

  },
  methods: {
    //保存当前流程图
    save() {
      const graphData = this.vueGraph.toJSON();
      saveGraphData({ projectUuid: this.projectUuid, taskUuid: this.taskUuid, graphData: graphData }).then(response => {
        if (response.code === 0) {
          this.$message.success(response.message)
        } else {
          this.$message.warning(response.message)
        }
      })
    },
    // 轮询查询节点状态
    setTimeoutForInterval() {
      const sendReq = function (that) {
        that.timer = setTimeout(function () {
          that.getNodeStatus().then(res => {
            clearTimeout(that.timer);
            if (that.continueQuery) {
              sendReq(that)
            }
          })
        }, 3000)
      }
      sendReq(this)
    },
    // 获取节点状态并更新节点状态
    getNodeStatus() {
      let nodeList = [];
      let continueFlag = true;
      this.vueGraph.toJSON().cells.forEach((item) => {
        if (item.shape == 'vue-shape') {
          let nodeInfo = {};
          nodeInfo.id = item.id;
          nodeInfo.dslNodeId = item.dslNodeId;
          nodeList.push(nodeInfo);
        }
      })
      let params = {
        projectUuid: this.projectUuid,
        taskUuid: this.taskUuid,
        nodeList: nodeList,
      }
      continueFlag = getComponentsStatus(params).then(res => {
        if (res.code === 0) {
          this.$emit('showNodeStatus', res.data);
          const tmp = JSON.stringify(res.data);
          if (!(tmp.includes('default') || tmp.includes('running')) || tmp.includes('failed')) {
            this.continueQuery = false;
            continueFlag = false;
          }
        }
      }).catch(e => {
        this.continueQuery = false;
        continueFlag = false;
        console.log(e);
      })
      return continueFlag;
    },
    //运行当前流程
    run() {
      const graphData = this.vueGraph.toJSON();
      runGraph({ projectUuid: this.projectUuid, taskUuid: this.taskUuid, graphData: graphData }).then(res => {
        if (res.code === 0) {
          this.$message.info(res.message);
          this.continueQuery = true;
          this.getNodeStatus().then(res => {
            this.setTimeoutForInterval();
          })
        } else {
          this.$message.warn(res.message);
          this.$message.warn(res.data);
        }
      })
    }
  },
}
</script>
<style  lang='less' scoped>
</style>