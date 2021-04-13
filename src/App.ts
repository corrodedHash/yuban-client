
import { computed, defineComponent, PropType, Ref, ref, watch, watchEffect, WritableComputedRef } from "vue";
import Login from "@/components/Login.vue";
import PostWindow from "@/components/PostWindow.vue";
import { get_server_version, UserInfo } from "@/api/api"
import { ElMessageBox } from "element-plus"

export default defineComponent({
  name: "App",
  components: { Login, PostWindow, ElMessageBox },
  provide() {
    return { user: computed({ get: () => this.user, set: value => { this.user = value } }) }
  },
  props: { update_state: { type: Object as PropType<Ref<boolean>>, required: true } },
  data() {
    return { user: null as UserInfo | null, server_version: "unknown", update_available: this.update_state.value }
  },
  mounted() {
    watch(() => this.update_state.value, (newState, oldState) => {
      if (newState) {
        ElMessageBox.alert("Apply?", "Update available", { showConfirmButton: true }).then(v => {
          this.fetchServiceWorkerUpdate()
        }).catch(() => { })
      }
      this.update_available = newState
    })
    get_server_version().then(v => { this.server_version = v }).catch(err => { console.warn("Could not get server version", err) })
  },
  methods: {
    fetchServiceWorkerUpdate() {
      document.location.reload()
    }
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