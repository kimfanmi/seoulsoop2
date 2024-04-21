const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const url1 = 'http://www.seoulsoop.kr/soop/n/act_gall.html?pn='
const url2 = '&map_en=0&c=&t=2&p=12&idx=&s=630&sch_word=&k=3#0';

const cheerio = require("cheerio");
const fs = require('fs');

const getHtml = async () => {

  let url_list = [];
  for (let i = 25; i > 0; i--) {
    const html = await fetch(url1 + i + url2).then(response => response.text());
    const $ = cheerio.load(html);

    const alist = $(".box_gallery a");
    let tmp = [];
    alist.each((i, el) => {
      tmp.push('http://www.seoulsoop.kr/soop' + el.attribs.href.substring(2))
    });
    tmp.reverse();
    url_list = url_list.concat(tmp);
  }


  console.log(url_list)
  fs.writeFileSync('./data/crawl_url_list.txt', JSON.stringify(url_list), 'utf-8');
};

getHtml();