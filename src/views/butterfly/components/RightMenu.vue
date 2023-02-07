<template>
  <div>
    <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
      <div v-for="(i, index) in data" :key="index">
        <!-- <div class="sheet-content-image">
        <img :src="i.details_image" width="50" height="50" style="padding: 5px; overflow: hidden" />
      </div> -->
        <div>
          <dd style="" @mousedown="handleOk(i, $event)">{{ i.menu_name }}</dd>
        </div>
      </div>
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

export default {
  props: {
    visible: {
      default: false
    }
  },
  data() {
    return {
      data: [{
        id: 1,
        menu_name: '删除节点'
      }, {
        id: 2,
        menu_name: '运行'
      }]
    }
  },
  mounted() {
    console.info('menu = ', this.visible);
  },
  methods: {
    handleOk() {

    }
  },
}
</script>
<style  lang='less' scoped>
</style>