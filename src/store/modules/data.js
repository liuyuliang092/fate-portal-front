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