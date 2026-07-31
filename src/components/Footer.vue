<template>
  <div class="footer">

    <span>{{ t('footer.effectedCount') }}: {{ effectedFileCount }}; {{ t('footer.filterResult') }}: {{ selectedCount }}; {{ t('footer.importTotal') }}: {{ total }}</span>

    <span class="working-file-span" v-if="waitRenameCount > 0">{{ t('footer.waitingRename') }}: {{ waitRenameCount }} ;
      {{ t('footer.successCount') }}: {{ successRenameCount }} ;
      {{ t('footer.failCount') }}: {{ failRenameCount }} ;
      {{ t('footer.currentRenaming') }}: {{ renameWorkingFile?.name ?? "" }}</span>

    <span class="credits">
      {{ t('footer.originalAuthor') }}: <a href="https://github.com/JasonGrass" target="_blank" rel="noopener">JasonGrass</a> | 
      {{ t('footer.contributor') }}: <a href="https://github.com/hoochanlon" target="_blank" rel="noopener">hoochanlon</a>
    </span>

  </div>
</template>

<script lang="ts" setup>
import { useFileStore } from '@/store/files';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const fileStore = useFileStore()

const { total, selectedCount, waitRenameCount, successRenameCount, failRenameCount, renameWorkingFile } = storeToRefs(fileStore)
const { filteredFiles } = storeToRefs(fileStore)

const effectedFileCount = computed(() => {
  const files = filteredFiles.value
  return files.filter(f => f.name !== f.preview).length
})

</script>

<style lang="less" scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 4px 14px;

  background: var(--app-surface-elevated);
  border-top: 1px solid var(--app-border);
  backdrop-filter: blur(10px);

  font-size: 12px;
  line-height: 20px;
  color: var(--app-muted);
  user-select: none;

  > span {
    min-width: 0;
  }
}

.working-file-span {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--app-text);
}

.credits {
  white-space: nowrap;

  a {
    color: var(--app-accent);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
