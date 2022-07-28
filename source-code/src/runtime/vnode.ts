export type VNode = {
  type: keyof HTMLElementTagNameMap | symbol
  children?: string | VNode[]
  props?: {
    [key: string]: any
  }
  el?: HTMLElement
}

export const Text = Symbol()
export const Comment = Symbol()
export const Fragment = Symbol()
