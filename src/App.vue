<template>
  <div class="appcontainer">
    <login v-if="user === null" />
    <post-window v-else />
  </div>
</template>

<script lang="ts" src="./App.ts" />

<style>
html {
  height: 95%;
}
body {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.appcontainer {
  height: 100%;
}
</style>
