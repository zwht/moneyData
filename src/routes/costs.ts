import { list } from '../controller/costs/list'

let costs = [
  {
    path: '/costs/list',
    type: 'post',
    controller: list
  }
]

export { costs };