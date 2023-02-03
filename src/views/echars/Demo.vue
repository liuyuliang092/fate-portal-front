<template>
  <div class="home">
    <sheet-list v-for="(item, index) in sheetList" :item="item" v-bind:key="index"></sheet-list>
  </div>
</template>
   <script>
import myMusicSheetList from './DataForm.vue'

export default {
  components: { 'sheet-list': myMusicSheetList },
  data() {
    return {
      sheetList: [{
        id: 1,
        name: '我创建的歌单',
        num: 2,
        details: [{
          details_id: 1,
          details_name: '我喜欢的音乐',
          details_num: 30,
          details_image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521191038714&di=117b8f1d83605767e8a7faf01cb9be9b&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F8435e5dde71190efc4376916c41b9d16fcfa602f.jpg'
        }, {
          details_id: 2,
          details_name: '在欧洲田园般的乡村上骑单车',
          details_num: 15,
          details_image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521190642670&di=67822ec270160c1fb21e67d49e95a97f&imgtype=0&src=http%3A%2F%2Fpic30.nipic.com%2F20130615%2F2861027_140302450156_2.jpg'
        }]
      }, {
        id: 2,
        name: '我收藏的歌单',
        num: 2,
        details: [{
          details_id: 1,
          details_name: '这应该是你比较喜欢听的歌曲了',
          details_num: 10,
          details_image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3679981803,1758706610&fm=27&gp=0.jpg'
        }, {
          details_id: 2,
          details_name: '欧美风格的音乐，安静的听',
          details_num: 2,
          details_image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2406805917,4090912031&fm=27&gp=0.jpg'
        }]
      }]
    }
  },
  methods: {

  },
  mounted: function () {

  }
}
   </script>
   <style scoped>
</style>