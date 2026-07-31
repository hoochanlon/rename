<template>
  <div class="postion-select">
    <el-select v-model="position" :placeholder="t('pluginOptions.replacePosition')">
      <el-option v-for="item in positionOptions" :key="item.value" :label="t(item.label)" :value="item.value" />
    </el-select>

    <el-input-number v-show='["nCharAfterIndexM", "nCharBeforeIndexM"].includes(position)' style="width: 220px;"
      v-model="postionIndex" :min="0" :placeholder="t('pluginOptions.setM')"></el-input-number>

    <el-input v-show='["string", "allAfterStr", "allBeforeStr", "nAfterStr", "nBeforeStr"].includes(position)'
      style="width: 360px;" v-model="postionStr" :placeholder="t('pluginOptions.setXX')"></el-input>

    <el-input-number
      v-show='["frontN", "behindN", "nCharAfterIndexM", "nCharBeforeIndexM", "nAfterStr", "nBeforeStr"].includes(position)'
      style="width: 220px;" v-model="strLengh" :min="0" :placeholder="t('pluginOptions.setN')"></el-input-number>
  </div>
  <el-input class="insert-text" v-model="insertText" :placeholder="t('pluginOptions.newString')"></el-input>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const positionOptions = [{
  label: "pluginOptions.exactString",
  value: "string"
}, {
  label: "pluginOptions.frontN",
  value: "frontN"
}, {
  label: "pluginOptions.behindN",
  value: "behindN"
}, {
  label: "pluginOptions.nCharAfterIndexM",
  value: "nCharAfterIndexM"
}, {
  label: "pluginOptions.nCharBeforeIndexM",
  value: "nCharBeforeIndexM"
},
{
  label: "pluginOptions.allAfterStr",
  value: "allAfterStr"
},
{
  label: "pluginOptions.allBeforeStr",
  value: "allBeforeStr"
}, {
  label: "pluginOptions.nAfterStr",
  value: "nAfterStr"
},
{
  label: "pluginOptions.nBeforeStr",
  value: "nBeforeStr"
}]

const position = ref("")
const postionIndex = ref()
const strLengh = ref()
const postionStr = ref("")
const insertText = ref("")

const emits = defineEmits(["submit"])

watchEffect(() => {
  const options = {
    position: position.value,
    m: postionIndex.value,
    n: strLengh.value,
    from: postionStr.value,
    to: insertText.value
  }
  emits("submit", options)
})

</script>

<style lang="less" scoped>
.postion-select {
  display: flex;
  align-items: center;

  &>* {
    margin-right: 12px;
  }
}

.insert-text {
  margin-top: 8px;
  max-width: 460px;
}
</style>


