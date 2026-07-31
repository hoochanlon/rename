<template>
  <div class="container">
    <el-input style="max-width: 80vw;" v-model="pattern" :placeholder="t('pluginOptions.regexSearch')"></el-input>
    <el-input style="max-width: 80vw;" v-model="newStr" :placeholder="t('pluginOptions.regexReplace')"></el-input>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const pattern = ref("")
const newStr = ref("")

const emits = defineEmits(["submit"])

watchEffect(() => {
  const options = {
    pattern: pattern.value,
    to: newStr.value
  }
  emits("submit", options)
})

</script>

<style lang="less" scoped>
.container {

  display: flex;
  flex-direction: column;

  &>div:nth-child(1) {
    margin-bottom: 12px;
  }
}
</style>
