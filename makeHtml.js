


exports.makeHTML = (css,body) => {
  return `<!DOCTYPE html>
  <html lang="kr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>서울숲요양원</title>
    <meta name="title" content="서울숲요양원">
    <meta property="og:title" content="서울숲요양원">
    <link rel="icon" href="data:,">
    ${css}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500&display=swap" rel="stylesheet">
  </head>
  <body>
    <div class='wrap'>
      ${body.join('\n')}
    </div>
  </body>
  </html>`;
}