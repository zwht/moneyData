import { list } from '../controller/costs/list'

let costs = [
  {
    path: '/zw/costs/list',
    type: 'post',
    controller: list
  }
]

export { costs };