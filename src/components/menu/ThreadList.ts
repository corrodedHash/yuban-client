import { defineComponent } from 'vue'
import {
    ThreadSummary,
    PostSummary,
    summarize_threads,
    summarize_posts,
    delete_correction,
    delete_post,
} from '@/api/api'
import { ElIcon, ElButton, ElCollapse, ElCollapseItem, ElPopconfirm, ElMessage, ElPopper } from 'element-plus'
import UserNameDisplay from '@/components/menu/UserNameDisplay.vue'

export default defineComponent({
    name: 'ThreadList',
    props: { groupid: { type: Number, required: true } },
    components: { ElIcon, ElButton, ElCollapse, ElCollapseItem, ElPopconfirm, ElPopper, UserNameDisplay },
    data() {
        return {
            threads: [] as ThreadSummary[],
            posts: null as PostSummary[] | null,
        }
    },
    mounted() {
        this.requestPosts()
    },
    inject: ['user'],
    methods: {
        removeCorr(corr_id: number) {
            delete_correction(corr_id).then(
                () => {
                    if (this.posts === null) {
                        return
                    }
                    this.posts = this.posts.map(
                        v => { v.corrections = v.corrections.filter(x => x.id !== corr_id); return v })
                }
            ).catch(() => {
                ElMessage({ message: 'Could not delete correction', center: true, type: 'error' })
            })
        },
        removePost(post_id: number) {
            delete_post(post_id).then(
                () => {
                    if (this.posts === null) {
                        return
                    }
                    this.posts = this.posts.filter(v => v.id != post_id)
                }
            ).catch(() => {
                ElMessage({ message: 'Could not delete post', center: true, type: 'error' })
            })
        },
        userOwned(username: string): boolean {
            const user = (this as any).user.value
            return user !== null && user.username === username
        },
        selectedPost(newPost: string) {
            this.posts = null
            if (newPost == '') {
                return
            }
            summarize_posts(parseInt(newPost))
                .then(x => {
                    this.posts = x
                })
                .catch(() => {
                    this.posts = []
                })
        },
        selectNew() {
            this.$router.push({
                name: 'NewThread',
                params: { groupid: this.groupid },
            })
        },
        selectNewPost(thread_id: number) {
            this.$router.push({
                name: 'NewPost',
                params: { threadid: thread_id },
            })
        },
        selectNewCorrection(thread_id: number, post: PostSummary) {
            this.$router.push({
                name: 'NewCorrection',
                params: { postid: post.id },
            })
        },
        handleSelectedPost(thread_index: number, index: PostSummary) {
            this.$router.push({ name: 'View', params: { postid: index.id } })
        },
        handleSelectedCorrection(
            thread_index: number,
            index: PostSummary,
            corr_index: number
        ) {
            this.$router.push({
                name: 'Correction',
                params: { postid: index.id, corrid: corr_index },
            })
        },
        requestPosts() {
            let me = this
            summarize_threads(this.groupid).then(t => {
                me.threads = t
            })
        },
    },
})
