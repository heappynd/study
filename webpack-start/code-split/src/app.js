import _ from 'lodash'

export const log = () => {
  console.log(_.join(['App', 'module', 'loaded!'], ' '))
}
