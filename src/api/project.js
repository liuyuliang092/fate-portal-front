import Vue from 'vue'
import { axios } from '@/utils/request'

export function getAllProjectList() {
  return axios({
    url: '/v1/project',
    method: 'get'
  })
}
export function createNewProject(params) {
  return axios({
    url: '/v1/project',
    method: 'post',
    data: {
      name: params.name,
      description: params.description,
    }
  })
}
export function getProjectDetail(uuid) {
  return axios({
    url: `/v1/project/${uuid}`,
    method: 'get'
  })
}
export function changeProjectAutoApproval(params) {
  return axios({
    url: `/v1/project/${params.uuid}/data/associate`,
    method: 'put',
    data: {
      enabled: params.enabled
    }
  })
}
export function closeManagedProject(uuid) {
  return axios({
    url: `/v1/project/${uuid}/close`,
    method: 'post',
  })
}
export function getAssociatedDataListForProject(uuid) {
  return axios({
    url: `/v1/project/${uuid}/data`,
    method: 'get',
  })
}
export function associateLocalDataToCurrentProject(params) {
  return axios({
    url: `/v1/project/${params.uuid}/data`,
    method: 'post',
    data: {
      dataId: params.dataId,
      name: params.name
    }
  })
}
export function removeLocalDataFromCurrentProject(params) {
  return axios({
    url: `/v1/project/${params.uuid}/data/${params.dataUUID}`,
    method: 'delete',
  })
}
export function getAvailableLocalDataForProject(uuid) {
  return axios({
    // url: `/v1/project/${uuid}/data/local`,
    url: `/v1/data`,
    method: 'get',
  })
}
export function inviteOtherSiteToProject(params, projectUuid) {
  return axios({
    url: `/v1/project/${projectUuid}/invitation`,
    method: 'post',
    data: {
      description: params.siteDescription,
      name: params.siteName,
      partyId: params.sitePartyId,
      uuid: params.siteUuid,
    }
  })
}
export function getJobListForProject(params) {
  return axios({
    url: `/v1/project/${params}/job`,
    method: 'get',
  })
}
export function createNewJob(params,projectUuid) {
  return axios({
    url: `/v1/project/${projectUuid}/job`,
    method: 'post',
    data: {
      algorithmComponentName: params.algorithmComponentName,
      confJson: params.confJson,
      description: params.desc,
      dslJson: params.dslJson,
      evaluateComponentName: params.evaluateComponentName,
      initiatorData: {
        dataUuid: params.dataUuid,
        labelName: params.labelName
      },
      name: params.name,
      otherSiteData: {
        dataUuid: params.dataUuid,
        labelName: params.labelName
      },
      predictingModelUuid: params.predictingModelUuid,
      trainingAlgorithmType: params.trainingAlgorithmType,
      projectUuid: params.projectUuid,
      trainingComponentListToDeploy: params.trainingComponentListToDeploy,
      trainingModelName: params.trainingModelName,
      trainingValidationEnabled: params.trainingValidationEnabled,
      trainingValidationPercent: params.trainingValidationPercent,
      type: params.type
    }
  })
}
export function joinInvitedProject(uuid) {
  return axios({
    url: `/v1/project/${uuid}/join`,
    method: 'post',
  })
}
export function leaveJoinedProject(params) {
  return axios({
    url: `/v1/project/${params.uuid}/leave`,
    method: 'post',
  })
}
export function getModelList(uuid) {
  return axios({
    url: `/v1/project/${uuid}/model`,
    method: 'get',
  })
}
export function getParticipantList(uuid, all) {
  return axios({
    url: `/v1/project/${uuid}/participant?all=${all}`,
    method: 'get',
  })
}

export function getParticipantAndDataList(uuid) {
  return axios({
    url: `/v1/project/${uuid}/getProjectParticipantAndDataList`,
    method: 'get',
  })
}

