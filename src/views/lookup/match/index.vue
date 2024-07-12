<script setup lang="ts">
import { ref } from "vue";
import UploadFilled from "@iconify-icons/ep/upload-filled";

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
          <el-step title="Upload" description="drag and drop spectrum file." />
          <el-step title="Process" description="process your spectral data" />
          <el-step title="Match" description="Match with our spectra" />
        </el-steps>
      </div>
      <div class="flex justify-center">
        <el-upload
          class="w-4/12"
          drag
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
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
