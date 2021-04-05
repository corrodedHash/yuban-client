const API_ROOT = '/api'

export function logout(): Promise<void> {
    return new Promise((resolve, reject) => {
        let loginreq = new XMLHttpRequest()
        loginreq.onload = ev => {
            switch (loginreq.status) {
                case 200:
                    resolve()
                    return
                default:
                    console.warn(
                        'Unknown status',
                        loginreq.status,
                        loginreq.response
                    )
                    reject()
            }
        }
        loginreq.onerror = ev => {
            console.warn('Error logout', ev)
            reject()
        }
        loginreq.onabort = ev => {
            console.warn('Abort logout', ev)
            reject()
        }
        loginreq.open('POST', `${API_ROOT}/logout`, true)
        loginreq.send()
    })
}

export function check_login(
    username: string,
    password: string
): Promise<boolean> {
    return new Promise((resolve, reject) => {
        let loginreq = new XMLHttpRequest()
        loginreq.responseType = 'json'
        loginreq.onload = ev => {
            switch (loginreq.status) {
                case 200:
                    console.assert(typeof loginreq.response == 'boolean')
                    resolve(loginreq.response)
                    return
                default:
                    console.warn(
                        'Unknown status',
                        loginreq.status,
                        loginreq.response
                    )
                    reject()
            }
        }
        loginreq.onerror = ev => {
            console.warn('Error login', ev)
            reject()
        }
        loginreq.onabort = ev => {
            console.warn('Abort login', ev)
            reject()
        }
        let json_data = JSON.stringify({
            username: username,
            password: password,
        })
        loginreq.open('POST', `${API_ROOT}/login`, true)
        loginreq.send(json_data)
    })
}

export function check_token(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        let loginreq = new XMLHttpRequest()
        loginreq.onload = ev => {
            switch (loginreq.status) {
                case 202:
                    resolve(true)
                    return
                case 401:
                    resolve(false)
                    return
                default:
                    console.warn(
                        'Unknown status',
                        loginreq.status,
                        loginreq.response
                    )
                    reject()
            }
        }
        loginreq.onerror = ev => {
            switch (loginreq.status) {
                case 401:
                    resolve(false)
                    return
                default:
                    console.warn(
                        'Unknown status',
                        loginreq.status,
                        loginreq.response
                    )
                    reject()
            }
        }
        loginreq.onabort = ev => {
            console.warn('Abort login', ev)
            reject()
        }
        loginreq.open('GET', `${API_ROOT}/testtoken`, true)
        loginreq.send()
    })
}

export interface GroupSummary {
    groupid: number
    groupname: string
    threadcount: number
}

export function summarize_groups(): Promise<GroupSummary[]> {
    return new Promise((resolve, reject) => {
        let postreq = new XMLHttpRequest()
        postreq.responseType = 'json'
        postreq.onload = ev => {
            if (postreq.status === 200) {
                let groups = postreq.response as GroupSummary[]
                resolve(groups)
            } else {
                reject()
            }
        }
        postreq.onerror = reject
        postreq.onabort = reject
        postreq.open('GET', `${API_ROOT}/summary`, true)
        postreq.send()
    })
}

interface ThreadSummaryRaw {
    id: number
    creator: string
    opened_on: string
    langcodes: string
    correction_counts: string
}
export interface ThreadSummary {
    id: number
    creator: string
    opened_on: Date
    langcodes: string[]
    correction_counts: number[]
}

export function summarize_threads(groupid: number): Promise<ThreadSummary[]> {
    return new Promise((resolve, reject) => {
        let postreq = new XMLHttpRequest()
        postreq.responseType = 'json'
        postreq.onload = ev => {
            if (postreq.status === 200) {
                let groups = postreq.response as ThreadSummaryRaw[]
                let parsed_groups = groups.map(v => {
                    let langcodes = JSON.parse(v.langcodes) as string[]
                    let correction_counts = JSON.parse(
                        v.correction_counts
                    ) as number[]
                    let new_threadsummary: ThreadSummary = {
                        id: v.id,
                        creator: v.creator,
                        opened_on: new Date(v.opened_on),
                        langcodes,
                        correction_counts,
                    }
                    return new_threadsummary
                })
                resolve(parsed_groups)
            } else {
                reject()
            }
        }
        postreq.onerror = reject
        postreq.onabort = reject
        postreq.open('GET', `${API_ROOT}/summary_group/${groupid}`, true)
        postreq.send()
    })
}

