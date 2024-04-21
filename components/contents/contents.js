const fs = require('fs');

exports.contents = (title,target,view) => {

  let head = (fs.readFileSync('./components/contents/head.html', 'utf-8') + "");
  let content = (fs.readFileSync('./components/contents/content.html', 'utf-8') + "").split("<!---->");
  let json = JSON.parse(fs.readFileSync('./components/header/header.json', 'utf-8'));
  let list="";
    for (let j in json[title].menu) {
      if (j==target) {
        list+=`<li class='active'>`
      } else {
        list+=`<li>`
      }
      list+=`
      <a href="${json[title].menu[j]}">${j}</a>
    </li>
    `;
    }
  let main
  if (view) {
    main = (fs.readFileSync('./components/contents/viewer.html', 'utf-8') + "");
    if (!target) {
      target = title;
    }
  } else {
    if (target) {
      main = (fs.readFileSync('./components/contents'+json[title].menu[target]+'.html', 'utf-8') + "");
    } else {
      target = title;
      main = (fs.readFileSync('./components/contents'+json[title].href+'.html', 'utf-8') + "");
    }
  }

  return ([head,content[0],title,content[1],list,content[2],target,content[3],main,content[4]].join('\n'));
}