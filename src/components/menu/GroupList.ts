import { defineComponent } from 'vue'
import { GroupSummary, summarize_groups } from '@/api/api'
import ThreadList from '@/components/menu/ThreadList.vue'
import { ElTabs, ElTabPane } from 'element-plus';
export default defineComponent({
    name: 'GroupList',
    components: { ThreadList, ElTabs, ElTabPane },
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
            })
        },
    },
})
