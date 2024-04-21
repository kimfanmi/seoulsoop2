const fs = require('fs');

exports.index_carousel2 = () => {
  return fs.readFileSync('./components/index_carousel2/index_carousel2.html');
}