import { RequestPromiser } from './common'

const requester = new RequestPromiser('/api')

export async function logout(): Promise<void> {
    const x = await requester.requestPromise('logout')
    switch (x.status) {
        case 200:
            return
        default:
            console.warn('Unknown status', x.status, x.response)
            throw undefined
    }
}

export interface UserInfo {
    username: string
}

export async function check_login(
    username: string,
    password: string
): Promise<UserInfo | null> {
    const json_data = JSON.stringify({
        username: username,
        password: password,
    })
    const x = await requester.sendPromise('login', json_data)
    switch (x.status) {
        case 200:
            console.assert(typeof x.response == 'boolean')
            const accepted: boolean = x.response
            if (!accepted) {
                return null
            }
            return { username: username.toLowerCase() }
        default:
            console.warn('Unknown status', x.status, x.response)
            throw undefined
    }
}

export interface CheckTokenResponse {
    username: string
}

export async function check_token(): Promise<UserInfo | null> {
    const x = await requester.requestPromise('testtoken', { method: 'GET' })
    switch (x.status) {
        case 200:
            const user = x.response as CheckTokenResponse | null
            if (user === null) {
                return null
            }
            return { username: user.username.toLowerCase() }
        default:
            console.warn('Unknown status', x.status, x.response)
            throw undefined
    }
}

export interface GroupSummary {
    groupid: number
    groupname: string
    threadcount: number
}

export async function summarize_groups(): Promise<GroupSummary[]> {
    const x = await requester.requestPromise('summary', { method: 'GET' })
    if (x.status === 200) {
        let groups = x.response as GroupSummary[]
        return groups
    } else {
        throw undefined
    }
}

interface ThreadSummaryRaw {
    id: number
    creator: string
    opened_on: string
    languages: string
}
export interface ThreadSummary {
    id: number
    creator: string
    opened_on: Date
    languages: { lang: string; count: number }[]
}

export async function summarize_threads(
    groupid: number
): Promise<ThreadSummary[]> {
    const x = await requester.requestPromise(`summary_group/${groupid}`, {
        method: 'GET',
    })
    if (x.status !== 200) {
        throw undefined
    }
    let groups = x.response as ThreadSummaryRaw[]
    let parsed_groups = groups.map(v => {
        let languages = JSON.parse(v.languages) as {
            lang: string
            count: number
        }[]
        let new_threadsummary: ThreadSummary = {
            id: v.id,
            creator: v.creator,
            opened_on: new Date(v.opened_on),
            languages,
        }
        return new_threadsummary
    })
    return parsed_groups
}

export interface CorrectionSummary {
    id: number
    postdate: Date
    username: string
}

export interface PostSummaryRaw {
    id: number
    opened_on: string
    ellipsis: string
    username: string
    lang: string
    corrections: string
}
export interface PostSummary {
    id: number
    opened_on: Date
    ellipsis: string
    username: string
    lang: string
    corrections: CorrectionSummary[]
}

export async function summarize_posts(
    thread_id: number
): Promise<PostSummary[]> {
    const x = await requester.requestPromise(`summary_thread/${thread_id}`, {
        method: 'GET',
    })

    if (x.status !== 200) {
        throw undefined
    }
    let posts = x.response as PostSummaryRaw[]

    let parsed_posts = posts.map(v => {
        let raw_corrections = JSON.parse(v.corrections) as
            | CorrectionSummary[]
            | [null]
        let corrections: CorrectionSummary[]
        if (raw_corrections.length == 1 && raw_corrections[0] === null) {
            corrections = []
        } else {
            corrections = raw_corrections as CorrectionSummary[]
        }
        let new_postsummary: PostSummary = Object.assign(v, {
            opened_on: new Date(v.opened_on),
            corrections,
        })

        return new_postsummary
    })
    return parsed_posts
}

export interface Post {
    thread_id: number
    id: number
    posttime: Date
    langcode: string
    correction_for: number | null
    text: string
}

export async function get_post(post_id: number): Promise<Post> {
    const x = await requester.requestPromise(`post/${post_id}`, {
        method: 'GET',
    })
    if (x.status !== 200) {
        throw undefined
    }
    let post = x.response as Post

    post.posttime = new Date(Date.parse((post.posttime as unknown) as string))

    return post
}

export async function add_thread(
    group_id: number,
    post: string,
    langcode: string
): Promise<{ thread_id: number; post_id: number }> {
    const x = await requester.sendPromise(
        `addthread/${group_id}/${langcode}`,
        post,
        {
            method: 'PUT',
        }
    )
    if (x.status !== 200) {
        throw undefined
    }
    return x.response
}

export async function add_post(
    thread_id: number,
    post: string,
    langcode: string
): Promise<number> {
    const x = await requester.sendPromise(
        `addpost/${thread_id}/${langcode}`,
        post,
        {
            method: 'PUT',
        }
    )
    console.assert(typeof x.response == 'number')
    return x.response
}

export async function add_correction(
    post: string,
    orig_id: number
): Promise<number> {
    const x = await requester.sendPromise(`addcorrection/${orig_id}`, post, {
        method: 'PUT',
    })

    if (x.status !== 200) {
        throw undefined
    }

    console.assert(typeof x.response == 'number')
    return x.response
}

export async function delete_thread(
    thread_id: number
): Promise<void> {
    const x = await requester.requestPromise(`thread/${thread_id}`, { method: 'DELETE' })

    if (x.status !== 200) {
        throw undefined
    }

    console.assert(typeof x.response == 'boolean')
    if (x.response !== true) {
        throw Error("Server did not delete")
    }
}


export async function delete_post(
    post_id: number
): Promise<void> {
    const x = await requester.requestPromise(`post/${post_id}`, { method: 'DELETE' })

    if (x.status !== 200) {
        throw undefined
    }

    console.assert(typeof x.response == 'boolean')
    if (x.response !== true) {
        throw Error("Server did not delete")
    }
}

export async function delete_correction(
    post_id: number
): Promise<void> {
    const x = await requester.requestPromise(`correction/${post_id}`, { method: 'DELETE' })

    if (x.status !== 200) {
        throw undefined
    }

    console.assert(typeof x.response == 'boolean')
    if (x.response !== true) {
        throw Error("Server did not delete")
    }
}