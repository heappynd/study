import { request } from 'biglab-utils'

sessionStorage.setItem('mock', 'true')

export interface IDataSet {
  baseId: number
  name: string
  type: string
  version: string
  key: string
}

export interface IDataSetRes {
  baseId: number
  name: string
  type: string
  versions: string
}
export interface ITypeListRes {
  audio: string
  custom: string
  image: string
  structured: string
  text: string
  video: string
}

export const findDataSet = (projectId: number) => {
  return request<IDataSetRes[]>({
    url: '/v3/data/private/dataset/findDataSet',
    params: { projectId },
  })
}

export const getTypeList = () => {
  return request<ITypeListRes>({
    url: '/v3/data/private/dataset/typeList',
  })
}
