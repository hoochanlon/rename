<template>
  <div>

    <div class="postion-select">
      <el-select v-model="position" :placeholder="t('pluginOptions.insertPosition')">
        <el-option v-for="item in positionOptions" :key="item.value" :label="t(item.label)" :value="item.value" />
      </el-select>
      <el-input-number v-show='position === "afterIndexN" || position === "beforeIndexN"' style="width: 220px;"
        v-model="postionIndex" :min="0" :placeholder="t('pluginOptions.setN')"></el-input-number>
      <el-input v-show='position === "afterStr" || position === "beforeStr"' style="width: 360px;" v-model="postionStr"
        :placeholder="t('pluginOptions.setXX')"></el-input>
    </div>

    <div style="margin:12px 0">
      <el-radio-group v-model="intertContentType">
        <el-radio-button label="text">{{ t('pluginOptions.text') }}</el-radio-button>
        <el-radio-button label="index">{{ t('pluginOptions.index') }}</el-radio-button>
      </el-radio-group>
    </div>

    <el-input style="max-width: 800px;" v-show='intertContentType === "text"' v-model="insertText"
      :placeholder="t('pluginOptions.insertText')"></el-input>

    <div class="insert-index-wrapper" v-show='intertContentType === "index"'>
      <el-input style="max-width: 240px;" v-model="insertIndexPreText" :placeholder="t('pluginOptions.beforeIndexText')"></el-input>
      <span class="insert-index-type-wrapper">

        <el-tooltip :content="t('pluginOptions.startIndex')" placement="top">
          <el-input-number v-model="insertIndexBaseNumber" controls-position="right" :placeholder="t('pluginOptions.startIndex')" />
        </el-tooltip>

        <el-select v-model="insertIndexNumberType" :placeholder="t('pluginOptions.indexType')">
          <el-option v-for="item in insertContentTypeOptions" :key="item.value" :label="t(item.label)" :value="item.value" />
        </el-select>

        <el-tooltip :content="t('pluginOptions.fixedDigits')" placement="right">
          <el-input-number v-model="insertIndexDigitPadding" :min="1" :max="10" controls-position="right"
            :placeholder="t('pluginOptions.fixedDigits')" v-show='insertIndexNumberType === "digit"' />
        </el-tooltip>

      </span>
      <el-input style="max-width: 240px;" v-model="insertIndexAfterText" :placeholder="t('pluginOptions.afterIndexText')"></el-input>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const positionOptions = [{
  label: "pluginOptions.begin",
  value: "begin"
}, {
  label: "pluginOptions.end",
  value: "end"
}, {
  label: "pluginOptions.afterIndexN",
  value: "afterIndexN"
}, {
  label: "pluginOptions.beforeIndexN",
  value: "beforeIndexN"
}, {
  label: "pluginOptions.afterStr",
  value: "afterStr"
},
{
  label: "pluginOptions.beforeStr",
  value: "beforeStr"
}]

const insertContentTypeOptions = [{
  label: "pluginOptions.digit",
  value: "digit"
}, {
  label: "pluginOptions.lowerChinese",
  value: "lowerChinese"
}, {
  label: "pluginOptions.upperChinese",
  value: "upperChinese"
}, {
  label: "pluginOptions.lowerChar",
  value: "lowerChar"
}, {
  label: "pluginOptions.upperChar",
  value: "upperChar"
}]

const position = ref("")
const postionIndex = ref()
const postionStr = ref("")

const intertContentType = ref("text")

const insertText = ref("")
const insertIndexPreText = ref("")
const insertIndexAfterText = ref("")
const insertIndexBaseNumber = ref()
const insertIndexNumberType = ref("digit")
const insertIndexDigitPadding = ref()

const emits = defineEmits(["submit"])

watchEffect(() => {
  const options = {
    position: position.value,
    n: postionIndex.value,
    from: postionStr.value,
    toType: intertContentType.value,
    toStr: insertText.value,
    toPreStr: insertIndexPreText.value,
    toAfterStr: insertIndexAfterText.value,
    toBaseNumber: insertIndexBaseNumber.value,
    toNumberType: insertIndexNumberType.value,
    toDigitPadding: insertIndexDigitPadding.value
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

.insert-index-wrapper {
  display: flex;
  align-items: center;

  &>* {
    margin-right: 12px;
  }
}

.insert-index-type-wrapper {
  display: flex;
  flex-direction: column;

  padding: 8px 6px;

  border: 1px solid #eee;
  border-radius: 4px;

  &>* {
    width: 160px;
  }

  &>*:nth-child(n+2) {
    margin-top: 6px;
  }

}
</style>
