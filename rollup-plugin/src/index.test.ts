import { describe, it, expect } from 'vitest'
import { alias } from '.'

describe('alias', () => {
  it('should replace', () => {
    const aliasObj: any = alias({
      entries: {
        '@': './utils',
      },
    })

    expect(aliasObj.resolveId('@/add')).toBe('./utils/add.js')
  })

  it('should not', () => {
    const aliasObj: any = alias({
      entries: {
        '@': './utils',
      },
    })

    expect(aliasObj.resolveId('!/add')).toBe('!/add')
  })
})
