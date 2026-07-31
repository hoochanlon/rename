<template>
  <div>
    <el-button type="primary" @click="onExecute">{{ t('action.execute') }}</el-button>

    <el-popconfirm :title="t('action.confirmClear')" width="200" @confirm="onClean">
      <template #reference>
        <el-button type="danger">{{ t('action.clear') }}</el-button>
      </template>
    </el-popconfirm>

    <el-button @click="onRefresh">{{ t('action.refresh') }}</el-button>
    <!-- <el-button @click="onHelp">帮助</el-button> -->
  </div>
</template>

<script lang="ts" setup>
import { useFileStore } from '@/store/files';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const fileStore = useFileStore()

const onExecute = async () => {
  try {
    const [success, fail] = await fileStore.renameExecute()
    if (success > 0) {
      ElMessage.success(t('action.executeSuccess', { count: success }))
      console.log(t('action.executeSuccess', { count: success }))
    }
    if (fail > 0) {
      ElMessage.error(t('action.executeFail', { count: fail }))
      console.log(t('action.executeFail', { count: fail }))
    }
  } catch (error: any) {
    ElMessage.error(error.message)
  }
}

const onClean = () => {
  fileStore.clear()
  ElMessage({
    showClose: true,
    message: t('action.clearSuccess'),
    type: "success"
  });
}

const onRefresh = async () => {
  if (fileStore.$state.files.length === 0) {
    ElMessage({
      showClose: true,
      message: t('action.noFilesToRefresh'),
      type: "warning"
    });
    return
  }

  await fileStore.reload()
  ElMessage.success(t('action.refreshSuccess'));
}

</script>

<style lang="less" scoped>
button {
  width: 88px;
}

:deep(.el-button + .el-button),
:deep(.el-popconfirm + .el-button) {
  margin-left: 12px;
}
</style>
