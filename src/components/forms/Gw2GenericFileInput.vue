<script setup lang="ts">
import { ref } from 'vue';
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus';
import { genFileId } from 'element-plus';

defineProps({
  label: {
    type: String,
    default: '',
  },
  action: {
    type: String,
    default: '',
  },
  isPicture: {
    type: Boolean,
    default: false,
  },
  buttonText: {
    type: String,
    default: 'Pick a file',
  },
  accept: {
    type: String,
    default: '',
  },
});

const upload = ref<UploadInstance>();

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value?.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value?.handleStart(file);
};

const submitUpload = () => {
  upload.value?.submit();
};

defineExpose({ submitUpload });
</script>

<template>
  <el-form-item :label="label">
    <el-upload
      ref="upload"
      class="upload-demo"
      :action="action"
      :limit="1"
      :on-exceed="handleExceed"
      :auto-upload="false"
      :list-type="isPicture ? 'picture' : 'text'"
      :accept="accept || undefined"
    >
      <template #trigger>
        <el-button type="primary"> {{ buttonText }} </el-button>
      </template>
      <template #tip>
        <div class="el-upload__tip text-red">Limit 1 file, new file will cover the old file</div>
      </template>
    </el-upload>
  </el-form-item>
</template>

<style lang="scss"></style>
