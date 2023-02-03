import Vue from 'vue'
import { ONL_AUTH_FIELDS } from "@/store/mutation-types"
import { getModelList } from '@/api/model'


const model = {
  state: {
    //存储对象属性 value,text
    modelList: [{
      component_name: '123',
      name: '555',
      model_version: '1',
      create_time: '123',
      job_name: '123',
      model_id: '555',
      party_id: 1,
      project_name: '123',
      project_uuid: '123',
      role: '123',
      uuid: '123'
    }],
  },
  mutations: {
    SET_MODELLIST: (state, fields) => {
      console.log('fields',fields)
      Vue.set(state, 'modelList', fields)
    }
  },
  actions: {
    // TODO 如果没找到可以尝试请求一下
    async getModelList({ commit }) {
      console.log('dayin')
      const {message, data, code} = await getModelList();
      commit('SET_MODELLIST', data)
    },
     setModelList({commit},newValue) {
      commit('SET_MODELLIST', newValue)
    }

  }
}

export default model