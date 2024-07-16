<script lang="ts" setup>
import { ref } from "vue";
import UploadFilled from "@iconify-icons/ep/upload-filled";
import { formatToken, getToken } from "@/utils/auth";
import { useUserStoreHook } from "@/store/modules/user";

const uploadUrl = "/api/specmatch/upload-spec-file-temp/";
const username = useUserStoreHook()?.username;

const activeStep = ref(0);

const onClickNextStep = () => {
  activeStep.value++;
};
const onClickPrevStep = () => {
  activeStep.value--;
};
const onClickReset = () => {
  activeStep.value = 0;
};
</script>

<template>
  <div>
    <el-card shadow="never">
      <template #header>
        <div class="font-bold">Spectrum Matching</div>
      </template>
      <div class="drop-shadow-xl mt-5 mb-10">
        <el-steps :active="activeStep" align-center>
          <el-step description="drag and drop spectrum file." title="Upload" />
          <el-step
            description="pre-process spectral data"
            title="Pre-process"
          />
          <el-step description="Match with our spectra" title="Match" />
        </el-steps>
      </div>
      <div class="flex justify-center">
        <el-upload
          :action="uploadUrl"
          :data="{
            file_name: 'abc',
            user_info: username
          }"
          :headers="{ Authorization: formatToken(getToken().accessToken) }"
          class="w-4/12"
          drag
        >
          <el-icon class="el-icon--upload">
            <IconifyIconOffline :icon="UploadFilled" />
          </el-icon>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">Supported file format: .spc.</div>
          </template>
        </el-upload>
      </div>
      <div class="float-end p-3">
        <el-button type="info" @click="onClickReset">Reset</el-button>
        <el-button type="primary" @click="onClickNextStep">Next</el-button>
      </div>
    </el-card>
  </div>
</template>
