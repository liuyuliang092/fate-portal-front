<template>
  <a-card :bordered="false">
    <a-result status="error" :title="result.title" :sub-title="result.description">
      <template #extra>
        <a-button type="primary" >{{ $t('result.fail.error.btn-text') }}</a-button>
      </template>
      <div class="desc">
        <div style="font-size: 16px; color: rgba(0, 0, 0, 0.85); font-weight: 500; margin-bottom: 16px">
          {{ $t('result.fail.error.hint-title') }}
        </div>
        <div style="margin-bottom: 16px">
          <a-icon type="close-circle-o" style="color: #f5222d; margin-right: 8px"/>
          {{ $t('result.fail.error.hint-text1') }}
          <a style="margin-left: 16px">{{ $t('result.fail.error.hint-btn1') }} <a-icon type="right" /></a>
        </div>
        <div>
          <a-icon type="close-circle-o" style="color: #f5222d; margin-right: 8px"/>
          {{ $t('result.fail.error.hint-text2') }}
          <a style="margin-left: 16px">{{ $t('result.fail.error.hint-btn2') }} <a-icon type="right" /></a>
        </div>
      </div>
    </a-result>
  </a-card>
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

export default {
  name: 'Error',
  computed: {
    result () {
      return {
      title: this.$t('result.fail.error.title'),
      description: this.$t('result.fail.error.description')
      }
    }
  }
}
</script>
