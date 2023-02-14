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
import data from '@/store/modules/data'
import { axios } from '@/utils/request'

export function getDataList() {
  return axios({
    url: '/v1/data',
    method: 'get'
  })
}
export function uploadLocalData(params,name,description) {
  return axios({
    url: `/v1/data?name=${name}&description=${description}`,
    method: 'post',
    processData: false,
    data: params,
  })
}
export function deleteDataFile(dataId) {
  return axios({
    url: `/v1/data/${dataId}`,
    method: 'delete'
  })
}
export function getDataDetailInfo(dataId) {
  return axios({
    url: `/v1/data/${dataId}`,
    method: 'get'
  })
}
export function getDataHeaders(params) {
  return axios({
    url: `/v1/data/${params}/columns`,
    method: 'get'
  })
}
export function downloadDataFile(dataId) {
  return axios({
    url: `/v1/data/${dataId}/file`,
    method: 'get'
  })
}
export function updateDataRecordIdMetaInfo(params) {
  return axios({
    url: `/v1/data/${params.uuid}/idmetainfo`,
    method: 'put',
    data: {
      idEncryptionType: params.idEncryptionType,
      idType: params.idType
    }
  })
}

export function checkChunk(params){
  return axios({
    url:`/v1/data/checkChunk?hash=${params}`,
    method:'get',
  })
}

export function uploadSlice(params){
  return axios({
    url:`/v1/data/uploadSlice`,
    method:'post',
    data:params
  })
}

export function merge(params){
  return axios({
    url:`/v1/data/merge`,
    method:'post',
    data:params
  })
}