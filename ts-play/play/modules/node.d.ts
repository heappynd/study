declare module 'murl' {
  export interface Url {
    protocol?: string
    hostname?: string
    pathname?: string
  }

  export function parse(
    urlStr: string,
    parseQueryString?: string,
    slashesDenoteHost?: string
  ): Url
}

declare module 'm-hot-module'
