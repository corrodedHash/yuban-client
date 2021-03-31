
import { defineComponent } from "vue";
import { add_user, remove_user, list_users } from "./api";
export default defineComponent({
    name: "AdminPanel",
    data() { return { users: [] as string[], username: "", password: "" } },
    methods: {
        removeUser(name: string) {
            remove_user(name)
                .then(() => {
                    console.log("Removed user");
                    list_users().then((data) => { this.users = data })
                })
                .catch(() => console.log("Failed to remove user"))
        },
        addUser() {
            add_user(this.username, this.password)
                .then(() => {
                    console.log("Add user");
                    list_users().then((data) => { this.users = data })
                    this.username = ""
                    this.password = ""
                })
                .catch(() => console.log("Failed to add user"))
        }
    },
    mounted() {
        list_users().then((data) => { this.users = data })
    }
});