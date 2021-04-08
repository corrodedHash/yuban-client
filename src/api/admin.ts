import { RequestPromiser } from './common'

const requester = new RequestPromiser('/api/admin')

export async function list_users(): Promise<string[]> {
    const x = await requester.requestPromise('users', { method: 'GET' })
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
    const x = await requester.requestPromise('groups', { method: 'GET' })
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
        let result: GroupSummary = Object.assign(v, {
            users,
        })
        return result
    })
    return group
}

export async function add_group(groupname: string): Promise<number> {
    const x = await requester.sendPromise('group', groupname, { method: 'PUT' })
    if (x.status !== 200) {
        throw undefined
    }
    return x.response
}

export async function remove_group(groupname: string): Promise<void> {
    const x = await requester.sendPromise('group', groupname, {
        method: 'DELETE',
    })
    if (x.status !== 200) {
        throw undefined
    }
}

export async function add_group_user(
    groupname: string,
    username: string
): Promise<void> {
    const x = await requester.sendPromise(
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
    const x = await requester.sendPromise(
        'group_user',
        JSON.stringify({ username, groupname }),
        { method: 'DELETE' }
    )
    if (x.status !== 200) {
        throw undefined
    }
}

export async function remove_user(username: string): Promise<void> {
    const x = await requester.sendPromise(
        'login',
        JSON.stringify({ username }),
        {
            method: 'DELETE',
        }
    )
}

export async function add_user(
    username: string,
    password: string
): Promise<void> {
    const x = await requester.sendPromise(
        'login',
        JSON.stringify({ username, password }),
        {
            method: 'PUT',
        }
    )
}
