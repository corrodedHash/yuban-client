import { defineComponent, PropType } from 'vue'
import { add_thread, get_post, add_post, add_correction } from '@/api/api'
import { assertUnreachable } from '@/util'
import { ElButton } from 'element-plus'

export default defineComponent({
    name: 'PostEditor',
    components: { ElButton },
    props: {
        parenttype: {
            type: String as PropType<'group' | 'thread'>,
            required: true,
        },
        parentid: { type: Number, required: true },
        postid: { type: Number },
    },
    data() {
        return { text: '', textlang: '' }
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
            return this.postid === undefined
        },
        canEdit(): boolean {
            return this.isNew
        },
    },
    methods: {
        handlePostChange() {
            if (this.postid === undefined) {
                this.text = ''
                return
            }

            switch (this.parenttype) {
                case 'group':
                    console.error('Cannot display group')
                    break
                case 'thread':
                    get_post(this.postid).then(x => {
                        this.text = x.text
                        this.textlang = x.langcode.toLowerCase()
                    })
                    break
                default:
                    assertUnreachable(this.parenttype)
            }
        },
        handleSubmit() {
            if (!this.isNew) {
                return
            }
            let langcode = (this.$refs.langcode as any).value
            switch (this.parenttype) {
                case 'group':
                    add_thread(this.parentid, this.text, langcode)
                        .then(x => {
                            this.$router.push({
                                name: 'View',
                                params: { postid: x.post_id },
                            })
                        })
                        .catch(() => {
                            console.warn('Could not add thread')
                        })
                    break
                case 'thread':
                    add_post(this.parentid, this.text, langcode)
                        .then(x => {
                            this.$router.push({
                                name: 'View',
                                params: { postid: x },
                            })
                        })
                        .catch(() => {
                            console.warn('Could not add post')
                        })
                    break
                default:
                    assertUnreachable(this.parenttype)
            }
        },
    },
})
