import chalk from 'chalk'
import { emptyDir, ensureDir } from 'fs-extra'
import { readFile, writeFile } from 'fs/promises'
import { pathComponents } from './paths'
import camelcase from 'camelcase'
import glob from 'fast-glob'
import { format } from 'prettier'
import path from 'path'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import consola from 'consola'
import type { BuiltInParserName } from 'prettier'

const dir = dirname(fileURLToPath(import.meta.url))

consola.info(chalk.blue('generating vue components'))
await ensureDir(pathComponents)
await emptyDir(pathComponents)
const files = await getSvgFiles()

console.log(files)

function getSvgFiles() {
  const cwd = path.resolve(dir, '../../svg')

  return glob('*.svg', { cwd, absolute: true })
}

consola.info(chalk.blue('generating vue files'))

const getName = (file: string) => {
  const filename = path.basename(file).replace('.svg', '')
  const componentName = camelcase(filename, { pascalCase: true })
  return {
    filename,
    componentName,
  }
}

const formatCode = (code: string, parser: BuiltInParserName = 'typescript') =>
  format(code, {
    parser,
    semi: false,
    singleQuote: true,
  })

async function transformToVueComponent(file: string) {
  const content = await readFile(file, 'utf-8')
  const { filename, componentName } = getName(file)
  const vue = formatCode(
    `
<template>
${content}
</template>
<script lang="ts">
import type { DefineComponent } from 'vue'
export default ({
  name: "${componentName}",
}) as DefineComponent
</script>`,
    'vue'
  )

  writeFile(path.resolve(pathComponents, `${filename}.vue`), vue, 'utf-8')
}

await Promise.all(files.map((file) => transformToVueComponent(file)))

const generateEntry = async (files: string[]) => {
  const code = formatCode(
    files
      .map((file) => {
        const { filename, componentName } = getName(file)
        return `export { default as ${componentName} } from './${filename}.vue'`
      })
      .join('\n')
  )
  await writeFile(path.resolve(pathComponents, 'index.ts'), code, 'utf-8')
}

consola.info(chalk.blue('generating entry file'))
await generateEntry(files)
