<template>
  <a-modal :title="itemDetail.label" :visible="visible" width="300px" @ok="submit">
    <a-radio-group v-model="bool" :default-value="true"
      ><a-radio :value="true">true条件</a-radio> <a-radio :value="false">false条件</a-radio></a-radio-group
    >
  </a-modal>
</template>

<script>
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
