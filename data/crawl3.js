const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const url1 = 'http://www.seoulsoop.kr/soop/n/act_gall.html?pn='
const url2 = '&map_en=0&c=&t=2&p=12&idx=&s=630&sch_word=&k=3#0';

const cheerio = require("cheerio");
const fs = require('fs');
var Buffer = require('buffer/').Buffer
const { v4: uuidv4 } = require('uuid');

const getHtml = async () => {
  let url_list = [];
  const html = await fetch('http://www.seoulsoop.kr/Spac_Editor/upload/seoulsoop/2016/NE_2016_RSGSOW11502.jpg').then(response => response.arrayBuffer());
  fs.writeFileSync('./data/test.jpg',Buffer.from(html));

}

getHtml();