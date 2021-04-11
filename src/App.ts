
import { computed, defineComponent, ref, WritableComputedRef } from "vue";
import Login from "@/components/Login.vue";
import PostWindow from "@/components/PostWindow.vue";
import { UserInfo } from "@/api/api"
export default defineComponent({
  name: "App",
  components: { Login, PostWindow },
  provide() {
    return { user: computed({ get: () => this.user, set: value => { this.user = value; console.log("set value") } }) }
  },

  data() {
    return { user: null as UserInfo | null }
  }
});