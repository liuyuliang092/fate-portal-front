import Vue from 'vue'
import { axios } from '@/utils/request'

export function getSiteData() {
  return axios({
    url: '/v1/site',
    method: 'get'
  })
}

export function updateSiteInfo(params) {
  return axios({
    url: '/v1/site',
    method: 'put',
    data: {
      createAt: params.createAt,
      deleteAt: {
        time: params.time,
        valid: params.valid
      },
      description: params.description,
      externalHost: params.externalHost,
      externalPort: params.externalPort,
      fateFlowConnected: params.fateFlowConnected,
      fateFlowConnectedAt: params.fateFlowConnectedAt,
      fateFlowGrpcPort: params.fateFlowGrpcPort,
      fateFlowHost: params.fateFlowHost,
      fateFlowHttpPort: params.fateFlowHttpPort,
      fmlManagerConnected: params.fmlManagerConnected,
      fmlManagerConnectedAt: params.fmlManagerConnectedAt,
      fmlManagerEndpoint: params.fmlManagerEndpoint,
      fmlManagerServerName: params.fmlManagerServerName,
      https: params.https,
      id: params.id,
      kubeflowConfig: {
        kubeconfig: params.kubeconfig,
        minioAccessKey: params.minioAccessKey,
        minioEndpoint: params.minioEndpoint,
        minioRegion: params.minioRegion,
        minioSecretKey: params.minioSecretKey,
        minioSslEnabled: params.minioSslEnabled
      },
      kubeflowConnected: params.kubeflowConnected,
      kubeflowConnectedAt: params.kubeflowConnectedAt,
      name: params.name,
      partyId: params.partyId,
      updatedAt: params.updatedAt,
      uuid: params.uuid
    }
  })
}

export function testSiteConnection(params) {
  return axios({
    url: '/v1/site/fateflow/connect',
    method: 'post',
    data: {
      host: params.host,
      https: params.https,
      port: params.port
    }
  })
}

export function connectToFmlManageAndRegister(params) {
  return axios({
    url: '/v1/site/fmlmanager/connect',
    method: 'post',
    data: {
      endpoint: params.endpoint,
      serverName: params.serverName,
    }
  })
}

export function checkFateFlowHealth() {
  return axios({
    url: '/v1/checkFateFlowHealth',
    method: 'get',
  })
}

export function testSiteConnectionToKubeflow(params) {
  return axios({
    url: '/v1/site/kubeflow/connect',
    method: 'post',
    data: {
      kubeconfig: params.kubeconfig,
      minio_access_key: params.minio_access_key,
      minio_endpoint: params.minio_endpoint,
      minio_region: params.minio_region,
      minio_secret_key: params.minio_secret_key,
      minio_ssl_enabled: params.minio_ssl_enabled,
    }
  })
}


