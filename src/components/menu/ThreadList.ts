import { defineComponent } from 'vue'
import {
    ThreadSummary,
    PostSummary,
    summarize_threads,
    summarize_posts,
} from '@/api/api'
import { ElButton, ElCollapse, ElCollapseItem } from 'element-plus'
export default defineComponent({
    name: 'ThreadList',
    props: { groupid: { type: Number, required: true } },
    components: { ElButton, ElCollapse, ElCollapseItem },
    emits: {
        selectPost(thread_id: number | null, post_id: number | null) {
            return true
        },
        selectCorrection(
            thread_id: number,
            post_id: number,
            corr_id: number | null
        ) {
            return true
        },
    },
    data() {
        return {
            threads: [] as ThreadSummary[],
            posts: null as PostSummary[] | null,
        }
    },
    watch: {},
    mounted() {
        this.requestPosts()
    },
    methods: {
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
