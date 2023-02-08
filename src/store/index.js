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
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import model from './modules/model'
import project from './modules/project'
import data from './modules/data'

// default router permission control
// 默认路由模式为静态路由 (router.config.js)
// import permission from './modules/static-router'

// dynamic router permission control (Experimental)
// 动态路由模式（api请求后端生成）
import permission from './modules/async-router'

import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    model,
    project,
    data
  },
  state: {},
  mutations: {},
  actions: {},
  getters
})
