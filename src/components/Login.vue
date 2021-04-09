<template>
  <div>
    Yǔbàn
    <div
      v-loading="!checkedToken"
      element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading"
    >
      <form action="logindata" method="POST" @submit.prevent="login">
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
        <input type="submit" value="Submit" />
      </form>
    </div>
  </div>
</template>

<script lang="ts" src="./Login.ts"/>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
