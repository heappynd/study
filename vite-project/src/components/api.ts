import { request } from '../utils/request'
import { IModel, IItmModel } from './types'

export function getNoRegisterModelsByProjectId(projectId: string) {
  return request<IItmModel[]>({
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

export function registerModel(project_id: string, data: any) {
  return request({
    url: `/mt/api/v1/tasks/models/projects/${project_id}`,
    data,
    method: 'post',
  })
}

export function updateModel(project_id: string, data: any) {
  return request({
    url: `/mt/api/v1/tasks/models/projects/${project_id}`,
    data,
    method: 'patch',
  })
}
