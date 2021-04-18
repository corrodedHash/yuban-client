<template>
  <div class="editorbox">
    <textarea
      class="notes"
      v-show="showNoteField"
      placeholder="Text in this box will not be submitted!"
    />
    <textarea class="editor" v-model="text" :disabled="!canEdit"></textarea
    ><br />
    <div class="buttons">
      <el-button
        type="primary"
        icon="el-icon-check"
        @click="handleSubmit"
        v-if="canEdit"
        >Submit</el-button
      >
      <select v-model="textlang" :disabled="!canEdit">
        <option value="de">German</option>
        <option value="zh">Chinese</option>
      </select>
      <el-button
        icon="el-icon-collection"
        v-if="canEdit"
        @click="showNoteField = !showNoteField"
        size="small"
        >{{ showNoteField ? "Close notefield" : "Open notefield" }}</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" src="./PostEditor.ts" />

<style scoped>
.editorbox {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}
.notes {
  height: 30%;
  width: 100%;
  max-width: 75em;
  border-style: none;
  border-width: 0px;
  resize: none;
  background-color: aqua;
}
.editor {
  resize: none;
  width: 100%;
  max-width: 75em;
  background-color: rgb(220, 255, 255);
  flex: 1;
}
.buttons {
  display: block;
}
</style>
