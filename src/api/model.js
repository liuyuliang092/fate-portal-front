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
