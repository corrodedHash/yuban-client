import { defineComponent } from 'vue'
import { GroupSummary, summarize_groups } from '@/api/api'
import ThreadList from '@/components/ThreadList.vue'
export default defineComponent({
    name: 'GroupList',
    components: { ThreadList },
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
            groups: [] as GroupSummary[],
        }
    },
    mounted() {
        this.requestPosts()
    },
    methods: {
        requestPosts() {
            let me = this
            summarize_groups().then(v => {
                me.groups = v
                console.log(v)
            })
        },
        handleClick(target: any, event: any) {
            console.log(target, event)
        },
    },
})
