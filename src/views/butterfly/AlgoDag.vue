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
          ></HeaderVue>
          <a-layout-content>
            <div style="width:100%; height:100%">
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
  </div>
</template>

<script>
// import { Graph, Addon, Path } from "@antv/x6";
// import "@antv/x6-vue-shape";
import nodeTemplate from "@/views/butterfly/components/NodeTemplate";
import nodeList from '@/views/butterfly/components/NodeList';
import RightDrawer from './components/RightDrawer';
import RightMenu from './components/RightMenu';
import HeaderVue from "@/views/butterfly/components/Header";
import VueGraph from './graph';
import { VueGraphData } from './graph/data';
import { getGraphData, getAlgorithmComponents } from '@/api/graph'

// let graph = null;
export default {
  name: "Vuedag",
  components: {
    nodeTemplate,
    nodeList,
    RightDrawer,
    RightMenu,
    HeaderVue
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
    }
  },
  mounted() {
    console.log('new dag id = ', this.$route.params.projectUuid)
    this.projectUuid = this.$route.params.projectUuid
    this.taskUuid = this.$route.params.taskUuid
    //加载画布
    this.initVueGraph();
    //加载已有流程图
    this.initVueGraphData(this.projectUuid, this.taskUuid);
    
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
      console.info('node click info = ', this.onclickNodeData);
    });
    this.graph.on('selection:changed', (args) => {
      args.added.forEach(cell => {
        this.selectCell = cell
      })
    });
    this.graph.centerContent({ padding: { right: 550 } });
  },
  methods: {
    //初始化画布
    initVueGraph() {
      const miniMapContainerRef = this.$refs.miniMapContainerRef;
      this.graph = VueGraph.init("vue-dag", nodeTemplate, miniMapContainerRef);
    },
    //查询当前项目画布数据
    initVueGraphData(projectUuid, taskUuid) {
      let params = {
        projectUuid: projectUuid,
        taskUuid: taskUuid,
      };
      getGraphData(params).then(res => {
        console.info('graph data from mock = ', JSON.parse(JSON.stringify(VueGraphData.nodeData)))
        if (res.code === 0) {
          console.info('graph data from back = ', res.data.graphData.cells)
          this.graphData = res.data.graphData.cells;
          this.init(this.graphData);
        }
      });
      // this.graphData = VueGraphData;
      //此处必须使用深拷贝，否则后面数据修改会由于浅拷贝导致影响数据结构进而影响后续数据加载
      // const tmp = JSON.parse(JSON.stringify(VueGraphData.nodeData))
      // return tmp;
    },

    //初始化节点列表
    async initVueGraphNodeData() {
      this.nodeList = [];
      const resposne = await getAlgorithmComponents(1)
      if (resposne.code === 0) {
        console.info('node list = ', resposne.data);
        this.nodeList = resposne.data;
      }
      // this.nodeList = VueGraphData.nodeList;
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
            // item.tools = nodeTools;
            // if (item.ports) {
            //   item.ports = {
            //     groups: {
            //       top: {
            //         position: 'top',
            //         attrs: {
            //           circle: {
            //             r: 4,
            //             magnet: true,
            //             stroke: '#C2C8D5',
            //             strokeWidth: 1,
            //             fill: '#fff',
            //           },
            //         },
            //       },
            //       bottom: {
            //         position: 'bottom',
            //         attrs: {
            //           circle: {
            //             r: 4,
            //             magnet: true,
            //             stroke: '#C2C8D5',
            //             strokeWidth: 1,
            //             fill: '#fff',
            //           },
            //         },
            //       },
            //     },
            //     items: item.ports,
            //   };
            // }
            cells.push(this.graph.createNode(item));
          } else {
            cells.push(this.graph.createEdge(item));
          }
        });
      }
      this.graph.resetCells(cells);
    //   //测试用，后续需根据实际情况查询
    // this.nodeStatusList = JSON.parse(JSON.stringify(VueGraphData.nodeStatusList));
    // //更新状态
    // this.showNodeStatus(this.nodeStatusList);
    },
    //定时运行查询节点运行结果并更新页面节点状态
    showNodeStatus(statusList) {
      // let status = statusList.shift();
      statusList?.forEach((item) => {
        let { id, status } = item;
        let node = this.graph.getCellById(id);
        let data = node.getData();
        node.setData({
          ...data,
          status: status,
          statusImg: VueGraphData.nodeImage[status],
        });
      });
      setTimeout(() => {
        this.showNodeStatus(statusList);
      }, 2000);
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
