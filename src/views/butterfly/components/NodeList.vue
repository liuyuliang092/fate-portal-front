<template>
  <div class="sheet-list">
    <div class="sheet-header" @click="toggleSheet">
      <a-icon type="caret-right" theme="filled" v-show="!showSheets" class="sheet-arrow-span"/>
      <a-icon type="caret-down" theme="filled" v-show="showSheets" class="sheet-arrow-span"/>
      <span class="sheet-header-span">{{ data_item.groupName }} <span> ({{ data_item.nodeNum }}) </span></span>
    </div>
    <div v-show="showSheets" class="sheet-content" v-for="(i, index) in data_item.children" :key="index">
      <div class="sheet-content-middle">
        <!-- <dd style="" @mousedown="startDragToGraph(i, $event)">{{ i.details_name }}</dd> -->
        <a-button class="sheet-content-middle-button" block @mousedown="startDragToGraph(i, $event)"><a-icon type="database" />{{ i.nodeName }}</a-button>
      </div>
    </div>
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

import VueGraph from '../graph';
export default {
  // components: { RightOutlined },
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {
      showSheets: false,
      data_item: {}
    }
  },
  methods: {
    //向右的小图标动画
    toggleSheet: function (index) {
      this.showSheets = !this.showSheets
    },
    showSheetMenu: function () {
      alert(1111);
    },
    // 拖拽节点新增
    startDragToGraph(type, e) {
      VueGraph.startDragToGraph(type, e);
    },
  },
  created() {
    this.data_item = this.item;
  },
}
 </script>
 <style scoped>
.sheet-list {
  clear: both;
}
.sheet-header {
  height: 30px;
  position: relative;
}

.sheet-arrow-span {
  line-height: 30px;
}
.sheet-header-span {
  left: 15px;
  font-size: 14px;
  position: absolute;
  line-height: 30px;
}
.sheet-content {
  position: relative;
  width: 100%;
  display: flex;
}
.sheet-content-middle {
  position: relative;
  width: 80%;
  border-bottom: 1px solid #f6f1f1;
  padding-bottom: 5px;
  margin-top: 5px;
  margin-left: 10px;
  text-align: left;
  margin-left: 0px;
  padding-left: 0px;
}

.sheet-content-middle-button {
  position: relative;
  text-align: left;
  border-radius: 12px;
  /* margin-left: 0rpx;
  padding-left: 0rpx; */
}
</style>