export interface VNode {
  type: string
  children: string | VNode[]
  props?: {
    [x: string]: any
  }
}
