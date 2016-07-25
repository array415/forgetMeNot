$(document).ready(function() {
  console.log('app.js loaded!');

  $.get('/api/memories', function (memories) {
    memories.forEach(function(memory) {
      render(memory);
    });
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


 $('.memoryWrapper').on('click', '.editBtn', function(e){
    $(this).data();
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
  var memoryHtml = $('.memoryTemplate').html();
  var template = Handlebars.compile(memoryHtml);
  var html = template(memory);
  $('.memoryWrapper').prepend(html);
}
