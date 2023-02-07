<template>
  <a-modal :title="node.item ? node.item.data.label : ''" :visible="visible" width="600px">
    <a-form :inline="true" class="demo-form-inline">
      <a-form-item label="名字">
        <a-input v-model="label" placeholder="修改名字"></a-input>
      </a-form-item>
    </a-form>
    <footer class="footer">
      <a-button type="primary" @click="submit">确定</a-button>
    </footer>
  </a-modal>
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
  name: 'dialogMysql',

  data() {
    return {
      visible: false,
      bool: true,
      node: {},
      label: ''
    }
  },
  mounted() {},
  methods: {
    init(item) {
      this.node = item
      this.label = item.item.data.label
    },
    submit() {
      var node = this.$parent.getNodeById(this.node.item.id)
      node.setData(Object.assign({}, this.node.item.data, { label: this.label }))
      // this.node.setData({})
      // this.node.item.data.label = this.label;
      this.visible = false
    }
  }
}
</script>
<style scoped>
section {
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer {
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
