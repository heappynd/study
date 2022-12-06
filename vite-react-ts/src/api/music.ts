import request from './request'

interface Params {
  keywords?: string
  limit?: number
  offset?: number // (current - 1) * limit
}

export interface MusicRes {
  songCount: number
  songs: Song[]
}

export interface Song {
  id: number
  name: string
  al: { name: string }
  ar: { name: string }[]
}

export default {
  search: (params: Params) => request<any, MusicRes>('/search', { params }),
}
