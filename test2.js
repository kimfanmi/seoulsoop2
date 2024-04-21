const fs = require('fs');

fs.readdirSync('./public/image/upload/').forEach(p=>{
  fs.copyFileSync('./public/image/1.jpg', './public/image/upload/' + p)
})