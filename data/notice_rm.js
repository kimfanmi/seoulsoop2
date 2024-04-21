const fs = require('fs');

let json_list = fs.readdirSync('./data/act_gall');


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