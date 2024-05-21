import { sum } from '@/utils'

const square = (x) => x * x

export const TEAM_NUM = 12

console.log(sum(1, 22))

if (!PRODUCTION) {
  console.log('Debug info')
}

if (PRODUCTION) {
  console.log('Production log')
}
