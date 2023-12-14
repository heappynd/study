'use strict'

import Command from '@imooccom/command'
import { log } from '@imooccom/utils'

class InitCommand extends Command {
  get command() {
    return 'init [name]'
  }
  get description() {
    return 'init project'
  }
  get options() {
    return [
      // add option
      ['-f, --force', '是否强制更新', false],
      ['-vv, --vvvv', '是否强制更新', false],
    ]
  }

  action([name, opts]) {
    console.log(1)
    log.verbose('init', name, opts)

    new Promise((resolve) => {
      resolve()
    }).then(() => {
      throw new Error('error from promise')
    })
  }
}

function Init(instance) {
  return new InitCommand(instance)
}

export default Init
