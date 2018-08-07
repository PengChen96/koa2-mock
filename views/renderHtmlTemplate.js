/* global module */

/****
 * @param dom
 *    title 标题
 *    style 样式 css
 *    body  内容 html
 *    script    js
 * ****/
module.exports = (dom) => {
  if (!dom.title) {
    dom.title = '标题';
  }
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${ dom.title || '' }</title>
      ${ dom.style || '' }
    </head>
    <body>
      ${ dom.body || '' }
    </body>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    ${ dom.script || '' }
    </html>
  `;
};