/* eslint-disable */
<template>
  <div>
    <a-layout>
      <a-layout-sider style="background: #fff">
        <AlgoNodeTree/>
        <!-- <NodeList></NodeList> -->
      </a-layout-sider>
      <a-layout>
        <a-layout-header>Header</a-layout-header>
        <a-layout-content>
          <div id="container"></div>
        </a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>

import AlgoNodeTree from './AlgoNodeTree.vue';
import DagGraph from './graph';
import { DagData } from "./const/data.js";
import NodeList from './NodeList.vue';

const data = {
  // 节点
  nodes: [
    {
      id: 'node1', // String，可选，节点的唯一标识
      x: 40, // Number，必选，节点位置的 x 值
      y: 40, // Number，必选，节点位置的 y 值
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      label: 'hello', // String，节点标签
      shape: 'rect'
    },
    {
      id: 'node2', // String，节点的唯一标识
      x: 160, // Number，必选，节点位置的 x 值
      y: 180, // Number，必选，节点位置的 y 值
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      label: 'world' // String，节点标签
    }
  ],
  // 边
  edges: [
    {
      source: 'node1', // String，必须，起始节点 id
      target: 'node2' // String，必须，目标节点 id
    }
  ]
};
export default {
  name: "algoDag",
  data() {
    return {
      graph: ''
    }
  },
  created() {

  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // const graph = new Graph({
      //   container: document.getElementById("container"),
      //   width: 1200,
      //   height: 600,
      //   // background: {
      //   //   color: '#fffbe6', // 设置画布背景颜色
      //   // },
      //   grid: {
      //     size: 10,      // 网格大小 10px
      //     visible: true, // 渲染网格背景
      //   },
      //   panning: {
      //     enabled: true,
      //     eventTypes: ['leftMouseDown']
      //   }
      // });
      // graph.centerContent();
      // graph.fromJSON(data);
      this.graph = DagGraph.init('#container');
      this.enabled = true;
      // this.initClickEvent();
      // // 装载流程图数据
      DagGraph.initGraphShape(DagData);
    },

    // 初始化点击事件
    async initClickEvent() {
      this.graph.on("blank:click", async () => {
        if (this.currentCell !== null) {
          this.clearData();
        }
      });
      this.graph.on("cell:click", ({ cell }) => {
        const isNode = cell.isNode();
        this.clearData();
        if (isNode) {
          this.getNodeInfo(cell);
        }
      })
    },

  },
  components: { AlgoNodeTree, NodeList }
}
</script>
