import { axios } from '@/utils/request'

export function deleteJob(params) {
  return axios({
    url: `/v1/job/${params}`,
    method: 'delete'
  })
}