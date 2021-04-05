<template>
  <div>
    <div v-for="user in users" :key="user">
      {{ user }}
      <el-popconfirm
        title="Are you sure to delete this user?"
        confirmButtonText="OK"
        cancelButtonText="No, Thanks"
        @confirm="removeUser(user)"
      >
        <template #reference>
          <el-button icon="el-icon-delete" size="mini">aoeu</el-button>
        </template>
      </el-popconfirm>
    </div>
    <div>
      <el-input
        placeholder="Username"
        v-model="username"
        size="small"
      ></el-input>
      <el-input
        placeholder="Password"
        v-model="password"
        size="small"
        show-password
      ></el-input>
      <el-button @click="addUser()" icon="el-icon-check">Add user</el-button>
    </div>
  </div>
</template>

<script lang="ts" src="./UserList.ts"/>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
