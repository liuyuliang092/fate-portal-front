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