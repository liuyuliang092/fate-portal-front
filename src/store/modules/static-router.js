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
import { asyncRouterMap, constantRouterMap } from '@/config/router.config'
import cloneDeep from 'lodash.clonedeep'

/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
function hasPermission (permission, route) {
  if (route.meta && route.meta.permission) {
    // console.log('hasPermission', permission)
    if (permission === undefined) {
      return false
    }
    let flag = false
    for (let i = 0, len = permission.length; i < len; i++) {
      flag = route.meta.permission.includes(permission[i])
      if (flag) {
        return true
      }
    }
    return false
  }
  return true
}

/**
 * 单账户多角色时，使用该方法可过滤角色不存在的菜单
 *
 * @param roles
 * @param route
 * @returns {*}
 */
// eslint-disable-next-line
function hasRole(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(roles.id)
  } else {
    return true
  }
}

function filterAsyncRouter (routerMap, role) {
  const accessedRouters = routerMap.filter(route => {
    if (hasPermission(role.permissionList, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, role)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

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
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const { role } = data
        const routerMap = cloneDeep(asyncRouterMap)
        // const accessedRouters = filterAsyncRouter(routerMap, role)
        // commit('SET_ROUTERS', accessedRouters)
        commit('SET_ROUTERS', routerMap)
        resolve()
      })
    }
  }
}

export default permission
