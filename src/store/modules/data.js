import Vue from 'vue'

import { getDataList } from '@/api/data'


const data = {
  state: {
    //存储对象属性 value,text
    dataList: [],
  },
  mutations: {
    SET_DATALIST: (state, fields) => {
      console.log('fields',fields)
      // state.dataList = state.dataList.concat(fields);
      Vue.set(state, 'dataList', fields)
    }
  },
  actions: {
    async getDataList({ commit }) {
      const {message, data, code} = await getDataList();
      commit('SET_DATALIST', data.records)
    },
    setDataList({commit}, newValue) {
      commit('SET_DATALIST', newValue)
    }
  }
}

export default data