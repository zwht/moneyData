import { costModel } from './../../service/db'
import { reponse } from './../../service/response'

function dateConvert(dateParms,type) {
  let datetime
  // 对传入的时间参数进行判断
  if (dateParms instanceof Date) {
     datetime = dateParms;
  }
  //判断是否为字符串
  if ((typeof dateParms == "string") && dateParms.constructor == String) {
    //将字符串日期转换为日期格式
     datetime = new Date(Date.parse(dateParms.replace(/-/g, "/")));
  }
  //获取年月日时分秒
  let year = datetime.getFullYear();
  let month = datetime.getMonth() + 1;
  let date = datetime.getDate();
  let hour = datetime.getHours();
  let minutes = datetime.getMinutes();
  let second = datetime.getSeconds();

  //月，日，时，分，秒 小于10时，补0
  if (month < 10) {
    month = "0" + month;
  }
  if (date < 10) {
    date = "0" + date;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (second < 10) {
    second = "0" + second;
  }
  let time;
  //拼接日期格式【例如：yyyymmdd】
  //let time = year + month + date;

  //或者：其他格式等
  if(type==='m'){
     time = year+"年"+month+"月"+date+"日"+hour+":"+minutes+":00"; 
  }

  //返回处理结果
  return time;
}
function setData(data, type) {
  let ar = [];
  data.forEach(element => {
    let key = true
    let time=dateConvert(element.time,type)
    ar.forEach(item => {
      if(time===dateConvert(item.time,type)){
        if(item.startTime>element.time){
          item.startTime=element.time;
          item.value[0]=element.value
        }
        if(item.endTime<element.time){
          item.endTime=element.time;
          item.value[1]=element.value
        }
        if(element.value<item.value[2]){
          item.value[2]=element.value;
        }
        if(element.value>item.value[3]){
          item.value[3]=element.value;
        }
        key=false;
      }
    })
    if (key) {
      ar.push({
        startTime:new Date().getTime(),
        time: time,
        endTime:0,
        value: [element.value,element.value,element.value,element.value]
      })
    }
  });

  return ar;
}
function list(req, res, next) {
  let reqData = req.body;
  let search = {
    //occupation: /host/,
    //'name.last': 'Ghost',
    //time: { $gt: 17, $lt: 66 },
    //likes: { $in: ['vaporizing', 'talking'] }
  }
  if (reqData.startTime && reqData.endTime) {
    search['time'] = { $gt: reqData.startTime, $lt: reqData.endTime }
  }
  if (reqData.name) {
    search['name'] = reqData.name
  }
  let listObj = costModel.find(search)
    .limit(100)
    //.where('name').in(['movie', 'music', 'art'])
    //sort({ occupation: -1 }).
    //select({ name: 1, occupation: 1 }).
    .exec((err, data) => {
      res.json(reponse(setData(data, 'm'), 200))
    });
}
export { list };