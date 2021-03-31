type XMLCallback = (req: XMLHttpRequest) => void;


export interface ThreadSummary {
    id: number;
    posttime: Date;
    posts: PostSummary[];
    user: string;
}

export interface PostSummary {
    id: number,
    date: Date,
    ellipsis: string,
    user: string,
    lang: string,
    corrections: CorrectionSummary[] | [null]
}

export interface CorrectionSummary {
    id: number,
    postdate: Date,
    username: string
}

export interface Post {
    thread_id: number,
    id: number,
    posttime: Date,
    langcode: string,
    correction_for: number | null,
    text: string
}

const API_ROOT = "/api"
const ADMIN_API_ROOT = "/api/admin"

export function logout(): Promise<void> {
    return new Promise((resolve, reject) => {
        let loginreq = new XMLHttpRequest();
        loginreq.onload = (ev) => {
            switch (loginreq.status) {
                case 200:
                    resolve()
                    return;
                default:
                    console.warn("Unknown status", loginreq.status, loginreq.response)
                    reject()
            }
        };
        loginreq.onerror = (ev) => {
            console.warn("Error logout", ev)
            reject()
        }
        loginreq.onabort = (ev) => {
            console.warn("Abort logout", ev)
            reject()
        }
        loginreq.open("POST", `${API_ROOT}/logout`, true);
        loginreq.send();
    })
}

export function check_login(username: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        let loginreq = new XMLHttpRequest();
        loginreq.responseType = "json"
        loginreq.onload = (ev) => {
            switch (loginreq.status) {
                case 200:
                    console.assert(typeof loginreq.response == "boolean")
                    resolve(loginreq.response)
                    return;
                default:
                    console.warn("Unknown status", loginreq.status, loginreq.response)
                    reject()
            }
        };
        loginreq.onerror = (ev) => {
            console.warn("Error login", ev)
            reject()
        }
        loginreq.onabort = (ev) => {
            console.warn("Abort login", ev)
            reject()
        }
        let json_data = JSON.stringify({
            username: username,
            password: password,
        });
        loginreq.open("POST", `${API_ROOT}/login`, true);
        loginreq.send(json_data);
    })
}

export function check_token(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        let loginreq = new XMLHttpRequest();
        loginreq.onload = (ev) => {
            switch (loginreq.status) {
                case 202:
                    resolve(true)
                    return;
                case 401:
                    resolve(false)
                    return;
                default:
                    console.warn("Unknown status", loginreq.status, loginreq.response)
                    reject()
            }
        };
        loginreq.onerror = (ev) => {
            switch (loginreq.status) {
                case 401:
                    resolve(false)
                    return;
                default:
                    console.warn("Unknown status", loginreq.status, loginreq.response)
                    reject()
            }
        }
        loginreq.onabort = (ev) => {
            console.warn("Abort login", ev)
            reject()
        }
        loginreq.open("GET", `${API_ROOT}/testtoken`, true);
        loginreq.send();
    });
}

export function get_posts(): Promise<ThreadSummary[]> {
    return new Promise((resolve, reject) => {
        let postreq = new XMLHttpRequest();
        postreq.responseType = "json"
        postreq.onload = (ev) => {
            if (postreq.status === 200) {
                let x = postreq.response as any[];

                let threads: ThreadSummary[] = x.map(thread => {
                    let modified_thread = thread as ThreadSummary
                    console.assert(typeof (modified_thread.posts) == "string")
                    modified_thread.posts = JSON.parse("[" + modified_thread.posts as unknown as string + "]")
                    modified_thread.posts = modified_thread.posts.map(post => {
                        console.assert(typeof (post.corrections) == "string")
                        post.corrections = JSON.parse(post.corrections as unknown as string)
                        if (post.corrections.length === 1 && post.corrections[0] === null) {
                            post.corrections = []
                        }
                        post.corrections = (post.corrections as unknown as CorrectionSummary[]).map(corr => {
                            corr.postdate = new Date(Date.parse(corr.postdate as unknown as string))
                            return corr
                        })
                        let parsed_time = new Date(Date.parse(post.date as unknown as string))
                        post.date = parsed_time
                        return post
                    })
                    modified_thread.posttime = new Date(Date.parse(modified_thread.posttime as unknown as string))
                    return modified_thread
                })
                resolve(threads)
            } else {
                reject()
            }
        };
        postreq.open("GET", `${API_ROOT}/posts`, true);
        postreq.send();
    })
}

