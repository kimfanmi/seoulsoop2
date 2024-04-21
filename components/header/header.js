const fs = require('fs');


exports.header = () => {

  let html = (fs.readFileSync('./components/header/header.html', 'utf-8') + "").split("<!---->");

  let json = JSON.parse(fs.readFileSync('./components/header/header.json', 'utf-8'));
  let menu = Object.keys(json);
  let result = menu.map((p, i) => {
    let rs = `<li class="nav_item menu${i + 1}">
          <a href="${json[p].href}">${p}</a>`;
    if (json[p].menu) {
      rs += `\n<ul>`;
      rs += Object.keys(json[p].menu).map((q, j) => `\n<li>
              <a href="${json[p].menu[q]}">${q}</a>
            </li>\n`).join('');
      rs += `</ul>\n`;
    }
    rs += `</li>`;
    return rs;
  }).join('\n');
  return (html[0].concat(result).concat(html[1]));

}