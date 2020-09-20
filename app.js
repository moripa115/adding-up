'use strict';
const fs = require('fs');
const readline = require('readline');
const rs = fs.createReadStream('./popu-pref.csv');
const rl = readline.createInterface({ input: rs, output: {} });
const prefectureDataMap = new Map();//key:都道府県 value:集計データのオブジェクト
rl.on('line', lineString => {
  const colums = lineString.split(',');
  const year = parseInt(colums[0]);
  const prefecture = colums[1];
  const popu = parseInt(colums[3]);
  if (year ===2010 || year === 2015){
      let value =prefectureDataMap.get(prefecture);
      if (!value){
        value = {
          popu10: 0,
          popu15: 0,
          change: null //人口の変化率
      };
    } 
    if(year === 2010){
        value.popu10 = popu;
    }
    if (year === 2015){
        value .popu15 = popu;
    }
    prefectureDataMap.set(prefectuture, value);
    
};
rl.on('close',()=>{
    console.log(prefectureDataMap);
});


