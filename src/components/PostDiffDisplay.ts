import { defineComponent, PropType } from 'vue'
import { diffWords, diffChars } from 'diff'
import { assertUnreachable } from '@/util'

export default defineComponent({
    name: 'PostDiff',
    props: {
        original: { type: String, required: true },
        correction: { type: String, required: true },
        lang: { type: String, required: true },
    },
    data() {
        return { diffstyle: 'Mixed' as 'Original' | 'Mixed' | 'Correction' }
    },
    computed: {
        difftext(): { text: string; type: 'normal' | 'add' | 'sub' }[] {
            switch (this.diffstyle) {
                case 'Original':
                    return [{ text: this.original, type: 'sub' }]
                case 'Correction':
                    return [{ text: this.original, type: 'add' }]
                case 'Mixed':
                    break
                default:
                    assertUnreachable(this.diffstyle)
            }
            let diffs: { value: string; added: boolean; removed: boolean }[]
            if (this.lang.toLowerCase() == 'zh') {
                diffs = diffChars(this.original, this.correction) as {
                    value: string
                    added: boolean
                    removed: boolean
                }[]
            } else {
                diffs = diffWords(this.original, this.correction) as {
                    value: string
                    added: boolean
                    removed: boolean
                }[]
            }
            let id = 0
            let mapped_diffs = diffs.map(v => {
                id += 1
                return {
                    id: id,
                    text: v.value,
                    type: (v.added ? 'add' : v.removed ? 'sub' : 'normal') as
                        | 'normal'
                        | 'add'
                        | 'sub',
                }
            })
            return mapped_diffs
        },
    },
})