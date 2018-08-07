/* global require */
/* global module */

const render = require('./renderHtmlTemplate.js');

module.exports = (obj) => {
  const body = `
    <div class="red" onclick="tap()">
      ${obj.name}
    </div>
  `;

  const script = `
    <script>
      function tap() {
        $.ajax({
          url: "/api/post/index",
          type: 'post',
          success: function(result){
            console.log(result);
          }
        });
      }
    </script>
  `;

  const style = `
    <style>
      .red {
        color: red;
      }
    </style>
  `;

  const template = {
    title: '首页',
    style,
    body,
    script,
  };
  return render(template);
};