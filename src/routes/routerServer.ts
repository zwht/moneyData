import * as express from "express";
import { costs } from './costs'
let routerList = [costs]

let postRouter = express.Router();

let routerServer = function (app) {
  routerList.forEach(obj => {
    obj.forEach(item => {
      console.log(item.type)
      app.use(item.path, postRouter[item.type]('/', item.controller))
    })
  })
}
export { routerServer }