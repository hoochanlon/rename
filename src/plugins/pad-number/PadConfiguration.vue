<template>
  <div class="container">
    <div>
      <el-text>{{ t('pluginOptions.padBefore') }}</el-text>
      <el-input-number v-model="serial" :min="1" controls-position="right"
        style="margin: 0 5px; width: 100px;"></el-input-number>
      <el-text>{{ t('pluginOptions.padMiddle') }}</el-text>
      <el-text>{{ t('pluginOptions.padLength') }}</el-text>
      <el-input-number v-model="length" :min="1" :max="9" controls-position="right"
        style="width: 100px;"></el-input-number>
    </div>
    <div class="pad-string">
      <el-text>{{ t('pluginOptions.padString') }}</el-text>
      <el-input v-model="padString" minlength="1" maxlength="1" show-word-limit style="width: 100px;"></el-input>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const serial = ref(1)
const length = ref(2)
const padString = ref("0")

const emits = defineEmits(["submit"])
watchEffect(() => {
  const options = {
    serial: serial.value,
    length: length.value,
    padString: padString.value
  }
  emits("submit", options)
})

</script>

<style lang="less" scoped>
.container {
  margin: 16px 0 0 0;
}

.pad-string {
  display: flex;
  margin: 12px 0;
}
</style>
