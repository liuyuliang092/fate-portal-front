<template>
  <a-card class="box-card" :style="{ left: x + 'px', top: y + 'px' }" style="padding: 0;">
    <div class="text item" @click.stop="callBack('source')" v-if="item.type !== 'edge'">
      配置数据源
    </div>
    <div class="text item" @click.stop="callBack('remove')">
      删除
    </div>
  </a-card>
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
  name: 'MenuBar',
  data() {
    return {
      x: '',
      y: '',
      item: {}
    }
  },
  mounted() {},
  methods: {
    initFn(x, y, item) {
      this.x = parseInt(x) + ''
      this.y = y + ''
      if (item) {
        this.item = item
      }
    },
    setItem(item) {
      this.item = item
    },
    callBack(type) {
      this.$emit('callBack', type, this.item)
    }
  }
}
</script>
<style scoped>
.box-card {
  position: absolute;
  z-index: 112;
}

.box-card ::v-deep .el-card__body {
  padding: 0;
}

.text {
  font-size: 14px;
}

.item {
  padding: 10px 0;
  text-align: center;
}

.item:hover {
  color: #ffffff;
  background-color: #409eff;
}

.box-card {
  width: 150px;
}
</style>
