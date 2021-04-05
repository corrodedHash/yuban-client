<template>
    <div>
        <div
            v-for="group in groups"
            :key="group.groupid"
            @click="selectedGroup = group.groupname"
        >
            {{ group.groupname }}
            <span
                v-for="user in group.users"
                :key="user"
                @click.stop="deleteUser(group.groupname, user)"
                style="cursor: pointer; border-width: 1px; border-style: dashed"
            >
                {{ user }}
            </span>
            <el-popconfirm
                title="Are you sure to delete this group?"
                confirmButtonText="OK"
                cancelButtonText="No, Thanks"
                @confirm="removeGroup(group.groupname)"
            >
                <template #reference>
                    <el-button icon="el-icon-delete" size="mini"
                        >aoeu</el-button
                    >
                </template>
            </el-popconfirm>
        </div>
        {{ selectedGroup }}
        <el-autocomplete
            :disabled="selectedGroup === ''"
            class="inline-input"
            :fetch-suggestions="getUsers"
            placeholder="Please Input"
            @select="handleSelectInput"
        ></el-autocomplete>
        <div>
            <el-input
                placeholder="Groupname"
                v-model="groupname"
                size="small"
            ></el-input>
            <el-button @click="addGroup()" icon="el-icon-check"
                >Add group</el-button
            >
        </div>
    </div>
</template>

<script lang="ts" src="./GroupList.ts"/>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
