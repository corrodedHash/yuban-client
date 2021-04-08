const ADMIN_API_ROOT = '/api/admin'

type RequestOptions = { method?: string; type?: XMLHttpRequestResponseType }

function sendPromise(
    service: string,
    data: string | undefined,
    options: RequestOptions = {}
): Promise<XMLHttpRequest> {
    let default_options = {
        method: 'POST',
        type: 'json',
    }
    let filled_options = Object.assign(default_options, options)
    return new Promise((resolve, reject) => {
        let loginreq = new XMLHttpRequest()
        loginreq.onload = ev => {
            if (loginreq.status === 401) {
                reject(Error('Unauthorized'))
            }
            resolve(loginreq)
        }
        loginreq.onerror = reject
        loginreq.onabort = reject
        loginreq.responseType = filled_options.type
        loginreq.open(
            filled_options.method,
            `${ADMIN_API_ROOT}/${service}`,
            true
        )
        loginreq.send(data)
    })
}
function requestPromise(
    service: string,
    options: RequestOptions = {}
): Promise<XMLHttpRequest> {
    return sendPromise(service, undefined, options)
}

export async function list_users(): Promise<string[]> {
    const x = await requestPromise('users', { method: 'GET' })
    return x.response
}

interface GroupSummaryRaw {
    groupid: number
    groupname: string
    users: string | null
}
export interface GroupSummary {
    groupid: number
    groupname: string
    users: string[]
}

export async function list_groups(): Promise<GroupSummary[]> {
    const x = await requestPromise('groups', { method: 'GET' })
    if (x.status !== 200) {
        throw undefined
    }
    let group_raw: GroupSummaryRaw[] = x.response
    let group = group_raw.map(v => {
        let users: string[]
        if (v.users === null) {
            users = []
        } else {
            try {
                let temp_users = JSON.parse(v.users) as string[] | [null]
                if (temp_users[0] === null) {
                    console.assert(temp_users.length == 1)
                    users = []
                } else {
                    users = temp_users as string[]
                }
            } catch (error) {
                users = [v.users]
            }
        }
        let result: GroupSummary = {
            groupid: v.groupid,
            groupname: v.groupname,
            users,
        }
        return result
    })
    return group
}

export async function add_group(groupname: string): Promise<number> {
    const x = await sendPromise('group', groupname, { method: 'PUT' })
    if (x.status !== 200) {
        throw undefined
    }
    return x.response
}

export async function remove_group(groupname: string): Promise<void> {
    const x = await sendPromise('group', groupname, { method: 'DELETE' })
    if (x.status !== 200) {
        throw undefined
    }
}

export async function add_group_user(
    groupname: string,
    username: string
): Promise<void> {
    const x = await sendPromise(
        'group_user',
        JSON.stringify({ username, groupname }),
        { method: 'PUT' }
    )
    if (x.status !== 200) {
        throw undefined
    }
}

export async function remove_group_user(
    groupname: string,
    username: string
): Promise<void> {
    const x = await sendPromise(
        'group_user',
        JSON.stringify({ username, groupname }),
        { method: 'DELETE' }
    )
    if (x.status !== 200) {
        throw undefined
    }
}

export async function remove_user(username: string): Promise<void> {
    const x = await sendPromise('login', JSON.stringify({ username }), {
        method: 'DELETE',
    })
}

export async function add_user(
    username: string,
    password: string
): Promise<void> {
    const x = await sendPromise(
        'login',
        JSON.stringify({ username, password }),
        {
            method: 'PUT',
        }
    )
}
