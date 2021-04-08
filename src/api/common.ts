export type RequestOptions = { method?: string; type?: XMLHttpRequestResponseType }

export class RequestPromiser {
    root: string
    constructor(root: string) {
        this.root = root
    }

    sendPromise(
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
                `${this.root}/${service}`,
                true
            )
            loginreq.send(data)
        })
    }
    requestPromise(
        service: string,
        options: RequestOptions = {}
    ): Promise<XMLHttpRequest> {
        return this.sendPromise(service, undefined, options)
    }
}
