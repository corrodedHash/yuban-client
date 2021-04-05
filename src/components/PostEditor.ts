
import { defineComponent, PropType } from "vue";
import { new_post, get_post, add_post, add_correction } from "@/api/api";
import PostDiff from "@/components/PostDiff.vue";

export default defineComponent({
    name: "PostEditor",
    components: { PostDiff },
    props: {
        threadid: { type: Number },
        postid: { type: Number },
        corrid: { type: Number as PropType<number | null> },
    },
    data() {
        return { orig_text: undefined as string | undefined, text: "" };
    },
    mounted() {
        this.handlePostChange()
    },
    watch: {
        postid() {
            this.handlePostChange()
        },
        corrid() {
            this.handlePostChange()
        },
    },
    computed: {
        isNew(): boolean {
            return this.postid === undefined || this.corrid === null
        },
        canEdit(): boolean {
            return this.isNew
        }
    },
    methods: {
        handlePostChange() {
            this.orig_text = undefined
            this.text = ""
            if (this.corrid !== undefined && this.postid !== undefined) {
                let me = this
                get_post(this.postid).then((post) => {
                    me.orig_text = post.text
                })
            }
            if (this.isNew) {
                return;
            }
            if (this.corrid === undefined && this.postid !== undefined) {
                let me = this
                get_post(this.postid).then((post) => {
                    me.text = post.text
                })
            } else if (this.corrid !== undefined && this.postid !== undefined) {
                let me = this
                if (this.corrid !== null) {
                    get_post(this.corrid).then((corr) => {
                        me.text = corr.text
                    })
                } else {
                }
            } else {
                console.error("Should never reach this", this.corrid, this.postid)
            }
        },
        handleSubmit() {
            if (!this.isNew) {
                return
            }
            let langcode = (this.$refs.langcode as any).value
            if (this.threadid === undefined && this.corrid === undefined) {
                new_post(this.text, langcode)
                    .then(ids => {
                        this.$router.push({ name: 'View', params: { postid: ids.post_id } })
                    })
                    .catch(() => console.warn("Could not post"))
            } else if (this.postid === undefined && this.threadid !== undefined) {
                add_post(this.text, this.threadid, langcode)
                    .then(id => {
                        this.$router.push({ name: 'View', params: { postid: id } })
                    })
                    .catch(() => console.warn("Could not post"))
            } else if (this.corrid === null && this.postid !== undefined) {
                let postid = this.postid;
                add_correction(this.text, this.postid)
                    .then(corrid => {
                        this.$router.push({ name: 'Correction', params: { postid, corrid } })
                    }).catch(() => console.warn("Could not post"))
            }
        },
    },
});