<template>
  <div>
    <login v-if="!loggedIn" @login="loggedIn = true" />
    <post-window v-else @logout="loggedIn = false" />
  </div>
</template>

<script lang="ts" src="./App.ts" />

<style>
html,
body {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100%;
}
</style>
