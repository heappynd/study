export interface Option {
  value: string
  children: Option[]
}

export const Option: Option = {
  value: 'a',
  children: [
    {
      value: 'b',
      children: [
        { value: 'd', children: [] },
        { value: 'e', children: [] },
      ],
    },
    {
      value: 'c',
      children: [
        { value: 'f', children: [] },
        { value: 'g', children: [] },
      ],
    },
  ],
}

export interface BTree {
  val: number
  left: BTree | null
  right: BTree | null
}

export const BTree: BTree = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      left: null,
      right: null,
    },
    right: {
      val: 5,
      left: null,
      right: null,
    },
  },
  right: {
    val: 3,
    left: {
      val: 6,
      left: null,
      right: null,
    },
    right: {
      val: 7,
      left: null,
      right: null,
    },
  },
}
