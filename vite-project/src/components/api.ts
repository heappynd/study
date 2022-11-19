import { request } from '../utils/request'
import { IModel, IITMModel } from './types'

export function getNoRegisterModelsByProjectId(projectId: string) {
  return request<IITMModel[]>({
    url: `/v1/admin/projectConsole/external/itmPlan/getNoRegisterModelsByProjectId`,
    params: { projectId },
  })
}

export function getModel(
  username: string,
  project_id: number,
  model_id: number
) {
  return request<IModel>({
    url: `/api/v1/users/${username}/projects/${project_id}/models/${model_id}`,
  })
}

export function getAllModels(username: string, project_id: number) {
  return request<IModel[]>({
    url: `/api/v1/users/${username}/projects/${project_id}/models/all`,
  })
}
