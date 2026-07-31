<script setup lang="ts">
import { ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const isMobile = ref(false)

onMounted(() => {
  isMobile.value = checkIsMobile();
  if (isMobile.value) {
    return
  }

  if (globalThis.location.protocol === "http:" && !globalThis.location.host.includes("localhost")) {
    ElMessageBox.alert(t('app.httpWarning'), t('app.httpWarningTitle'), {
      confirmButtonText: t('app.confirmButton'),
    })
    return
  }

  const f = globalThis.showOpenFilePicker
  const chromeVersion = getChromeVersion()
  if (typeof f !== "function" || chromeVersion < 112) {
    ElMessageBox.alert(t('app.browserWarning'), t('app.browserWarningTitle'), {
      confirmButtonText: t('app.confirmButton'),
    })
  }

})

const checkIsMobile = () => {
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  return Boolean(flag);
}

function getChromeVersion(): number {
  const userAgent = globalThis.navigator.userAgent
  var regExp = /Chrome\/([0-9.]+)/;
  var match = userAgent.match(regExp);
  return match ? parseInt(match[1], 10) : 0;
}

const onGithubClick = () => {
  globalThis.open("https://github.com/hoochanlon/rename", "_self", "noreferrer")
}

</script>

<template>
  <div class="app" v-if="!isMobile">
    <Header></Header>

    <div class="body">
      <HandlerMenu class="menu"></HandlerMenu>
      <Operations class="operation"></Operations>
    </div>

    <Footer class="footer"></Footer>
  </div>

  <div class="app-mobile" v-if="isMobile">
    <img class="logo" src="@/assets/icon256.ico" alt="logo" width="128" height="128">
    <el-text class="text">{{ t('app.mobileTip') }}</el-text>
    <el-text class="text">{{ t('app.mobileNotSupport') }}</el-text>
    <img class="github" src="@/assets/github.svg" alt="github" width="32" @click="onGithubClick" />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  padding-bottom: 28px;
  background: var(--app-bg);
}

.body {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-right: 8px;
  padding: 0 8px 20px;
}

.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: env(safe-area-inset-bottom);
  min-height: 28px;
}

.menu {
  min-width: 180px;
}

.operation {
  flex: 1 1 0%;
}

.app-mobile {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 0;
  padding: 24px;
  background: var(--app-bg);
  color: var(--app-text);

  .logo {
    margin: 0 0 36px;
    border-radius: 24px;
    box-shadow: var(--app-panel-shadow);
  }

  .text {
    max-width: 420px;
    text-align: center;
    word-break: keep-all;
    color: var(--app-muted);
  }

  .github {
    margin-top: 28px;
    padding: 10px;
    border-radius: 999px;
    background: var(--app-surface-elevated);
    box-shadow: var(--app-panel-shadow);
    cursor: pointer;
  }
}

:global(:root[data-theme='dark']) .app-mobile .github {
  filter: invert(1) brightness(1.15);
}
</style>
