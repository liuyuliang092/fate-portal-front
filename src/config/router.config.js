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
// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/site',
    children: [
      {
        path: '/site',
        name: 'Site',
        component: () => import('@/views/site/NewSite'),
        meta: { title: '站点管理', keepAlive: true, icon: 'form' }
      },
      {
        path: '/project',
        name: 'Project',
        component: () => import('@/views/project/Project'),
        meta: { title: '项目管理', keepAlive: true, icon: 'form' },
      },

      {
        path: '/project-info',
        name: 'project-info',
        hidden: true,
        component: () => import('@/views/project/components/ProjectInfo'),
        meta: { title: '项目详情', keepAlive: true, icon: 'form', }
      },
      {
        path: '/project-task',
        name: 'project-task',
        hidden: true,
        component: () => import('@/views/project/components/TaskManage'),
        meta: { title: '新建任务', keepAlive: true, icon: 'form', }
      },

      {
        path: '/project/newTask',
        name: 'project/newTask',
        hidden: true,
        component: () => import('@/views/project/components/NewTask'),
        meta: { title: '新建任务', keepAlive: true, icon: 'form', }
      },

      {
        path: '/butterfly/algoDag',
        name: 'butterfly/algoDag',
        hidden: true,
        component: () => import('@/views/butterfly/AlgoDag'),
        meta: { title: 'vue-dag流程图', keepAlive: true }
      },

      {
        path: '/data',
        name: 'Data',
        component: () => import('@/views/data/Dataindex'),
        meta: { title: '数据管理', keepAlive: true, icon: 'form' },
      },

      {
        path: '/data-info',
        name: 'data-info',
        hidden: true,
        component: () => import('@/views/data/DataInfo'),
        meta: { title: '数据详情', keepAlive: true, icon: 'form', }
      },


      {
        path: '/modal',
        name: 'Modal',
        component: () => import('@/views/modal/Modalindex'),
        meta: { title: '模型管理', keepAlive: true, icon: 'form' }
      },
      //butterfly
      // {
      //   path: '/butterfly',
      //   redirect: '/butterfly/algoDag',
      //   component: RouteView,
      //   meta: { title: 'DAG流程图', icon: 'form', permission: ['Butterfly'] },
      //   children: [
      //     {
      //       path: '/butterfly/algoDag',
      //       name: 'Butterfly',
      //       component: () => import('@/views/butterfly/AlgoDag'),
      //       meta: { title: 'vue-dag流程图', keepAlive: true, permission: ['Butterfly'] }
      //     }
      //   ]
      // },
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
