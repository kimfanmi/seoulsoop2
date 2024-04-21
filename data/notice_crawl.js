const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const url1 = 'http://www.seoulsoop.kr/soop/n/notice.html?pn='
const url2 = '&map_en=0&c=&t=&p=&idx=';

const cheerio = require("cheerio");
const fs = require('fs');
var Buffer = require('buffer/').Buffer
const { v4: uuidv4 } = require('uuid');

const getHtml = async () => {

  let url_list = []
  let tmp = [];
  for (let i = 30; i > 0; i--) {
    const html = await fetch(url1 + i + url2).then(response => response.text());
    const $ = cheerio.load(html);

    const alist = $(".col_subject a");
    tmp=[];
    alist.each((i,el)=>{
      tmp.push('http://www.seoulsoop.kr/soop'+el.attribs.href.substring(2))
    })
    tmp.reverse();
    url_list = url_list.concat(tmp);
  }



  for (let i in url_list) {
    // console.log(url_list[i]);
    let url = url_list[i];
    const html = await fetch(url).then(response => response.text());
    const $ = cheerio.load(html);

    const title = $(".txt_subject").text().trim();
    const date = $(".txt_date").text();
    const clicked = $(".txt_hit").text();
    const img_list = $("#ws img");
    let imgUrl = [];
    img_list.each((k, el) => {
      imgUrl.push('http://www.seoulsoop.kr/' + el.attribs.src.substring(6));
    })
    let json = {title,date,clicked,body:[]}

    for (let j in imgUrl) {
      const imgData = await fetch(imgUrl[j]).then(response => response.arrayBuffer());
      let uuid = uuidv4();
      while (fs.existsSync('./public/image/upload2/'+uuid+'.jpg')) {
        uuid = uuidv4();
      }
      fs.writeFileSync('./public/image/upload/'+uuid+'.jpg', Buffer.from(imgData));
      json.body.push({type:'img',data:uuid+'.jpg'})
    }

    const txt_content = $(".txt_content").text();
    if (txt_content) {
      json.body.push({type:'text',data:txt_content})
    }

    fs.writeFileSync('./data/notice/'+i+'.json',JSON.stringify(json),'utf-8')



  }
  console.log(url_list.length)

};

getHtml();