export function removePendingParticipant(params) {
  return axios({
    url: `/v1/project/${params.uuid}/participant/${params.participantUUID}`,
    method: 'delete',
  })
}
export function rejectJoinInvitedProject(uuid) {
  return axios({
    url: `/v1/project/${uuid}/reject`,
    method: 'post',
  })
}
export function processProjectClosing_FML(params) {
  return axios({
    url: `/v1/project/internal/${params.uuid}/close`,
    method: 'post',
  })
}
export function addAssociatedRemoteDataToProject_FML(params) {
  return axios({
    url: `/v1/project/internal/${params.uuid}/data/associate`,
    method: 'post',
    data: {
      createdAt: params.createdAt,
      creationTime: params.creationTime,
      dataUuid: params.dataUuid,
      deletedAt: {
        time: params.time,
        valid: params.valid,
      },
      description: params.description,
      id: params.id,
      name: params.name,
      projectUuid: params.projectUuid,
      siteName: params.siteName,
      sitePartyId: params.sitePartyId,
      siteUuid: params.siteUuid,
      status: params.status,
      tableName: params.tableName,
      tableNamespace: params.tableNamespace,
      type: params.type,
      updateTime: params.updateTime,
      updatedAt: params.updatedAt,
      uuid: params.uuid,
    }
  })
}
export function dismissAssociatedRemoteDataFromProject_FML(params) {
  return axios({
    url: `/v1/project/internal/${params.uuid}/data/dismiss`,
    method: 'post',
    data: {

    }
  })
}
export function processParticipantDismissal_FML(params) {
  return axios({
    url: `/v1/project/internal/${params.uuid}/participant/${params.siteUUID}/dismiss`,
    method: 'post',
  })
}
export function processParticipantLeaving_FML(params) {
  return axios({
    url: `/v1/project/internal/${params.uuid}/participant/${params.siteUUID}/leave`,
    method: 'post',
  })
}
export function createJoinedParticipantsForProject_FML(params) {
  return axios({
    url: `/v1/project/internal/${params.uuid}/participants`,
    method: 'post',
    data: {
      createdAt: params.createdAt,
      deletedAt: {
        time: params.time,
        valid: params.valid,
      },
      id: params.id,
      projectUuid: params.projectUuid,
      siteDescription: params.siteDescription,
      siteName: params.siteName,
      sitePartyId: params.sitePartyId,
      siteUuid: params.siteUuid,
      status: params.status,
      updatedAt: params.updatedAt,
      uuid: params.uuid,
    }
  })
}
export function processDataSync_FML(params) {
  return axios({
    url: `/v1/project/internal/event/data/sync`,
    method: 'post',
    data: {
      projectUuid: params.projectUuid
    }
  })
}
export function processListSync_FML(params) {
  return axios({
    url: `/v1/project/internal/event/list/sync`,
    method: 'post',
  })
}
export function processParticipantSync_FML(params) {
  return axios({
    url: `/v1/project/internal/event/participant/sync`,
    method: 'post',
    data: {
      projectUuid: params.projectUuid
    }
  })
}
export function processParticipantInfoUpdate_FML(params) {
  return axios({
    url: `/v1/project/internal/event/participant/update`,
    method: 'post',
    data: {
      description: params.description,
      name: params.name,
      partyId: params.partyId,
      uuid: params.uuid
    }
  })
}
export function processProjectInvitation_FML(params) {
  return axios({
    url: `/v1/project/internal/invitation`,
    method: 'post',
    data: {
      projectAutoApprovalEnabled: params.projectAutoApprovalEnabled,
      projectCreationTime: params.projectCreationTime,
      projectDescription: params.projectDescription,
      projectManager: params.projectManager,
      projectManagingSiteName: params.projectManagingSiteName,
      projectManagingSitePartyId: params.projectManagingSitePartyId,
      projectManagingSiteUuid: params.projectManagingSiteUuid,
      projectName: params.projectName,
      projectUuid: params.projectUuid,
      sitePartyId: params.sitePartyId,
      siteUuid: params.siteUuid,
      uuid: params.uuid
    }
  })
}
export function processInvitationAcceptance_FML(params) {
  return axios({
    url: `/v1/project/internal/invitation/${params.uuid}/accept`,
    method: 'post',
  })
}
export function processInvitationRejection_FML(params) {
  return axios({
    url: `/v1/project/internal/invitation/${params.uuid}/reject`,
    method: 'post',
  })
}
export function processInvitationRevocation_FML(params) {
  return axios({
    url: `/v1/project/internal/invitation/${params.uuid}/revoke`,
    method: 'post',
  })
}
