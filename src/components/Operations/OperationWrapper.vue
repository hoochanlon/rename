<template>
    <div class="wrapper">

        <div class="title" v-if="isShowTitle">
            <h2>{{ title }}</h2>
            <el-icon @click="onExpandFoldClick" v-if="canFold">
                <ArrowLeftBold v-show="!isExpand" />
                <ArrowDownBold v-show="isExpand" />
            </el-icon>
        </div>

        <div class="content" v-show="isExpand">
            <slot></slot>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { ArrowLeftBold, ArrowDownBold } from '@element-plus/icons-vue';

const { title, canFold } = defineProps({
    title: {
        type: String
    },
    canFold: {
        type: Boolean,
        default: false,
    }
})

const isExpand = ref(true)
const isShowTitle = Boolean(title)

const onExpandFoldClick = () => {
    isExpand.value = !isExpand.value
}

</script>

<style lang="less" scoped>
.wrapper {
    margin: 10px 0;
    padding: 12px 14px;
    border: 1px solid var(--app-border);
    border-radius: 16px;
    background: var(--app-surface);
    box-shadow: var(--app-panel-shadow);
}

.title {
    display: flex;
    align-items: center;
    user-select: none;

    h2 {
        margin-right: 12px;
        font-size: 16px;
        color: var(--app-text);
        font-family: SmileySans, 'Courier New', Courier, monospace;
    }

    .el-icon {
        padding: 4px;
        font-size: 14px;
        color: var(--app-muted);
        border: 1px solid var(--app-border);
        border-radius: 999px;
        background: var(--app-surface-elevated);
        cursor: pointer;
    }
}

.content {
    margin: 10px 0 2px;
}
</style>