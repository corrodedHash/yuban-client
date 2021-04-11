import { defineComponent } from "vue";
import { check_token, check_login, UserInfo } from "@/api/api";
import { ElInput } from 'element-plus';

export default defineComponent({
    name: "Login",
    components: { ElInput },
    emits: {
        login() {
            return true;
        },
    },
    data() {
        return {
            username: "",
            password: "",
            checkedToken: false,
        };
    },
    mounted() {
        this.checkToken();
    },
    methods: {
        handleLoginPromise(user: UserInfo | null) {
            if (user === null) {
                this.checkedToken = true
                return
            }
            this.$emit("login")
            this.checkedToken = false
        },

        checkToken() {
            check_token().then(this.handleLoginPromise.bind(this)).catch(() => {
                this.checkedToken = true
            })
        },

        login() {
            check_login(this.username, this.password)
                .then(this.handleLoginPromise.bind(this)).catch(() => {
                    console.error("Login failed miserably")
                    this.checkedToken = true
                }).finally(() => {
                    this.username = ""
                    this.password = ""
                });

        },
    },
});