import { request } from '../utils/request'
import { IGetState, IGetDetail } from './types'

/**
 * 查询项目空间磁盘使用量详情
 */
export const getDetail = (projectId: string) =>
  request<IGetDetail>({
    url: '/v1/data/admin/spaceDetail/getDetail',
    params: { projectId },
  })

/**
 * 用户手动执行项目磁盘使用量计算
 */
export const start = (projectId: string, user: string) =>
  request({
    url: '/v1/data/admin/spaceDetail/start',
    params: { projectId, user },
  })

/**
 * 查询磁盘使用量任务状态
 */
export const getState = (projectId: string, user: string) =>
  request<IGetState>({
    url: '/v1/data/admin/spaceDetail/getState',
    params: { projectId, user },
  })

/**
 * 获取阈值
 */
export const getThreshold = () =>
  request({
    url: '/v1/admin/config/detailCms',
    params: {
      argsGroupName: 'zhongyan_storage',
      paramName: 'warningthreshold_nas',
    },
  })
