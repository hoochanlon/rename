<template>
  <div>
    <OperationWrapper :canFold="true" :title="t('operations.fileFilter')">
      <FileFilter></FileFilter>
    </OperationWrapper>

    <OperationWrapper v-if="Boolean(currentHandler)" :canFold="true" :title="currentHandlerTitle">
      <HandlerContainer :currentHandler="currentHandler"></HandlerContainer>
    </OperationWrapper>

    <OperationWrapper>
      <ActionContainer></ActionContainer>
    </OperationWrapper>

    <OperationWrapper :title="t('operations.fileList')">
      <FilesTable></FilesTable>
    </OperationWrapper>

  </div>
</template>

<script lang="ts" setup>
import HandlerFactory from '@/lib/handler/HandlerFactory';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const handlers = HandlerFactory.handlers

const currentHandler = ref<IRenameHandler>()
const currentHandlerTitle = computed(() => {
  if (!currentHandler.value) {
    return ''
  }
  return t(`handlers.${currentHandler.value.id}`)
})
watch(handlers, () => {
  const current = handlers.find(h => h.active)
  currentHandler.value = current
})

onMounted(() => {
  currentHandler.value = handlers[0]
})

</script>

<style lang="less" scoped></style>
