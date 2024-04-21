const fs = require('fs');


exports.footlink = () => {

  let html = (fs.readFileSync('./components/footlink/footlink.html', 'utf-8') + "").split("<!---->");

  let json = JSON.parse(fs.readFileSync('./components/footlink/footlink.json', 'utf-8'));
  let shotcut = Object.keys(json);
  let result = shotcut.map((p, i) => {
    let rs = `<li>
          <a href="${json[p].href}">
          <img src="${json[p].image}" alt="${p}"> 
          ${p}
          </a>
          </li>`;
    return rs;
  }).join('\n');
  return (html[0].concat(result).concat(html[1]));

}