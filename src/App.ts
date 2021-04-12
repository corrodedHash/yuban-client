
import { computed, defineComponent, ref, WritableComputedRef } from "vue";
import Login from "@/components/Login.vue";
import PostWindow from "@/components/PostWindow.vue";
import { get_server_version, UserInfo } from "@/api/api"
export default defineComponent({
  name: "App",
  components: { Login, PostWindow },
  provide() {
    return { user: computed({ get: () => this.user, set: value => { this.user = value } }) }
  },

  data() {
    return { user: null as UserInfo | null, server_version: "unknown" }
  },
  mounted() {
    get_server_version().then(v => { this.server_version = v }).catch(err => { console.warn("Could not get server version", err) })
  },
  computed: {
    client_version(): string {
      const version = process.env.VUE_APP_VERSION
      if (version === undefined) {
        return "unknown"
      }
      return version
    }
  }
});