export type VNode = {
  type: string
  children?: string | VNode[]
  props?: Record<string, string | boolean | Function>
  el?: HTMLElement
}
export type Container = {
  _vnode: VNode | undefined | null
  _vei: Record<string, Function>
} & HTMLElement
