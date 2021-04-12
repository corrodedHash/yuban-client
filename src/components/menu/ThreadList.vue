<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="width: 100%"
      @click="selectNew"
      >Add Thread</el-button
    >
    <el-collapse @change="selectedPost" accordion>
      <el-collapse-item
        v-for="thread in threads"
        :key="thread.id"
        :name="thread.id"
      >
        <template #title>
          {{ thread.opened_on.toLocaleString() }}
          <span v-if="thread.languages.length > 0" class="languageblock">
            <span
              v-for="lang in thread.languages"
              :key="lang.lang"
              :class="{
                languagekey: true,
                notcorrected: !(lang.count > 0),
                corrected: lang.count > 0,
              }"
            >
              {{ lang.lang.toUpperCase() }}
            </span>
          </span>
        </template>
        <el-button
          icon="el-icon-plus"
          style="width: 100%"
          @click="selectNewPost(thread.id)"
          >Add Language</el-button
        >
        <div
          v-loading="posts === null"
          element-loading-text="Loading..."
          element-loading-spinner="el-icon-loading"
        >
          <div
            v-for="post in posts"
            :key="post.id"
            class="postCard"
            @click="handleSelectedPost(thread.id, post)"
          >
            <user-name-display :username="post.username" /> -
            {{ post.opened_on.toLocaleString() }} - {{ post.lang.toUpperCase()
            }}<br />{{ post.ellipsis }}...
            <br />
            <el-button
              icon="el-icon-plus"
              size="mini"
              @click.stop="selectNewCorrection(thread.id, post)"
              >Add Correction</el-button
            >
            <el-popconfirm
              v-if="user.value !== null && post.username == user.value.username"
              title="Are you sure to delete this post?"
              confirmButtonText="OK"
              cancelButtonText="No, Thanks"
              icon="el-icon-warning"
              iconColor="crimson"
              @confirm="removePost(post.id)"
            >
              <template #reference>
                <el-button
                  icon="el-icon-delete"
                  size="small"
                  type="danger"
                  circle
                ></el-button>
              </template>
            </el-popconfirm>
            <div
              class="correctionBox"
              v-for="corr in post.corrections"
              :key="corr.id"
              @click.stop="handleSelectedCorrection(thread.id, post, corr.id)"
            >
              <user-name-display :username="corr.username" /> -
              {{ corr.postdate.toLocaleString() }}
              <el-popconfirm
                v-if="
                  user.value !== null && corr.username == user.value.username
                "
                title="Are you sure to delete this correction?"
                confirmButtonText="OK"
                cancelButtonText="No, Thanks"
                icon="el-icon-warning"
                iconColor="crimson"
                @confirm="removeCorr(corr.id)"
              >
                <template #reference>
                  <el-button
                    icon="el-icon-delete"
                    size="mini"
                    type="danger"
                    round
                    >Delete</el-button
                  >
                </template>
              </el-popconfirm>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-button @click="requestPosts">Get</el-button>
  </div>
</template>

<script src="./ThreadList.ts" />

<style scoped>
.languageblock {
  margin-left: 10px;
}
.languagekey {
  margin-right: 2px;
  padding: 3px;
}
.notcorrected {
  background-color: lightcoral;
}
.corrected {
  background-color: green;
}
.postCard {
  cursor: pointer;
  border: 1px;
  border-style: dotted;
  border-radius: 4px;
  margin: 3px;
  padding: 3px;
  background-color: rgb(238, 244, 247);
}
.postCard:hover,
.postCard:active {
  cursor: pointer;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-style: solid;
  background-color: rgb(142, 187, 204);
}
.correctionBox {
  border: 1px;
  border-style: dotted;
  border-radius: 4px;
  margin: 1px;
  padding: 1px;
  background-color: rgb(138, 200, 232);
}
</style>