<template>
  <div class="container">

    <el-select v-model="filterType" style="width: 120px;">
      <el-option v-for="item in filterTypeOptions" :key="item.value" :label="t(item.label)" :value="<string>item.value" />
    </el-select>

    <el-select v-model="matchProp" style="width: 120px;">
      <el-option v-for="item in matchOptions" :key="item.value" :label="t(item.label)" :value="<string>item.value" />
    </el-select>
    <el-select v-model="predicate" style="width: 120px;">
      <el-option v-for="item in predicateOptions" :key="item.value" :label="t(item.label)" :value="<string>item.value" />
    </el-select>

    <!-- 文件名/扩展名输入 -->
    <el-input v-if='matchProp === "filename" || matchProp === "extension"' v-model="predicateStringParam" />
    <el-checkbox v-if='matchProp === "filename" || matchProp === "extension"' v-model="ignoreCase"
      border>{{ t('filter.ignoreCase') }}</el-checkbox>

    <!-- 文件大小输入 -->
    <el-input-number v-if='matchProp === "size"' v-model="predicateNumberParam" :min="0" controls-position="right" />
    <el-select v-if='matchProp === "size"' v-model="sizeUnit" style="width: 80px;">
      <el-option v-for='item in ["KB", "MB", "GB", "TB"]' :key="item" :label="item" :value="item" />
    </el-select>

    <!-- 日期输入 -->
    <el-date-picker v-if='matchProp === "modifyTime"' v-model="predicateNumberParam" type="datetime"
      :placeholder="t('filter.selectDateTime')" style="margin-right: 12px;" />

    <!-- 提交 -->
    <el-button type="primary" @click="onSubmit" style="width: 80px;">{{ t('filter.submit') }}</el-button>

    <!-- 备注提示 -->
    <el-alert v-if="Boolean(remark)" type="info" :closable="false" show-icon>
      <template v-slot:title>
        <span class="alert">{{ remark }}</span>
      </template>
    </el-alert>
  </div>
</template>

<script lang="ts" setup>
import { filterTypeOptions, matchOptions, stringPredicateOptions, numberPredicateOptions } from '@/lib/filter/filter.const';
import { FileFilterItem } from '@/lib/filter/FileFilterItem';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

// 包含还是排除
const filterType = ref<FileFilterType>("include")

// 过滤的属性
const matchProp = ref<FileFilterProp>("filename")
// 过滤的操作（谓词）
const predicate = ref<FileFilterPredicate>(undefined)
const predicateOptions = ref<PredicateItem[]>([])
// 过滤操作的参数
const predicateStringParam = ref("")
const predicateNumberParam = ref(0)
// 过滤操作的额外参数
const ignoreCase = ref(true) // 忽略大小写
const sizeUnit = ref<SizeUnit>("KB") // 大小的单位
// 备注提示
const remark = computed(() => {
  switch (matchProp.value) {
    case "filename":
      return t('filter.filenameRemark')
    case "extension":
      return t('filter.extensionRemark')
    default:
      return ""
  }
})

watch(matchProp, () => {
  const m = matchProp.value;
  if (m === "filename" || m === "extension") {
    predicateOptions.value = stringPredicateOptions
    predicate.value = stringPredicateOptions[0].value
  }
  else if (m === "size" || m === "modifyTime") {
    predicateOptions.value = numberPredicateOptions
    predicate.value = numberPredicateOptions[0].value
    predicateNumberParam.value = 0
  }
  if (m !== "filename" && m !== "extension" && m !== "size" && m !== "modifyTime") {
    console.error("存在没有处理的选项", m)
  }

}, {
  immediate: true
})

const buildFilterOptions: () => FileFilterItem | null = () => {
  const options = {
    prop: matchProp.value,
    predicate: predicate.value,
    stringValue: predicateStringParam.value?.trim(),
    numberValue: predicateNumberParam.value,
    caseSensitive: !ignoreCase.value,
    sizeUnit: sizeUnit.value,
  }

  if (options.prop === "filename" || options.prop === "extension") {
    if (!options.stringValue) {
      ElMessage.error(t('filter.emptyInputError'))
      return null
    }
  }

  if (options.prop === "modifyTime" && options.numberValue < 1) {
    ElMessage.error(t('filter.invalidDateError'))
    return null
  }

  return FileFilterItem.build(
    filterType.value,
    options.prop,
    options.predicate,
    options.stringValue,
    options.numberValue,
    options.caseSensitive,
    options.sizeUnit)
}

const emit = defineEmits(["submit"])

const onSubmit = () => {
  const options = buildFilterOptions()
  if (options) {
    emit("submit", options)
  }
}

</script>

<style lang="less" scoped>
.container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding: 4px 0 0 0;
}

.el-input {
  max-width: 240px;
}

.el-alert {
  max-width: 320px;
  padding: 6px 8px;
  border-radius: 12px;
}

.alert {
  line-height: 21px;
}
</style>

