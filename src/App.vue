<template>
  <div class="appcontainer">
    <login v-if="user === null" />
    <post-window v-else />
    <div class="versionbox">
      <div>Client version: {{ client_version }}</div>
      <div>Server version: {{ server_version }}</div>
    </div>
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
.versionbox {
  font-size: xx-small;
  position: absolute;
  bottom: 0;
  right: 0;
  padding-right: 5px;
  padding-bottom: 5px;
}
</style>
