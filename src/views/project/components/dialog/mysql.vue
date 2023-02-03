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
