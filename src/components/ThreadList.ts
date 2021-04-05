import { defineComponent } from 'vue'
import { ThreadSummary, PostSummary, summarize_threads } from '@/api/api'

export default defineComponent({
    name: 'ThreadList',
    props: { groupid: { type: Number, required: true } },
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
        }
    },
    mounted() {
        this.requestPosts()
    },
    methods: {
        selectNew() {
            this.$emit('selectPost', null, null)
            ;(this.$refs.postList as any).value = ''
        },
        selectNewPost(thread_id: number) {
            this.$emit('selectPost', thread_id, null)
        },
        handleSelectedPost(thread_index: number, index: PostSummary) {
            if (index !== null) {
                this.$emit('selectPost', thread_index, index.id)
            }
        },
        selectNewCorrection(thread_id: number, post: PostSummary) {
            this.$emit('selectCorrection', thread_id, post.id, null)
        },
        handleSelectedCorrection(
            thread_index: number,
            index: PostSummary,
            corr_index: number
        ) {
            this.$emit('selectCorrection', thread_index, index.id, corr_index)
        },
        requestPosts() {
            let me = this
            summarize_threads(this.groupid).then(t => {
                me.threads = t
            })
        },
    },
})
