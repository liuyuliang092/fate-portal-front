/* eslint-disable */
<template>
  <div>
      <dl>
        <dt>数据源</dt>
        <dd @mousedown="startDragToGraph('startNode', $event)">样本集加载</dd>
        <dd @mousedown="startDragToGraph('startNode', $event)">样本集加载big</dd>
        <dt>机器学习</dt>
        <dd @mousedown="startDragToGraph('endNode', $event)">逻辑回归</dd>
        <dd @mousedown="startDragToGraph('taskNode', $event)">评分卡</dd>
      </dl>
  <!-- <dl @mousedown="startDragToGraph('endNode', $event)">
        <dt class="circle end"></dt>
        <dd>结束节点</dd>
      </dl>
      <dl @mousedown="startDragToGraph('taskNode', $event)">
        <dt class="rect end"></dt>
        <dd>任务节点</dd>
      </dl> -->
  </div>
  <!-- <div>
    <a-tree :tree-data="gData" @select="onSelect">
      <template #title="{ title }">
        <span v-if="title.indexOf(searchValue) > -1">
          {{ title.substr(0, title.indexOf(searchValue)) }}
          <span style="color: #f50">{{ searchValue }}</span>
          {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
        </span>
        <span v-else>{{ title }}</span>
      </template>
    </a-tree>
  </div> -->
  <!-- <div>
    <a-collapse v-model:activeKey="activeKey">
      <a-collapse-panel key="1" header="数据源">
        <p>1111</p>
      </a-collapse-panel>
      <a-collapse-panel key="2" header="机器学习">
        <p>2222</p>
      </a-collapse-panel>
    </a-collapse>
  </div> -->
</template>

<script>
import { ref } from 'vue';
import VueGraph from '../butterfly/graph';
import { VueGraphData } from '../butterfly/graph/data';
export default {
  data() {
    return {
      gData: [],
      activeKey: ''
    }
  },
  mounted() {
    this.gData = ref(VueGraphData.genData);
  },
  methods: {
    // 拖拽节点新增
    startDragToGraph(type, e) {
      VueGraph.startDragToGraph(type, e);
    },
    //选中
    onSelect(selectedKeys, info) {
      console.info('selectedKeys = ', selectedKeys, 'info = ', info);
      this.startDragToGraph(selectedKeys, info.event);
    },
  },
}
</script>
<style  lang='less' scoped>
</style>