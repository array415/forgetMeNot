$(document).ready(function() {
  console.log('app.js loaded!');

  $.get('/memories', function (memories) {
    memories.forEach(function(memory) {
      render(memory);
    });
  });

  $('.newMem').on('click', function(redirect){
    window.location = '/memories/new';
  });

  $('.logout').on('click', function(redirect){
    window.location = '/logout';
  });
});







function render(memory){
  console.log('rendering memories ' + memory);
  var memoryHtml = $('.memoryTemplate').html();
  var template = Handlebars.compile(memoryHtml);
  var html = template(memory);
  $('.memoryWrapper').prepend(html);
}
