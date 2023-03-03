/* eslint-disable */
<template>
  <div>
    <a-button type="link" class="back" @click="handleBack"> <a-icon type="double-left" />返回</a-button>
    <a-divider />
    <a-layout>
      <a-layout-sider :style="{ background: '#f2f2f2' }">
        <div>
          <nodeList v-for="(item, index) in this.nodeList" :item="item" v-bind:key="index"></nodeList>
        </div>
      </a-layout-sider>
      <a-layout>
        <a-layout>
          <!-- <a-layout-header :style="{ background: '#f2f2f2', width: '10' }"> -->
          <HeaderVue
            :vueGraph="graph"
            @showNodeStatus="showNodeStatus"
            :nodeStatusList="nodeStatusList"
            :taskUuid="this.$route.params.taskUuid"
            :projectUuid="this.$route.params.projectUuid"
            @beautify="beautifyCanvas"
            ref="header"
          ></HeaderVue>
          <a-layout-content>
            <div style="width: 100%; height: 100%">
              <div id="vue-dag"></div>
            </div>
          </a-layout-content>
        </a-layout>
        <a-layout-sider class="right-sider">
          <div class="mini-map-container" ref="miniMapContainerRef"></div>
          <a-divider />
          <label>组件属性</label>
          <a-divider />
          <RightDrawer
            v-show="showRight"
            @updateVisable="updateVisableFn"
            :onclickNodeData="onclickNodeData"
          ></RightDrawer>
        </a-layout-sider>
      </a-layout>
    </a-layout>
    <!--
      右键菜单
    -->
    <div><RightMenu></RightMenu></div>
    <a-modal v-model:visible.sync="modalVisible" :title="modalTitle" @ok="modalVisible = false" :footer='null' closable width="80%">
      <model-eval-view :node="modalNode" v-if="modalAction === 'viewEval'"></model-eval-view>
    </a-modal>
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
import nodeTemplate from "@/views/butterfly/components/NodeTemplate";
import nodeList from '@/views/butterfly/components/NodeList';
import RightDrawer from './components/RightDrawer';
import RightMenu from './components/RightMenu';
import HeaderVue from "@/views/butterfly/components/Header";
import VueGraph from './graph';
import { DagreLayout } from "@antv/layout"
import { VueGraphData } from './graph/data';
import { getGraphData, getAlgorithmComponents } from '@/api/graph'
import failed from '@/views/butterfly/images/failed.png'
import success from '@/views/butterfly/images/success.png'
import running from '@/views/butterfly/images/running.png'
import ModelEvalView from '@/views/butterfly/components/ModelEvalView.vue'

