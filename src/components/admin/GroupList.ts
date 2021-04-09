import { defineComponent } from 'vue'
import {
    list_groups,
    add_group,
    remove_group,
    add_group_user,
    remove_group_user,
    list_users,
} from '@/api/admin'
import { GroupSummary } from '@/api/admin'
import { ElPopconfirm, ElButton, ElAutocomplete, ElInput } from "element-plus"
export default defineComponent({
    name: 'UserList',
    components: { ElPopconfirm, ElButton, ElAutocomplete, ElInput },
    data() {
        return {
            groups: [] as GroupSummary[],
            groupname: '',
            users: [] as string[],
            selectedGroup: '',
        }
    },
    methods: {
        addGroup() {
            add_group(this.groupname)
                .then(groupid => {
                    this.reloadGroups()
                    this.groupname = ''
                })
                .catch(() => console.warn('Failed to add group'))
        },
        removeGroup(groupname: string) {
            remove_group(groupname).then(() => {
                this.reloadGroups()
            })
        },
        deleteUser(groupname: string, username: string) {
            remove_group_user(groupname, username).then(() => {
                console.warn('User removed')
                this.reloadGroups()
            })
        },
        addUser(groupname: string, username: string) {
            add_group_user(groupname, username).then(() => {
                console.warn('User added')
                this.reloadGroups()
            })
        },
        reloadGroups() {
            let me = this
            list_groups().then(data => {
                me.groups = data
            })
            list_users().then(data => {
                me.users = data
            })
        },
        getUsers(queryString: string, cb: (data: any[]) => void) {
            cb(
                this.users.map(v => {
                    return { value: v }
                })
            )
        },
        handleSelectInput(username: { value: string }) {
            this.addUser(this.selectedGroup, username.value)
        },
    },
    mounted() {
        this.reloadGroups()
    },
})
