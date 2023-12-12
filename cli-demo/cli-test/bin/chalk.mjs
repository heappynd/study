import chalk, { Chalk } from 'chalk'

console.log(chalk.red('hello world'))
console.log(chalk.red('hello world') + '!' + chalk.blue('me'))

console.log(chalk.red.bgGreen.bold('hello world'))
console.log(chalk.red('hello', 'world'))
console.log(chalk.red('hello', chalk.underline('world')))

console.log(chalk.rgb(255, 255, 0).underline('hello world'))
console.log(chalk.hex('#f0f').bold('hello world'))
console.log(chalk.hex('#f0f')('hello'))

const error = (...text) => console.log(chalk.bold.hex('#f00')(text))
const warning = (...text) => console.log(chalk.hex('#ffa500')(text))

error('Error!')

const customChalk = new Chalk({ level: 1 }) // 0-3

console.log(customChalk.blue('hello world'))
