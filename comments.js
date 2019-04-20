$(document).ready(function (){
  var posts;

  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(function(data) {
        for (var i = 0; i < data.length; i++) {
          // Save JSON data for formatting
          var title = data[i].title;
          var body = data[i].body;
          var id = data[i].id;
         
          // Format JSON file for HTML
          var f_title = `<h2 data-posts="title">${title}</h2>`;
          var f_body = `<p data-posts="body">${body.replace(/\n/g, "<br>")}</p>`;
          var f_id = `<button data-posts="id" value="${id}" type="button">Show comments</button>`;
         
          // Add formated tags to body
          $("body").append(`<article>${f_title}${f_body}${f_id}<section class="comments" id="comments-${id}" hidden><h3>Comments</h3></section></article>`);

        }
    });
});

(function (window) {
  $(document).on('click', ':button', function(){
    var loaded = false;
    var btnValue = this.value;
    if(!loaded){
      loaded = true;
      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${this.value}`)
      .then(res => res.json())
      .then(function(data) {
        for (var i = 0; i < data.length; i++){
          var id = data[i].id;
          var name = data[i].name;
          var email = data[i].email;
          var body = data[i].body;

          var f_body = `<p data-comments="body">${body.replace(/\n/g, "<br>")}</p>`;
          var f_name = `<address data-comments="name"><a data-comments="email" href="mailto:${email}">${name}</a></address>`;

          $(`#comments-${btnValue}`).append(`${f_body}${f_name}`);
        }
      });
    }
    $(`#comments-${btnValue}`).toggle();
  });
})(window);