export function get_post(post_id: number): Promise<Post> {
    return new Promise((resolve, reject) => {
        let postreq = new XMLHttpRequest();
        postreq.responseType = "json"
        postreq.onload = (ev) => {
            if (postreq.status === 200) {
                let post = postreq.response as Post

                post.posttime = new Date(Date.parse(post.posttime as unknown as string))
                resolve(post)
            } else {
                reject()
            }
        };
        postreq.open("GET", `${API_ROOT}/post/${post_id}`, true);
        postreq.send();
    })
}

export function new_post(post: string, langcode: string): Promise<{ thread_id: number, post_id: number }> {
    return new Promise((resolve, reject) => {
        let postreq = new XMLHttpRequest();
        postreq.responseType = "json"
        postreq.onload = () => {
            resolve(postreq.response)
        }
        postreq.onerror = () => {
            reject()
        }
        postreq.onabort = () => {
            reject()
        }
        postreq.open("PUT", `${API_ROOT}/newpost/${langcode}`, true);
        postreq.send(post);
    })
}

export function add_post(post: string, thread_id: number, langcode: string): Promise<number> {
    return new Promise((resolve, reject) => {
        let postreq = new XMLHttpRequest();
        postreq.responseType = "json"
        postreq.onload = () => {
            console.assert(typeof (postreq.response) == "number")
            resolve(postreq.response)
        }
        postreq.onerror = () => {
            reject()
        }
        postreq.onabort = () => {
            reject()
        }
        postreq.open("PUT", `${API_ROOT}/addpost/${thread_id}/${langcode}`, true);
        postreq.send(post);
    })
}
export function add_correction(post: string, orig_id: number): Promise<number> {
    return new Promise((resolve, reject) => {
        let postreq = new XMLHttpRequest();
        postreq.onload = () => {
            console.assert(typeof (postreq.response) == "number")
            resolve(postreq.response)
        }
        postreq.onerror = () => {
            reject()
        }
        postreq.onabort = () => {
            reject()
        }
        postreq.open("PUT", `${API_ROOT}/addcorrection/${orig_id}`, true);
        postreq.send(post);
    })
}

export function list_users(): Promise<string[]> {
    return new Promise((resolve, reject) => {
        let postreq = new XMLHttpRequest();
        postreq.responseType = "json"
        postreq.onload = () => {
            resolve(postreq.response)
        }
        postreq.onerror = () => {
            reject()
        }
        postreq.onabort = () => {
            reject()
        }
        postreq.open("GET", `${ADMIN_API_ROOT}/users`, true);
        postreq.send();
    })
}

export function remove_user(username: string): Promise<void> {
    return new Promise((resolve, reject) => {
        let postreq = new XMLHttpRequest();
        postreq.onload = () => {
            resolve()
        }
        postreq.onerror = () => {
            reject()
        }
        postreq.onabort = () => {
            reject()
        }
        postreq.open("DELETE", `${ADMIN_API_ROOT}/login`, true);
        postreq.send(JSON.stringify({ username }));
    })
}

export function add_user(username: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
        let postreq = new XMLHttpRequest();
        postreq.onload = () => {
            resolve()
        }
        postreq.onerror = () => {
            reject()
        }
        postreq.onabort = () => {
            reject()
        }
        postreq.open("PUT", `${ADMIN_API_ROOT}/login`, true);
        postreq.send(JSON.stringify({ username, password }));
    })
}