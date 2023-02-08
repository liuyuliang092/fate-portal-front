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