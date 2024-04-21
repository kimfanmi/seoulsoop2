const fs = require('fs');
const { header } = require('./components/header/header');
const { index_carousel } = require('./components/index_carousel/index_carousel');
const { footlink } = require('./components/footlink/footlink');
const { footer } = require('./components/footer/footer');
const { makeHTML } = require('./makeHtml');
const { index_carousel2 } = require('./components/index_carousel2/index_carousel2');
const { index_content } = require('./components/index_content/index_content');
const { contents } = require('./components/contents/contents');

exports.updateHtml = ()=>{
  index();
  let json = JSON.parse(fs.readFileSync('./components/header/header.json', 'utf-8'));
  
  for (let i in json) {
    for (let j in json[i].menu) {
      content(json[i].menu[j].substring(1),contents(i,j));
    }
  }
  
  content('act_gall_view',contents('갤러리','행사/활동갤러리','act_gall_view'));
  content('notice_view',contents('커뮤니티','공지사항','notice_view'));
  content('dataroom',contents('자료실',''));
  content('data_view',contents('자료실','','data_view'));
  content('map',contents('오시는길',''));
}

function index() {
  fs.writeFileSync('./public/index.html', makeHTML(`
  <link rel="stylesheet" type="text/css" href="css/index.css">
  <link rel="stylesheet" type="text/css" href="css/foot.css">
  <link rel="stylesheet" type="text/css" href="css/head.css">
  `, [
    header(),
    index_carousel(),
    index_carousel2(),
    index_content(),
    footlink(),
    footer()
  ]), 'utf-8');
}

function content(name, data) {
  fs.writeFileSync('./public/' + name + '.html', makeHTML(`
  <link rel="stylesheet" type="text/css" href="css/contents.css">
  <link rel="stylesheet" type="text/css" href="css/foot.css">
  <link rel="stylesheet" type="text/css" href="css/head.css">
  `, [
    header(),
    data,
    footlink(),
    footer()
  ]), 'utf-8');
}