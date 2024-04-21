const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const url1 = 'http://www.seoulsoop.kr/soop/n/act_gall.html?pn='
const url2 = '&map_en=0&c=&t=2&p=12&idx=&s=630&sch_word=&k=3#0';

const cheerio = require("cheerio");
const fs = require('fs');
var Buffer = require('buffer/').Buffer
const { v4: uuidv4 } = require('uuid');

const getHtml = async () => {

  const url_list = JSON.parse(fs.readFileSync('./data/crawl_url_list.txt', 'utf-8'));
  for (let i in url_list) {
    let url = url_list[i];
    const html = await fetch(url).then(response => response.text());
    const $ = cheerio.load(html);

    const title = $(".txt_subject").text().trim();
    const date = $(".txt_date").text();
    const clicked = $(".txt_hit").text();
    const img_list = $("#ws img");
    let imgUrl = [];
    img_list.each((i, el) => {
      imgUrl.push('http://www.seoulsoop.kr/' + el.attribs.src.substring(6));
    })

    let json = {title,date,clicked,body:[]}

    for (let j in imgUrl) {
      const imgData = await fetch(imgUrl[j]).then(response => response.arrayBuffer());
      let uuid = uuidv4();
      fs.writeFileSync('./public/image/upload/'+uuid+'.jpg', Buffer.from(imgData));
      json.body.push(uuid+'.jpg')
    }

    fs.writeFileSync('./data/act_gall/'+i+'.json',JSON.stringify(json),'utf-8')



  }

};

getHtml();