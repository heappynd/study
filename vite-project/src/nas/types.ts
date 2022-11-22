export interface IGetState {
  state: number
  message: string
  user: string
  expectedToOperateTime: string
}

export interface IGetDetail {
  subSpaceJson: { name: string; used: number }[]
  totalUsed: number
  totalSpace: number
}
