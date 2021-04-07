<template>
    <el-tabs type="card">
        <el-tab-pane v-for="group in groups" :key="group.groupid">
            <template #label>
                {{ group.groupname }} [{{ group.threadcount }}]
            </template>
            <thread-list :groupid="group.groupid" />
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" src="./GroupList.ts"/>

<style scoped>
</style>
