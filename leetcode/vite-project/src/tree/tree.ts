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
