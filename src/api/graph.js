import Vue from 'vue'
import { axios } from '@/utils/request'

// 查询算法组件列表
export function getAlgorithmComponents(status) {
  return axios({
    url: `/v1/algorithmComponents?status=${status}`,
    method: 'get'
  })
}

// 根据算法组件ID查询算法组件超参
export function getAlgorithmParams(nodeId) {
  return axios({
    url: `/v1/algorithmParams?nodeId=${nodeId}`,
    method: 'get'
  })
}

// 根据项目ID、任务ID、算法组件ID查询已配置参数
export function getAlgorithmParamsSettings(params) {
  return axios({
    url: `/v1/algorithmParamsSettings?projectUuid=${params.projectUuid}&taskUuid=${params.taskUuid}&dslNodeId=${params.dslNodeId}`,
    method: 'get'
  })
}


// 根据项目ID、任务ID查询DAG流程图信息
export function getGraphData(params) {
  return axios({
    url: `/v1/graphData?projectUuid=${params.projectUuid}&taskUuid=${params.taskUuid}`,
    method: 'get'
  })
}

// 保存新建的dag流程图
export function saveGraphData(params) {
  return axios({
    url: '/v1/saveGraphData',
    method: 'post',
    data: params
  })
}

// 保存算法组件配置的参数
export function saveAlgorithmParamsSettings(params) {
  return axios({
    url: '/v1/saveAlgorithmParamsSettings',
    method: 'post',
    data: params
  })
}

// 运行流程
export function runGraph(params) {
  return axios({
    url: '/v1/runGraph',
    method: 'post',
    data: params
  })
}

// 查询流程图各组件运行结果
export function getComponentsStatus(params) {
  return axios({
    url: '/v1/componentsStatus',
    method: 'post',
    data: params
  })
}