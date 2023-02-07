<template>
  <a-modal :title="itemDetail.label" :visible="visible" width="300px" @ok="submit">
    <a-radio-group v-model="bool" :default-value="true"
      ><a-radio :value="true">true条件</a-radio> <a-radio :value="false">false条件</a-radio></a-radio-group
    >
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
  name: 'dialogCondition',

  data() {
    return {
      visible: false,
      bool: true,
      itemDetail: {},
      edge: ''
    }
  },
  mounted() {},
  methods: {
    init(item, edge) {
      this.itemDetail = item
      this.edge = edge
    },
    submit() {
      if (this.bool) {
        if (this.itemDetail.data.t) {
          this.$parent.graph.removeEdge(this.itemDetail.data.t)
        }
        this.itemDetail.data.t = this.edge.id

        this.edge.appendLabel({
          attrs: {
            text: {
              text: 'true'
            }
          }
        })
      } else {
        if (this.itemDetail.data.f) {
          this.$parent.graph.removeEdge(this.itemDetail.data.f)
        }
        this.itemDetail.data.f = this.edge.id
        this.edge.appendLabel({
          attrs: {
            text: {
              text: 'false'
            }
          }
        })
      }

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
