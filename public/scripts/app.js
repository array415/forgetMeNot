var allMemories = [];
var template;



$(document).ready(function() {
  console.log('app.js loaded!');

  var memoryHtml = $('.memoryTemplate').html();
  template = Handlebars.compile(memoryHtml);

  $.get('/api/memories', function (memories) {
    allMemories = memories;
    render();
  });
  $('.memoryWrapper').on('click', '.deleteBtn', function(deleted){
    $.ajax({
      method: 'DELETE',
      url: '/api/memories/' + $(this).attr('data-id'),
      success: deleteSuccess,
      error: function(err){
        console.log("no" + err);
      }
    });
  });


  $('.newMem').on('click', function(redirect){
    window.location = '/memories/new';
  });

  $('.logout').on('click', function(redirect){
    window.location = '/logout';
  });

  function deleteSuccess(data){
    console.log('deleted ' + JSON.stringify(data.memory));
    window.location = '/';
  }

});





function render(memory){

  var html = template({memory: allMemories});
  $('.memoryWrapper').prepend(html);
}
