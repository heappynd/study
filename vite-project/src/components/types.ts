export interface IItmModel {
  description: string
  domainId: number
  domainName: string
  id: number
  name: string
  type: string
  refModelId: number | null
}

export interface IModel {
  description: string
  id: number
  name: string
  created_at: string
  framework: string
  framework_version: string
  model_type: string
  ref_itm_model_id: number
  source: string
  task_domain: string
  task_type: string
  version: string
  visibility_level: string
}
