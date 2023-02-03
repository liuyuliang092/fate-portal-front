/**
 * 向后端请求用户的菜单，动态生成路由
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
