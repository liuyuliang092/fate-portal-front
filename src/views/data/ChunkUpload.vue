<template>
  <div>
    <a-modal
      title="上传本地数据"
      v-model="uploadVisible"
      @ok="handleUpload"
      @cancel="handleCancel"
      cancel-text="取消"
    >
      <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="名称" ref="name" prop="name">
          <a-input
            v-model="form.name"
            @blur="
              () => {
                $refs.name.onFieldBlur()
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item label="描述" prop="description">
          <a-input v-model="form.description" type="textarea" />
        </a-form-model-item>
        <a-form-model-item label="文件" prop="fileList">
          <a-upload :file-list="fileList" :remove="handleRemove" :multiple="false" :before-upload="beforeUpload">
            <a-button>
              <a-icon type="upload" />
              选择文件
            </a-button>
          </a-upload>
          <a-progress
            :percent="Math.round((sliceProgress / sliceCount) * 100)"
            :status="sliceProgress === sliceCount ? 'success' : 'active'"
            v-if="showSliceProgress"
          />
          <a-progress
            :percent="Math.round((finishCount / sliceCount) * 100)"
            :status="finishCount === sliceCount ? 'success' : 'active'"
            v-if="showProgress"
          />
        </a-form-model-item>
      </a-form-model>
      <template slot="footer">
        <a-button
          type="primary"
          :disabled="fileList.length === 0 || !finishSlice"
          :loading="uploading"
          style="margin-top: 16px"
          @click="handleUpload"
        >
          {{ uploading ? '上传中' : '开始上传' }}
        </a-button>
      </template>
    </a-modal>
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
import SparkMD5 from 'spark-md5'
import { message } from 'ant-design-vue';
import { checkChunk, uploadSlice, merge, uploadLocalData } from '@/api/data'
export default {
  data() {
    return {
      fileList: [],
      uploading: false,
      finishSlice: false,
      finishCount: 0,
      showProgress: false,
      sliceCount: 0,
      sliceProgress: 0,
      errorCount: 0,
      showSliceProgress: false,
      fileChunkList: [],
      sendCount: 0,
      filetype: '',
      filename: '',
      hash: '',
      form: {
        name: '',
        description: ''
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      rules: {
        name: [{ required: true, message: '请输入数据名称', trigger: 'blur' }],
        description: [{ required: true, message: '请输入数据描述', trigger: 'blur' }]
      },
      uploadVisible: false,
      destroyOnClose: true,
    }
  },
  mounted() {

  },
  methods: {
    beforeUpload(file) {
      message.info("start file slicing");
      this.showSliceProgress = true;
      this.fileList = [file];
      this.fileChunkList = [];
      this.finishSlice = false;
      this.finishCount = 0;
      this.sliceProgress = 0;
      this.showProgress = false;
      this.sliceCount = 0;
      this.errorCount = 0;
      return new Promise((resolve, reject) => {
        const sparkMd5 = new SparkMD5.ArrayBuffer();
        const fileReaer = new FileReader();
        let fileInfo = file.name.split(".");
        this.filename = fileInfo[0];
        if (fileInfo.length > 1) {
          this.filetype = fileInfo[fileInfo.length - 1];
          for (let i = 1; i < fileInfo.length - 1; i++) {
            this.filename = this.filename + "." + fileInfo[i];
          }
        }
        const chunkSize = 1024 * 1024 * 100;
        this.sliceCount = Math.ceil(file.size / chunkSize);
        let curChunk = 0;
        const sliceNext = () => {
          const chunkFile = file.slice(curChunk, curChunk + chunkSize);
          fileReaer.readAsArrayBuffer(chunkFile);
          this.fileChunkList.push({
            chunk: chunkFile,
            filename: this.filename,
            seq: this.sliceProgress + 1,
            type: this.filetype,
            status: false
          });
          this.sliceProgress++;
        }
        sliceNext();
        fileReaer.onload = (e) => {
          console.info(e)
          sparkMd5.append(e.target.result);
          curChunk += chunkSize;
          if (this.sliceProgress < this.sliceCount) {
            sliceNext();
          } else {
            this.finishSlice = true;
            this.hash = sparkMd5.end();
            message.success("finish slice")
            this.fileChunkList.forEach((content) => {
              content.hash = this.hash
            })
          }
        }
      });

    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      this.hash = "";
      newFileList.splice(index, 1);
      this.fileList = newFileList;
      this.fileChunkList = [];
      this.finishSlice = false;
      this.finishCount = 0;
      this.sliceProgress = 0;
      this.showProgress = 0;
      this.sliceCount = 0;
      this.errorCount = 0;
    },

    async handleUpload() {
      if (!this.finishSlice) {
        this.$message.warn("file in slice,watting");
        return;
      }
      this.showSliceProgress = false;
      checkChunk(this.hash).then(res => {
        if (res.code === 0) {
          this.$message.success(res.message);
          this.fastUpload(this.hash);
        } else {
          this.uploading = true;
          // this.sliceCount -= this.finishCount;
          this.errorCount = 0;
          this.finishCount = 0;
          this.sendCount = 0;
          this.showProgress = true;
          this.startUpload();
        }
      }).catch(error => {
        this.$message.error("error");
        console.log(error)
      })
    },

    startUpload() {
      const next = () => {
        if (this.finishCount + this.errorCount >= this.sliceCount) {
          return;
        }
        let cur = this.sendCount++;
        if (cur >= this.sliceCount) {
          return;
        }
        let content = this.fileChunkList[cur];
        if (content.status === true) {
          if (this.finishCount + this.errorCount < this.sliceCount) {
            next();
            return;
          }
        }
        const formData = new FormData();
        formData.append("file", content.chunk);
        formData.append("hash", content.hash);
        formData.append("filename", content.filename);
        formData.append("seq", content.seq);
        formData.append("type", content.type);
        uploadSlice(formData).then(res => {
          if (res.code === 0) {
            this.finishCount += 1;
            content.status = true;
          } else {
            this.errorCount += 1;
          }
          if (this.errorCount != 0 && this.errorCount + this.finishCount === this.sliceCount) {
            this.$message.error(res.message);
            this.showProgress = false;
            this.uploading = false;
          }
          if (this.errorCount + this.finishCount < this.sliceCount) {
            next();
          }
          if (this.finishCount === this.sliceCount) {
            this.merge();
          }
        }).catch(error => {
          this.errorCount += 1;
          if (this.errorCount != 0 && this.errorCount + this.finishCount === this.sliceCount) {
            this.$message.error("some error occurred during upload, please upload again");
            this.showProgress = false;
            this.uploading = false;
          }
          if (this.errorCount + this.finishCount < this.sliceCount) {
            next();
          }
          console.log(error);
        })
      }
      while (this.sendCount < 10 && this.sendCount < this.sliceCount) {
        next();
      }
    },

    merge() {
      message.success("The file uploaded successfully, waiting for the server to merge");
      let params = {
        hash: this.hash,
        fileName: this.filename,
        type: this.filetype,
        name: this.form.name,
        description: this.form.description
      };
      console.info('params = ', params);
      merge(params).then(res => {
        if (res.code === 0) {
          message.success("The file uploaded successfully");
        } else {
          message.warning("File upload failed");
        }
        this.$store.dispatch('getDataList')
        this.uploading = false;
        this.uploadVisible = false;
      }).catch(error => {
        this.uploading = false;
        this.uploadVisible = false;
        console.log(error)
      })
    },
    handleCancel(e) {
      console.log('Clicked cancel button')
      this.uploadVisible = false
    },

    showModal() {
      if(this.$refs.ruleForm != undefined ){
        this.$refs.ruleForm.resetFields();
      }
      this.uploadVisible = true;
    },

    fastUpload(hash) {
      uploadLocalData(hash, this.form.name, this.form.description).then(response => {
        if (response.code === 0) {
          this.uploading = false;
          this.uploadVisible = false;
          this.$message.success('upload successfully.');
          this.$store.dispatch('getDataList')
        } else {
          this.uploading = false;
          this.uploadVisible = false;
          this.$message.error('upload failed.');
        }
      })
    }
  },
}
</script>
<style  lang='less' scoped>
</style>