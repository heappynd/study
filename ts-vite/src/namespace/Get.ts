namespace NetWork {
  export namespace HTTP {
    export function get<T>(url: T): Promise<T> {
      return Promise.resolve(url)
    }
  }

  export namespace TCP {
    const message = 'Hello TCP'

    export function getMsg() {
      console.log(message)
    }
  }
}