export interface CorrectionSummary {
    id: number
    postdate: Date
    username: string
}

export interface PostSummaryRaw {
    id: number
    date: string
    ellipsis: string
    user: string
    lang: string
    corrections: string
}
export interface PostSummary {
    id: number
    date: Date
    ellipsis: string
    user: string
    lang: string
    corrections: CorrectionSummary[]
}

export function summarize_posts(thread_id: number): Promise<PostSummary[]> {
    return new Promise((resolve, reject) => {
        let postreq = new XMLHttpRequest()
        postreq.responseType = 'json'
        postreq.onload = ev => {
            if (postreq.status === 200) {
                let posts = postreq.response as PostSummaryRaw[]
                let parsed_posts = posts.map(v => {
                    let raw_corrections = JSON.parse(v.corrections) as
                        | CorrectionSummary[]
                        | [null]
                    let corrections: CorrectionSummary[]
                    if (
                        raw_corrections.length == 1 &&
                        raw_corrections[0] === null
                    ) {
                        corrections = []
                    } else {
                        corrections = raw_corrections as CorrectionSummary[]
                    }
                    let new_postsummary: PostSummary = {
                        id: v.id,
                        date: new Date(v.date),
                        ellipsis: v.ellipsis,
                        user: v.user,
                        lang: v.lang,
                        corrections,
                    }
                    return new_postsummary
                })
                resolve(parsed_posts)
            } else {
                reject()
            }
        }
        postreq.onerror = reject
        postreq.onabort = reject
        postreq.open('GET', `${API_ROOT}/summary_thread/${thread_id}`, true)
        postreq.send()
    })
}

export interface Post {
    thread_id: number
    id: number
    posttime: Date
    langcode: string
    correction_for: number | null
    text: string
}

export function get_post(post_id: number): Promise<Post> {
    return new Promise((resolve, reject) => {
        let postreq = new XMLHttpRequest()
        postreq.responseType = 'json'
        postreq.onload = ev => {
            if (postreq.status === 200) {
                let post = postreq.response as Post

                post.posttime = new Date(
                    Date.parse((post.posttime as unknown) as string)
                )
                resolve(post)
            } else {
                reject()
            }
        }
        postreq.open('GET', `${API_ROOT}/post/${post_id}`, true)
        postreq.send()
    })
}

export function new_post(
    post: string,
    langcode: string
): Promise<{ thread_id: number; post_id: number }> {
    return new Promise((resolve, reject) => {
        let postreq = new XMLHttpRequest()
        postreq.responseType = 'json'
        postreq.onload = () => {
            resolve(postreq.response)
        }
        postreq.onerror = () => {
            reject()
        }
        postreq.onabort = () => {
            reject()
        }
        postreq.open('PUT', `${API_ROOT}/addgroup/${langcode}`, true)
        postreq.send(post)
    })
}

export function add_post(
    post: string,
    thread_id: number,
    langcode: string
): Promise<number> {
    return new Promise((resolve, reject) => {
        let postreq = new XMLHttpRequest()
        postreq.responseType = 'json'
        postreq.onload = () => {
            console.assert(typeof postreq.response == 'number')
            resolve(postreq.response)
        }
        postreq.onerror = () => {
            reject()
        }
        postreq.onabort = () => {
            reject()
        }
        postreq.open(
            'PUT',
            `${API_ROOT}/addpost/${thread_id}/${langcode}`,
            true
        )
        postreq.send(post)
    })
}
export function add_correction(post: string, orig_id: number): Promise<number> {
    return new Promise((resolve, reject) => {
        let postreq = new XMLHttpRequest()
        postreq.onload = () => {
            console.assert(typeof postreq.response == 'number')
            resolve(postreq.response)
        }
        postreq.onerror = () => {
            reject()
        }
        postreq.onabort = () => {
            reject()
        }
        postreq.open('PUT', `${API_ROOT}/addcorrection/${orig_id}`, true)
        postreq.send(post)
    })
}