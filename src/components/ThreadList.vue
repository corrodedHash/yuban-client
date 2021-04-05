<template>
    <div>
        <el-button
            type="primary"
            icon="el-icon-plus"
            style="width: 100%"
            @click="selectNew"
            >Add Thread</el-button
        >
        <el-collapse ref="postList" accordion>
            <el-collapse-item
                v-for="thread in threads"
                :key="thread.id"
                :name="thread.id"
            >
                <template #title>
                    {{ thread.creator }} - {{ thread.opened_on.toLocaleString() }} {{thread.langcodes}} {{thread.correction_counts}}
                </template>
                <!-- <el-button
                    icon="el-icon-plus"
                    style="width: 100%"
                    @click="selectNewPost(thread.id)"
                    >Add Language</el-button
                >
                <div
                    v-for="post in thread.posts"
                    :key="post.id"
                    class="postCard"
                    @click="handleSelectedPost(thread.id, post)"
                >
                    {{ post.user }} - {{ post.date.toLocaleString() }} -
                    {{ post.lang }}<br />{{ post.ellipsis }}...
                    <br />
                    <el-button
                        icon="el-icon-plus"
                        size="mini"
                        @click.stop="selectNewCorrection(thread.id, post)"
                        >Add Correction</el-button
                    >
                    <div
                        class="correctionBox"
                        v-for="corr in post.corrections"
                        :key="corr.id"
                        @click.stop="
                            handleSelectedCorrection(thread.id, post, corr.id)
                        "
                    >
                        {{ corr.username }} -
                        {{ corr.postdate.toLocaleString() }}
                    </div>
                </div> -->
            </el-collapse-item>
        </el-collapse>
        <el-button @click="requestPosts">Get</el-button>
    </div>
</template>

<script src="./ThreadList.ts" />

<style scoped>
</style>