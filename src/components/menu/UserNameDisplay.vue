<template>
  <span v-if="user.username === null || user.value.username !== username">
    {{ username }}
  </span>
  <span v-else> <b>You</b></span>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserNameDisplay",
  props: {
    username: { type: String, required: true },
  },
  inject: ["user"],
});
</script>