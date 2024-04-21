const fs = require('fs');


exports.index_carousel = () => {
  const html = (fs.readFileSync('./components/index_carousel/index_carousel.html', 'utf-8') + "").split("<!---->");
  const html2 = html[2].split("//");
  const carousel = fs.readFileSync('./components/index_carousel/carousel.js', 'utf-8');
  const arrow = fs.readFileSync('./components/index_carousel/arrow.js', 'utf-8');
  const json = JSON.parse(fs.readFileSync('./components/index_carousel/index_carousel.json', 'utf-8'));
  let data = json.data.map(p=>{
    return `<div class="carousel_item" style="
        background-image: url(${p.image}); background-size:auto 100%;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        ">
        <div style="
        color: #AE8D6F;
        font-size: 27px;
        font-weight: bold;
        position: absolute;
        top: 160px;
        right: 65%;
        ">${p.text}</div>
      </div>
    `;
  }).join('');
  let data2 = json.data.map((p,i)=>{
    if (i==0) {
      return `<div class="carousel_icon item0 active"></div>`
    } else {
      return `<div class="carousel_icon item${i}"></div>`
    }
  }).join('\n');

  return html[0].concat(data).concat(html[1]).concat(data2).concat(html2[0]).concat(carousel).concat(html2[1]).concat(arrow).concat(html2[2]);
}