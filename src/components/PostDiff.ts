import { defineComponent, PropType } from 'vue'
import PostDiffDisplay from './PostDiffDisplay.vue'
import { get_post, add_correction } from '@/api/api'
export default defineComponent({
    name: 'PostDiff',
    components: { PostDiffDisplay },
    props: {
        originalID: { type: Number, required: true },
        correctionID: {
            type: Number,
        },
    },
    data() {
        return { original: '', correction: '', language: '' }
    },
    mounted() {
        this.getPosts()
    },
    computed: {
        isEditable(): boolean {
            return this.correctionID === undefined
        },
    },
    methods: {
        handleSubmit() {
            add_correction(this.correction, this.originalID).then(x => {
                this.$router.push({
                    name: 'Correction',
                    params: { postid: this.originalID, corrid: x },
                })
            })
        },
        getPosts() {
            get_post(this.originalID).then(v => {
                this.language = v.langcode
                this.original = v.text
                if (this.isEditable) {
                    this.correction = v.text
                }
            })
            if (this.correctionID !== undefined) {
                get_post(this.correctionID).then(v => {
                    this.correction = v.text
                })
            }
        },
    },
})
