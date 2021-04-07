<template>
    <div>
        <post-diff-display :original="original" :correction="correction" />
        <div v-if="isEditable">
            <textarea class="editor" v-model="correction"></textarea><br />
            <el-button type="primary" icon="el-icon-check" @click="handleSubmit"
                >Submit</el-button
            >
        </div>
    </div>
</template>
<script src="./PostDiff.ts"/>