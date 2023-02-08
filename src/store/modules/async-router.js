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
/**
 * asyncRouter
 */
import { asyncRouterMap, constantRouterMap } from '@/config/router.config'
import { generatorDynamicRouter } from '@/router/generator-routers'
import cloneDeep from 'lodash.clonedeep'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      // return new Promise((resolve, reject) => {
        // const { token } = data
        // generatorDynamicRouter(token).then(routers => {
        //   commit('SET_ROUTERS', routers)
        //   resolve()
        // }).catch(e => {
        //   reject(e)
        // })
        const routerMap = cloneDeep(asyncRouterMap)
        console.log('async router = ',routerMap)
        commit('SET_ROUTERS', routerMap)
        // resolve()
      // })
    }
  }
}

export default permission
