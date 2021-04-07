const ADMIN_API_ROOT = '/api/admin'

export function list_users(): Promise<string[]> {
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
        postreq.open('GET', `${ADMIN_API_ROOT}/users`, true)
        postreq.send()
    })
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

export function list_groups(): Promise<GroupSummary[]> {
    return new Promise((resolve, reject) => {
        let postreq = new XMLHttpRequest()
        postreq.responseType = 'json'
        postreq.onload = () => {
            if (postreq.status !== 200) {
                reject()
                return
            }
            let group_raw: GroupSummaryRaw[] = postreq.response
            console.log(group_raw)
            let group = group_raw.map(v => {
                let users: string[]
                if (v.users === null) {
                    users = []
                } else {
                    try {
                        let temp_users = JSON.parse(v.users) as
                            | string[]
                            | [null]
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
            resolve(group)
        }
        postreq.onerror = () => {
            reject()
        }
        postreq.onabort = () => {
            reject()
        }
        postreq.open('GET', `${ADMIN_API_ROOT}/groups`, true)
        postreq.send()
    })
}

export function add_group(groupname: string): Promise<number> {
    return new Promise((resolve, reject) => {
        let postreq = new XMLHttpRequest()
        postreq.responseType = 'json'
        postreq.onload = () => {
            if (postreq.status == 200) {
                resolve(parseInt(postreq.response))
            } else {
                reject()
            }
        }
        postreq.onerror = () => {
            reject()
        }
        postreq.onabort = () => {
            reject()
        }
        postreq.open('PUT', `${ADMIN_API_ROOT}/group`, true)
        postreq.send(JSON.stringify(groupname))
    })
}

export function remove_group(groupname: string): Promise<void> {
    return new Promise((resolve, reject) => {
        let postreq = new XMLHttpRequest()
        postreq.onload = () => {
            if (postreq.status == 200) {
                resolve()
            } else {
                reject()
            }
        }
        postreq.onerror = () => {
            reject()
        }
        postreq.onabort = () => {
            reject()
        }
        postreq.open('DELETE', `${ADMIN_API_ROOT}/group`, true)
        postreq.send(JSON.stringify(groupname))
    })
}

export function add_group_user(
    groupname: string,
    username: string
): Promise<void> {
    return new Promise((resolve, reject) => {
        let postreq = new XMLHttpRequest()
        postreq.onload = () => {
            if (postreq.status == 200) {
                resolve()
            } else {
                reject()
            }
        }
        postreq.onerror = () => {
            reject()
        }
        postreq.onabort = () => {
            reject()
        }
        postreq.open('PUT', `${ADMIN_API_ROOT}/group_user`, true)
        postreq.send(JSON.stringify({ username, groupname }))
    })
}

export function remove_group_user(
    groupname: string,
    username: string
): Promise<void> {
    return new Promise((resolve, reject) => {
        let postreq = new XMLHttpRequest()
        postreq.onload = () => {
            if (postreq.status == 200) {
                resolve()
            } else {
                reject()
            }
        }
        postreq.onerror = () => {
            reject()
        }
        postreq.onabort = () => {
            reject()
        }
        postreq.open('DELETE', `${ADMIN_API_ROOT}/group_user`, true)
        postreq.send(JSON.stringify({ username, groupname }))
    })
}

export function remove_user(username: string): Promise<void> {
    return new Promise((resolve, reject) => {
        let postreq = new XMLHttpRequest()
        postreq.onload = () => {
            resolve()
        }
        postreq.onerror = () => {
            reject()
        }
        postreq.onabort = () => {
            reject()
        }
        postreq.open('DELETE', `${ADMIN_API_ROOT}/login`, true)
        postreq.send(JSON.stringify({ username }))
    })
}

export function add_user(username: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
        let postreq = new XMLHttpRequest()
        postreq.onload = () => {
            resolve()
        }
        postreq.onerror = () => {
            reject()
        }
        postreq.onabort = () => {
            reject()
        }
        postreq.open('PUT', `${ADMIN_API_ROOT}/login`, true)
        postreq.send(JSON.stringify({ username, password }))
    })
}
