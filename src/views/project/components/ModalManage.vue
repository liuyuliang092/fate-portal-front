<template>
  <div>
    <a-table :columns="columns" :data-source="data">
      <!-- <span slot="action">
        <a @click="handleDeleteModal">删除</a>
      </span> -->
    </a-table>
  </div>
</template>
<script>
import { getModelList } from '@/api/project'
export default {
  name: '',
  components: {},
  props: ['uuid'],
  data() {
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '模型ID',
        dataIndex: 'modelId',
        key: 'modelId'
      },
      {
        title: '版本',
        dataIndex: 'modelVersion',
        key: 'modelVersion'
      },
      {
        title: '创建时间',
        key: 'createTime',
        dataIndex: 'createTime'
      }
      // {
      //   title: '操作',
      //   key: 'action',
      //   scopedSlots: { customRender: 'action' }
      // }
    ]

    const data = [
      {
        componentName: '123',
        createTime: '123',
        jobName: '123',
        jobUuid: '123',
        modelId: '123',
        modelVersion: '123',
        name: '123',
        partyId: 123,
        projectName: '123',
        projectUuid: '123',
        role: '123',
        uuid: '123'
      }
    ]

    return {
      data,
      columns
    }
  },
  watch: {
    uuid: {
      handler(newValue, oldValue) {
        console.log(newValue, oldValue)
        getModelList(newValue).then(response => {
          if (response.code === 0) {
            this.data = response.data
          } else {
            alert(res.message)
          }
        })
      },
      immediate: true
    }
  },
  methods: {}
}
</script>

<style scoped></style>
