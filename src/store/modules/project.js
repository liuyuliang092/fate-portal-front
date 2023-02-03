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
    getAllProjectList({ commit }) {
      return new Promise((resolve, reject) => {
        getAllProjectList().then(res => {
          const { message, data, code } = res;
          if (code === 0) {
            commit('SET_CLOSEDPROJECTS', data.closedProjectsDtoList ? data.closedProjectsDtoList.records : [])
            commit('SET_INVITEDPROJECTS', data.invitedProjectsDtoList ? data.invitedProjectsDtoList.records : [])
            commit('SET_JOINEDPROJECTS', data.joinedProjectsDtoList ? data.joinedProjectsDtoList.records : [])
            commit('SET_MYPROJECTS', data.myProjectsDtoList ? data.myProjectsDtoList.records : [])
            commit('SET_ALLPROJECTS', data.allProjectsDtoList ? data.allProjectsDtoList.records : [])
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