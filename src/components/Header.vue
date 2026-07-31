<template>
  <div class="header">
    <span class="title">
      <img src="../assets/icon256.ico" alt="logo" width="32" height="32">
      <span class="title-copy">
        <h1>{{ t('app.title') }}</h1>
        <small>{{ t('app.subtitle') }}</small>
      </span>
    </span>

    <span class="file-loader">
      <el-button @click="importFile">{{ t('header.importFile') }}</el-button>
      <el-button @click="importFolder">{{ t('header.importFolder') }}</el-button>
    </span>

    <span class="about">
      <el-dropdown @command="handleLanguageChange" trigger="click">
        <button class="lang-switch" type="button" :aria-label="t('header.switchLanguage')">
          <img class="lang-icon" src="@/assets/translate.svg" alt="" width="18" height="18" />
          <span class="lang-text">{{ currentLangLabel }}</span>
        </button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="zh-CN">简体中文</el-dropdown-item>
            <el-dropdown-item command="en-US">English</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      
      <button class="repo-link" type="button" @click="onGithubClick" :aria-label="t('header.openRepo')">
        <img src="../assets/github.svg" alt="github" width="20" height="20" />
      </button>
    </span>
  </div>
</template>

<script lang="ts" setup>
import * as fileUtils from '@/utils/file';
import { useFileStore } from '@/store/files';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n()
const store = useFileStore();

const currentLangLabel = computed(() => {
  return locale.value === 'zh-CN' ? '中文' : 'EN'
})

const handleLanguageChange = (lang: string) => {
  locale.value = lang
  localStorage.setItem('locale', lang)
}

const importFile = async () => {
  const file = await fileUtils.importFile();
  if (file) {
    store.addFiles([file])
  }
}

const importFolder = async () => {
  const files = await fileUtils.importFolder();
  store.addFiles(files)
}

const onGithubClick = () => {
  globalThis.open("https://github.com/hoochanlon/rename", "_blank", "noreferrer")
}

</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  margin: 0 0 10px 0;
  padding: 10px 16px;
  min-height: 64px;

  background: var(--app-header-bg);
  border-bottom: 1px solid var(--app-border);
  box-shadow: var(--app-header-shadow);
}

.title {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 220px;

  img {
    border-radius: 10px;
    box-shadow: 0 10px 24px -16px rgba(0, 0, 0, 0.45);
  }
}

.title-copy {
  display: flex;
  flex-direction: column;
  gap: 2px;

  h1 {
    font-size: 18px;
    font-weight: 600;
    color: var(--app-text);
  }

  small {
    color: var(--app-muted);
    font-size: 12px;
    line-height: 1.2;
  }
}

.file-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex: 1;
}

.about {
  display: flex;
  align-items: center;
  gap: 10px;
}

.lang-switch {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 48px;
  height: 38px;
  padding: 0 12px;
  border: 1px solid var(--app-border);
  border-radius: 999px;
  background: var(--app-surface-elevated);
  cursor: pointer;
  transition: transform 0.18s ease, border-color 0.18s ease, background-color 0.18s ease;

  .lang-icon {
    width: 18px;
    height: 18px;
    color: var(--app-text);
    opacity: 0.86;
  }

  .lang-text {
    font-size: 13px;
    font-weight: 500;
    color: var(--app-text);
  }

  &:hover {
    transform: translateY(-1px);
    border-color: var(--app-accent);
    background: var(--app-accent-soft);
  }
}

.repo-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  padding: 0;
  border: 1px solid var(--app-border);
  border-radius: 999px;
  background: var(--app-surface-elevated);
  cursor: pointer;
  transition: transform 0.18s ease, border-color 0.18s ease, background-color 0.18s ease;

  img {
    opacity: 0.86;
  }

  &:hover {
    transform: translateY(-1px);
    border-color: var(--app-accent);
    background: var(--app-accent-soft);
  }
}

:global(:root[data-theme='dark']) .repo-link img,
:global(:root[data-theme='dark']) .lang-switch .lang-icon {
  filter: invert(1) brightness(1.15);
}
</style>
