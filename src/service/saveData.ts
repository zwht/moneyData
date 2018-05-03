import * as express from 'express'
import { costModel, currencyModel } from './../service/db'
// import * as fs from 'fs';
var fs = require('fs');

let dataPath = '/Users/zhaowei/projects/zw/moneyData/src/phantom/data/'

function pad2(n) { return n < 10 ? '0' + n : n }
function getTime() {
  var time = new Date(new Date().getTime() - 2000);
  return time.getFullYear() + '-' + pad2(time.getMonth() + 1) + '-' + pad2(time.getDate()) +
    ' ' + pad2(time.getHours()) + ':' + pad2(time.getMinutes()) + ':' + pad2(time.getSeconds())
}
function readFile() {
  let listObj = []
  let nowTime = dataPath + getTime() + '.txt';
  // nowTime = "/Users/zhaowei/projects/zw/moneyData/src/phantom/2018-04-30 03:03:40.txt"

  try {
    fs.readFile(nowTime, 'utf-8', function (err, data) {
      if (err) {
        //console.error(err);
      } else {
        // 在.txt文件获取成功后，数据处理
        let list = data.split('#');
        for (let i = 0; i < list.length; i++) {
          let item = list[i].split('&');

          listObj.push({
            name: item[0],
            value: item[1],
            scale: item[2],
            time: new Date().getTime()
          })
        }

        // 获取币表，如果有新币，添加到表
        let currencyS;
        currencyModel.find((e, d) => {
          currencyS = d;
          for (let i = 0; i < listObj.length; i++) {
            let key = false;
            for (let j = 0; j < currencyS.length; j++) {
              if (listObj[i].name === currencyS[j].name) {
                key = true;
              }
            }
            if (!key) {
              currencyModel.create({
                name: listObj[i].name,
                time: new Date().getTime()
              }, (e, data) => {
              })
            }
          }
        });

        // 把币当前交易价格插入币交易表
        costModel.collection.insert(listObj, {}, function (err, jellybean, snickers) {
          // 删除文件
          fs.unlink(nowTime,(err)=>{
          })
        })
      }
    });
  } catch (e) {
    //console.error(e)
  }
  setTimeout(() => {
    readFile();
  }, 1000)
}

function save() {
  readFile()
}

export { save }