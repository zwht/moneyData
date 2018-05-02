import { costModel } from './../../service/db'
let list = function (req, res, next) {
  let listObj=costModel.find({
    //occupation: /host/,
    //'name.last': 'Ghost',
    //age: { $gt: 17, $lt: 66 },
    //likes: { $in: ['vaporizing', 'talking'] }
  }).
  limit(10).
  //sort({ occupation: -1 }).
  //select({ name: 1, occupation: 1 }).
  exec((err,data)=>{
    console.log(data)
    res.json({ data: listObj })
  });
}
export { list };