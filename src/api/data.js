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