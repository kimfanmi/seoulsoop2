const fs = require('fs');

exports.index_content = () => {
  return fs.readFileSync('./components/index_content/index_content.html');
}