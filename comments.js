$(document).ready(function (){
  var posts;

  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(function(data) {
        for (var i = 0; i < data.length; i++) {
          var title = data[i].title;
          var body = data[i].body;
          var id = data[i].id;
         
          var f_title = `<h2 data-posts="title">${title}</h2>`;
          var f_body = `<p data-posts="body">${body}</p>`;
          var f_id = `<button data-posts="id" value="${id}" type="button">Show comments</button>`;
         
          $("body").append("<article>");
          $("body").append(f_title);
          $("body").append(f_body);
          $("body").append(f_id);
          $("body").append(`<section class="comments" id="comments-${id}" hidden><h3>Comments</h3></section></article>`);
          $("body").append("</article>");

        }
    });
});

(function (window) {
  'use strict';

  const BUTTON_SELECTOR = '[data-posts="id"]';

  let buttons = document.querySelectorAll(BUTTON_SELECTOR);

  buttons.forEach(function (button) {
    'use strict';

    let sectionSelector = `#comments-${button.value}`;
    let commentSection = document.querySelector(sectionSelector);

    button.addEventListener('click', function (event) {
      if (commentSection.hidden) {
        commentSection.hidden = false;
        button.textContent = 'Hide comments';
      } else {
        commentSection.hidden = true;
        button.textContent = 'Show comments';
      }

      event.preventDefault();
    });
  });
})(window);
