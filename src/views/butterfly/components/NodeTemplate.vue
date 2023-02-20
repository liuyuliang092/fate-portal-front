<template>
  <div :class="nodeClass" class="node" @mousedown="mouseevent">
    <a-dropdown :trigger="['contextmenu']">
      <div>
        <!-- <img :src="logo" /> -->
        <span class="icon-container">
          <a-icon type="database" />
        </span>
        <span class="label" style="font-size: 14px; position: relative; top: -2px; left: 15px;">{{ nodeName }} </span>
        <span class="status" style="text-align: right; position: relative; top: -2px; right: 0px;">
          <img :src="statusImg" v-if="statusImg" />
        </span>
      </div>
      <template #overlay>
        <a-menu @click="nodeMenuClick" style="{width:200,height:300}">
          <a-menu-item v-for="i in data" :key="i.id">{{ i.menu_name }}</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
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

import { menuList, menuList2, menuList3 } from '../graph/menu';
export default {
  inject: ['getGraph', 'getNode'],
  components: {

  },
  data() {
    return {
      status: '',
      nodeName: '',
      statusImg: '',
      logo: '',
      data: []
    }
  },
  mounted() {
    // this.getMenuListByNode();
  },
  methods: {
    mapper(source, target) {
      for (let key in target) {
        target[key] = source?.[key] ?? target[key];
      }
    },
    nodeMenuClick(val) {
      let graph = this.getGraph();
      let node = this.getNode();
    },

    //根据选择不同的组件展示不同的菜单,具体实现根据实际情况修改
    getMenuListByNode(id) {
      if (id === '1') {
        this.data = menuList;
      } else {
        this.data = menuList2;
      }
      this.data = menuList3;
    },
    //
    mouseevent(event) {
      if (event.which === 3) {
        let node = this.getNode();
        this.getMenuListByNode(node.id)
      }
    }
  },
  created() {
    let node = this.getNode();
    //初始化数据绑定
    this.mapper(node.data, this.$data);
    // console.info('node = ', node);
    //节点数据变化监听，从而绑定数据
    node.on('change:data', ({ current }) => this.mapper(current, this.$data));
  },
  computed: {
    nodeClass: function () {
      let clazz = {};
      if (this.status) clazz[this.status] = true;
      return clazz;
    }
  },
}
</script>
<style  lang='less' scoped>
.icon-container {
  text-align: left;
  position: relative;
  right: -12px;
  font-size: large
}
</style>