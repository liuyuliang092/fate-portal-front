import Vue from 'vue'
import { axios } from '@/utils/request'

export function getModelList() {
  return axios({
    url: '/v1/model',
    method: 'get'
  })
}

export function deleteModel(uuid) {
  return axios({
    url: `/v1/model/${uuid}`,
    method: 'delete'
  })
}

export function getModelDetailInfo(params) {
  return axios({
    url: `/v1/model/${params.uuid}`,
    method: 'get'
  })
}

export function publishModelToOnlineServingSystem(params) {
  return axios({
    url: `/v1/model/${params.uuid}/publish`,
    method: 'post',
    data: {
      deploymentType: params.deploymentType,
      parametersJson: params.parametersJson,
      serviceName: params.serviceName
    }
  })
}

export function getListOfDeploymentTypes(params) {
  return axios({
    url: `/v1/model/${params.uuid}/supportedDeploymentTypes`,
    method: 'get'
  })
}

export function handleModelCreate_JobContext(params) {
  return axios({
    url: '/v1/model/internal/event/create',
    method: 'post',
    data: {
      algorithmType: params.algorithmType,
      componentName: params.componentName,
      createTime: params.createTime,
      evaluation: params.evaluation,
      jobName: params.jobName,
      jobUuid: params.jobUuid,
      modelId: params.modelId,
      modelVersion: params.modelVersion,
      name: params.name,
      partyId: params.partyId,
      projectUuid: params.projectUuid,
      role: params.role,
      uuid: params.uuid
    }
  })
}