// let graph = null;
export default {
  name: "Vuedag",
  components: {
    nodeTemplate,
    nodeList,
    RightDrawer,
    RightMenu,
    HeaderVue,
    ModelEvalView
  },
  data() {
    return {
      graph: null,
      graphData: [],
      showRight: false,
      nodeId: '',
      onclickNodeData: {},
      selectCell: '',
      formState: {
        username: '',
        password: '',

      },
      nodeList: [],
      nodeStatusList: [],
      projectUuid: '',
      taskUuid: '',
      dslNodeId: '',
      statusIcons: {
        success:
          success,
        failed:
          failed,
        running:
          running,
        default:
          ''
      },
      modalNode: {},
      modalVisible: false,
      modalTitle: '',
      modalAction: ''
    }
  },
  beforeDestroy() {
    this.$bus.$off('contextAction')
  },
  mounted() {
    this.projectUuid = this.$route.params.projectUuid
    this.taskUuid = this.$route.params.taskUuid
    //加载画布
    this.initVueGraph();
    //加载节点列表
    this.initVueGraphNodeData();
    // 是否显示右则菜单
    this.graph.on('blank:click', () => {
      this.nodeId = ''
      this.showRight = false
    });
    // 节点点击
    this.graph.on('node:click', ({ node }) => {
      const nodeData = node.store.data;
      const { type, id, data, dslNodeId } = nodeData;
      this.showRight = true;
      this.nodeId = data.nodeId;
      this.dslNodeId = dslNodeId;
      this.onclickNodeData = { nodeId: this.nodeId, dslNodeId: dslNodeId, projectUuid: this.projectUuid, taskUuid: this.taskUuid };
    });
    this.graph.on('selection:changed', (args) => {
      args.added.forEach(cell => {
        this.selectCell = cell
      })
    });
    this.graph.centerContent({ padding: { right: 550 } });
    this.$bus.$on('contextAction', (action) => {
      console.log('received!')
      this.handleContextAction(action)
    })
  },
  methods: {
    //初始化画布
    initVueGraph() {
      const miniMapContainerRef = this.$refs.miniMapContainerRef;
      this.graph = VueGraph.init("vue-dag", nodeTemplate, miniMapContainerRef);
      //加载已有流程图
      this.initVueGraphData(this.projectUuid, this.taskUuid);
    },
    //查询当前项目画布数据
    initVueGraphData(projectUuid, taskUuid) {
      let params = {
        projectUuid: projectUuid,
        taskUuid: taskUuid,
      };
      getGraphData(params).then(res => {
        if (res.code === 0) {
          this.graphData = res.data.graphData.cells;
          this.init(this.graphData);
        }
      });
    },

    //初始化节点列表
    async initVueGraphNodeData() {
      this.nodeList = [];
      const resposne = await getAlgorithmComponents(1)
      if (resposne.code === 0) {
        this.nodeList = resposne.data;
      }
    },

    //初始化画布数据
    init(data) {
      let cells = [];
      if (data) {
        data.forEach((item) => {
          if (item.shape === 'vue-shape') {
            item.width = 180;
            item.height = 36;
            item.component = 'nodeTemplate';
            item.data.statusImg=this.statusIcons[item.data.status],
            cells.push(this.graph.createNode(item));
          } else {
            cells.push(this.graph.createEdge(item));
          }
        });
      }
      this.graph.resetCells(cells);
      this.$refs.header.setTimeoutForInterval();
    },
    //定时运行查询节点运行结果并更新页面节点状态
    showNodeStatus(statusList) {
      statusList?.forEach((item) => {
        let { id, status } = item;
        let node = this.graph.getCellById(id);
        let data = node.getData();
        node.setData({
          ...data,
          status: status,
          statusImg: this.statusIcons[status],
        });
      });
    },
    // 更新 RightDrawer visable
    updateVisableFn(val) {
      this.showRight = val
    },
    // 过滤任务节点数据
    filterFn(data) {
      const nodeId = this.nodeId
      let result = {}
      if (nodeId && data.length > 0) {
        const posIndex = data.findIndex(item => item.id === nodeId)
        if (posIndex >= 0) {
          result = data[posIndex]
        }
      }
      return result
    },
    handleBack() {
      this.$router.push({ name: 'project-info', params: { from: 'algoDag', key: '2', uuid: this.projectUuid } }).catch(() => {
        console.log('登录跳转首页出错,这个错误从哪里来的')
      })
    },
    // 美化画布
    beautifyCanvas() {
      const layout = new DagreLayout({
        type: 'dagre',
        rankdir: 'TB',
        align: undefined,
        ranksep: 15,
        nodesep: 15,
      })
      const nodes = []
      const edges = []
      this.graph.toJSON().cells.forEach(c => {
        if (c.shape === 'vue-shape') {
          nodes.push(c)
        } else {
          edges.push(c)
        }
      })
      const model = layout.layout({nodes: nodes, edges: edges})
      this.graph.fromJSON(model)
      this.graph.centerContent()
    },
    doAction() {
      // TODO: context menu action
    },
    handleContextAction(action) {
      switch (action.type) {
        case 'viewEval':
          this.viewModelEval(action)
          break
        default:
          return
      }
    },
    viewModelEval(action) {
      this.modalNode = {
        nodeId: action.nodeId,
        projectUuid: this.projectUuid,
        taskUuid: this.taskUuid
      }
      this.modalAction = action.type
      this.modalTitle = action.title
      this.modalVisible = true
    }
  },
};
</script>

<style>
#vue-dag {
  width: 100%;
  min-height: 650px;
}

.node {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 1px solid #c2c8d5;
  border-left: 4px solid #5f95ff;
  border-radius: 12px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.06);
}
.node img {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-left: 8px;
}
.node .label {
  display: inline-block;
  flex-shrink: 0;
  width: 104px;
  margin-left: 8px;
  color: #666;
  font-size: 12px;
}
.node .status {
  flex-shrink: 0;
}
.node.success {
  border-left: 4px solid #52c41a;
}
.node.failed {
  border-left: 4px solid #ff4d4f;
}
.node.running .status img {
  animation: spin 1s linear infinite;
}
.x6-node-selected .node {
  border-color: #1890ff;
  border-radius: 12px;
  box-shadow: 0 0 0 4px #d4e8fe;
}
.x6-node-selected .node.success {
  border-color: #52c41a;
  border-radius: 12px;
  box-shadow: 0 0 0 4px #ccecc0;
}
.x6-node-selected .node.failed {
  border-color: #ff4d4f;
  border-radius: 12px;
  box-shadow: 0 0 0 4px #fedcdc;
}
.x6-edge:hover path:nth-child(2) {
  stroke: #1890ff;
  stroke-width: 1px;
}

.x6-edge-selected path:nth-child(2) {
  stroke: #1890ff;
  stroke-width: 1.5px !important;
}

@keyframes running-line {
  to {
    stroke-dashoffset: -1000;
  }
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.right-sider {
  /* flex:0 0 350px !important; */
  /* min-width: 350px !important; */
  background: #f2f2f2;
  /* max-width: unset !important; */
}

.dag-form .ant-col .ant-col-3 {
  width: 100%;
}
.ant-form-item-label {
  text-align: left;
}
</style>
