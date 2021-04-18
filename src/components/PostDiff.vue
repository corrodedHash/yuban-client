<template>
  <div class="diffbox">
    <post-diff-display
      :original="original"
      :correction="correction"
      :lang="language"
    />
    <div v-if="isEditable">
      <textarea class="editor" v-model="correction"></textarea><br />
      <el-button type="primary" icon="el-icon-check" @click="handleSubmit"
        >Submit</el-button
      >
    </div>
  </div>
</template>
<script src="./PostDiff.ts"/>
<style scoped>
.diffbox {
  align-content: center;
  width: 100%;
}
.editor {
  resize: none;
  width: 100%;
  max-width: 75em;
  min-height: 10em;
}
</style>