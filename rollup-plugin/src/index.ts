import { Plugin } from 'rollup'

interface AliasOptions {
  entries: { [key: string]: string }
}

export function alias(options: AliasOptions): Plugin {
  const { entries } = options

  return {
    name: 'alias',
    resolveId(source, importer, options) {
      // source 是当前路径
      // importer 是父级路径
      console.log(source, importer)

      const key = Object.keys(entries).find((e) => {
        return source.startsWith(e)
      })

      if (!key) return source

      return source.replace(key, entries[key]) + '.js'
    },
  }
}
