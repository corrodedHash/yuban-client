<template>
    <el-tabs type="card" @tab-click="handleClick">
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
.postCard {
    cursor: pointer;
    border: 1px;
    border-style: dotted;
    border-radius: 4px;
    margin: 3px;
    padding: 3px;
    background-color: rgb(238, 244, 247);
}
.postCard:hover {
    cursor: pointer;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-style: solid;
    background-color: rgb(142, 187, 204);
}
</style>
