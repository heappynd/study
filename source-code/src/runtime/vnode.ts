export type VNode = {
  type: keyof HTMLElementTagNameMap
  children?: string | VNode[]
  props?: {
    [key: string]: any
  }
}
