<template>
  <div class="diffview">
    <el-radio-group v-model="diffstyle" size="small">
      <el-radio-button label="Original"></el-radio-button>
      <el-radio-button label="Mixed"></el-radio-button>
      <el-radio-button label="Correction"></el-radio-button>
    </el-radio-group>
    <div class="diffbox">
      <span v-for="d in difftext" :key="d.id" :class="d.type">{{
        d.text
      }}</span>
    </div>
  </div>
</template>

<script lang="ts" src="./PostDiffDisplay.ts" />

<style scoped>
.diffview {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.diffbox {
  display: inline-block;
  margin-bottom: 10px;
  line-height: 1.6;
  width: 100%;
  max-width: 75em;
}
.add {
  /* color: greenyellow; */
  background-color: rgba(64, 187, 64, 0.4);
  padding: 3px 5px 3px 5px;
  border: 1px;
  border-style: solid;
  border-radius: 30px;
}
.sub {
  /* color: lightcoral; */
  background-color: rgba(212, 74, 74, 0.4);
  padding: 3px 5px 3px 5px;
  border: 1px;
  border-style: solid;
  border-radius: 30px;
}
</style>
