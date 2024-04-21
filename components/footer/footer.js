const fs = require('fs');

exports.footer = () => {

  let json = JSON.parse(fs.readFileSync('./components/footer/footer.json', 'utf-8'));
  let result = Object.keys(json).map(p => `<span>
      <strong>${p}</strong>
      ${json[p]}</span>`).join(' |\n');
  return (`<div class="container">
        <div id="address">
          ${result}
        </div>
        <div id="copyright">
          <div>Copyrightⓒ 2016 서울숲요양원. All rights reserved. Powered by seoulsoop.kr</div>
        </div>
      </div>`);
}