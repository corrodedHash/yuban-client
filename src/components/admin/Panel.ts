import { defineComponent } from 'vue'
import UserList from '@/components/admin/UserList.vue'
import GroupList from '@/components/admin/GroupList.vue'
export default defineComponent({
    name: 'Panel',
    components: { UserList, GroupList },
})
