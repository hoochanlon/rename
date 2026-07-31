<template>
  <div class="container">
    <el-input v-model="pattern" :placeholder="t('newNameHelp.placeholder')"></el-input>
    <el-button type="primary" @click="onHelpClick">Help</el-button>
  </div>

  <Teleport to="body">
    <Transition name="help">
      <div class="help-container" v-if="isHelpContentShow">
        <div class="help-content">
          <h3 class="title">{{ t('newNameHelp.title') }}</h3>
          <div class="content">
            <span class="content-line">
              <span class="variable">&lt;name&gt;</span> {{ t('newNameHelp.nameExt').split('; ')[0] }}; <span class="variable">&lt;ext&gt;</span> {{ t('newNameHelp.nameExt').split('; ').slice(1).join('; ') }}
            </span>
            <span class="content-line">
              <span class="variable">&lt;#:1&gt;</span> {{ t('newNameHelp.index') }} <span class="variable">&lt;####&gt;</span>
            </span>
            <span class="content-line">
              <span class="variable">&lt;date&gt;</span>/<span class="variable">&lt;date.now&gt;</span> {{ t('newNameHelp.date').split('; ')[0] }}; <span class="variable">&lt;date.modify&gt;</span> {{ t('newNameHelp.date').split('; ').slice(1).join('; ') }}
            </span>
            <span class="content-line">
              <span class="variable">&lt;time&gt;</span>/<span class="variable">&lt;time.now&gt;</span> {{ t('newNameHelp.time').split('; ')[0] }}; <span class="variable">&lt;time.modify&gt;</span> {{ t('newNameHelp.time').split('; ').slice(1).join('; ') }}
            </span>
            <span class="content-line">
              {{ t('newNameHelp.format') }} <span class="variable">&lt;date.modify:YYYY-MM-DD&gt;</span> /
              <span class="variable">&lt;time:HH-mm-ss&gt;</span> <a href="https://day.js.org/docs/en/display/format"
                target="_blank" referrerpolicy="no-referrer">{{ t('newNameHelp.docs') }}</a>
            </span>

            <span class="content-line">
              <span class="variable">&lt;uuid:8:upper&gt;</span> {{ t('newNameHelp.uuid') }}
            </span>
          </div>
        </div>

      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const pattern = ref("")
const isHelpContentShow = ref(false)

const emits = defineEmits(["submit"])

watchEffect(() => {
  const options = {
    pattern: pattern.value,
  }
  emits("submit", options)
})

const onHelpClick = () => {
  isHelpContentShow.value = !isHelpContentShow.value
}

onDeactivated(() => {
  isHelpContentShow.value = false
})

</script>

<style lang="less" scoped>
.container {
  display: flex;

  button {
    margin: 0 4px 0 12px
  }
}

.content {
  display: flex;
  flex-direction: column;
}

.content-line {
  font-size: 14px;
  line-height: 22px;

  .variable {
    color: #337ecc
  }
}

.help-content {
  margin: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;

}

.help-container {

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;

  height: 170px;
  max-height: 20vh;
  backdrop-filter: blur(6px);
  background-color: rgba(255, 255, 255, 0.6);

}

.help-enter-active,
.help-leave-active {
  transition: all 0.3s ease;
}

.help-enter-from,
.help-leave-to {
  opacity: 0;
  height: 0;
}
</style>
