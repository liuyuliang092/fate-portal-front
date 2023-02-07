<template>
  <div>
    <a-card v-for="(obj, index) in invitedProjects" :key="index" size="small" :title="obj.name" style="width: 300px">
      <div slot="extra">
        <a @click="handleAccept(obj.uuid)">接受</a>&nbsp; <a @click="handleReject(obj.uuid)">拒绝</a>
      </div>
      <ul>
        <li>描述：{{ obj.description }}</li>
        <li>创建时间：{{ obj.createAt }}</li>
        <li>项目管理者：{{ obj.manager }}</li>
        <li>站点名称：{{ obj.managingSiteName }}</li>
        <li>组织ID：{{ obj.managingSitePartyId }}</li>
      </ul>
    </a-card>
  </div>
</template>

<script>
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

import { joinInvitedProject, rejectJoinInvitedProject } from '@/api/project'
export default {
  data() {
    return {}
  },
  computed: {
    invitedProjects: {
      get: function() {
        console.info('invitedProjects = ',this.$store.getters.invitedProjects)
        return this.$store.getters.invitedProjects
      }
    }
  },
  methods: {
    handleAccept(uuid) {
      console.log(uuid + 'accept')
      joinInvitedProject(uuid)
      location.reload()
    },
    handleReject(uuid) {
      console.log(uuid + 'reject')
      rejectJoinInvitedProject(uuid)
    }
  }
}
</script>

<style lang="scss" scoped></style>
