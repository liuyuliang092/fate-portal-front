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
import { getAllProjectList } from '@/api/project'


const project = {
  state: {
    //存储对象属性 value,text
    //关闭的项目
    closedProjects: [
      
    ],
    //我的项目
    invitedProjects: [
      
    ],
    //加入的项目
    joinedProjects: [
  
    ],
    //我的项目
    myProjects: [

    ],
    //我参与的项目
    allProjects: [

    ],
  },
  mutations: {
    SET_CLOSEDPROJECTS: (state, fields) => {
      // console.log('closedProjects', fields)
      Vue.set(state, 'closedProjects', fields)
    },
    SET_INVITEDPROJECTS: (state, fields) => {
      // console.log('invitedProjects', fields)
      Vue.set(state, 'invitedProjects', fields)
    },
    SET_JOINEDPROJECTS: (state, fields) => {
      // console.log('joinedProjects', fields)
      Vue.set(state, 'joinedProjects', fields)
    },
    SET_MYPROJECTS: (state, fields) => {
      // console.log('myProjects', fields)
      Vue.set(state, 'myProjects', fields)
    },
    SET_ALLPROJECTS: (state, fields) => {
      // console.log('allProjects', fields)
      Vue.set(state, 'allProjects', fields)
    }
  },
  actions: {
    getAllProjectList({ commit },pageInfo) {
      return new Promise((resolve, reject) => {
        getAllProjectList(pageInfo).then(res => {
          const { message, data, code } = res;
          console.log("122345")
          if (code === 0) {
            commit('SET_CLOSEDPROJECTS', data.closedProjectsDtoList ? data.closedProjectsDtoList.records : [])
            commit('SET_INVITEDPROJECTS', data.invitedProjectsDtoList ? data.invitedProjectsDtoList.records : [])
            commit('SET_JOINEDPROJECTS', data.joinedProjectsDtoList ? data.joinedProjectsDtoList.records : [])
            commit('SET_MYPROJECTS', data.myProjectsDtoList ? data.myProjectsDtoList.records : [])
            commit('SET_ALLPROJECTS', data.allProjectsDtoList ? data.allProjectsDtoList : [])
          } else {
            alert(message)
          }
          resolve(res);
        });
      })
    }
  }
}

export default project