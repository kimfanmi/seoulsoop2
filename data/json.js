const fs = require('fs');

let json_list = fs.readdirSync('./data/act_gall').sort((a, b) => {
  let ia = a.split(".")[0] / 1;
  let ib = b.split(".")[0] / 1;
  return ib - ia;
});

// for (let i of json_list) {
//   let data = JSON.parse(fs.readFileSync('./data/act_gall/'+i));
//   data.body.forEach(p=>{
//     if (fs.existsSync('./public/image/upload/'+p)) {
//     } else {
//       console.log('없음--------------------------------------')
//     }
//   })
// }


// for (let i of json_list) {
//   let data = JSON.parse(fs.readFileSync('./data/act_gall/'+i));
//   let rebody = [];
//   data.body = data.body.map(p => {
//     return {type:'img',data:p}
//   });
//   fs.writeFileSync('./data/act_gall/'+i,JSON.stringify(data))
// }


for (let i of json_list) {
  let data = JSON.parse(fs.readFileSync('./data/act_gall/' + i));
  data.body.forEach(p => {
    if (fs.existsSync('./public/image/upload/' + p.data)) {
      fs.renameSync('./public/image/upload/' + p.data, './public/image/upload2/' + p.data)
    } else {
      console.log('없음--------------------------------------')
    }
  })
}


console.log('done')