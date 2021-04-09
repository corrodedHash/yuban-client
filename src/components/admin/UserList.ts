import { defineComponent } from 'vue'
import { add_user, remove_user, list_users } from '@/api/admin'
import { ElPopconfirm, ElButton, ElInput } from 'element-plus'
export default defineComponent({
    name: 'UserList',
    components: { ElPopconfirm, ElButton, ElInput },
    data() {
        return { users: [] as string[], username: '', password: '' }
    },
    methods: {
        removeUser(name: string) {
            remove_user(name)
                .then(() => {
                    list_users().then(data => {
                        this.users = data
                    })
                })
                .catch(() => console.warn('Failed to remove user'))
        },
        addUser() {
            add_user(this.username, this.password)
                .then(() => {
                    list_users().then(data => {
                        this.users = data
                    })
                    this.username = ''
                    this.password = ''
                })
                .catch(() => console.warn('Failed to add user'))
        },
    },
    mounted() {
        list_users().then(data => {
            this.users = data
        })
    },
})
