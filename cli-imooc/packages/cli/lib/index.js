import createInitCommand from '@imooccom/init'
import createCLI from './createCLI.js'
import './exception.js'

export default function (args) {
  const program = createCLI()

  createInitCommand(program)

  program.parse(process.argv)
}
