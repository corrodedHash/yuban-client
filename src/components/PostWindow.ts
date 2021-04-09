import { defineComponent } from 'vue'
import { logout } from '@/api/api'
import { ElContainer, ElHeader, ElButton, ElMain } from 'element-plus'
export default defineComponent({
    name: 'PostWindow',
    components: { ElContainer, ElHeader, ElButton, ElMain },
    emits: {
        logout() {
            return true
        },
    },
    methods: {
        openList() {
            this.$router.push({ name: 'Menu' })
        },
        handleLogout() {
            logout()
                .then(() => this.$emit('logout'))
                .catch(() => {
                    this.$emit('logout')
                    console.warn('Could not logout')
                })
        },
        handleCorrectionSwitch(
            thread_id: number,
            post_id: number,
            correction: number | null
        ) {
            if (correction !== null) {
                this.$router.push({
                    name: 'Correction',
                    params: { postid: post_id, corrid: correction },
                })
            } else {
                this.$router.push({
                    name: 'NewCorrection',
                    params: { postid: post_id },
                })
            }
        },
        handlePostSwitch(thread_id: number | null, post_id: number | null) {
            if (post_id === null && thread_id === null) {
                this.$router.push({ path: '/' })
            } else if (post_id !== null && thread_id === null) {
            } else if (post_id !== null && thread_id !== null) {
                this.$router.push({ name: 'View', params: { postid: post_id } })
            } else if (post_id === null && thread_id !== null) {
                this.$router.push({
                    name: 'NewPost',
                    params: { threadid: thread_id },
                })
            }
        },
    },
})
