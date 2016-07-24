$(document).ready(function() {
  console.log('app.js loaded!');

  $.get('/memories', function (memories) {
    memories.forEach(function(memory) {
      render(memory);
    });
  });

 $('.memoryWrapper').on('click', '.deleteBtn', function(deleted){
   $.ajax({
     method: 'DELETE',
     url: '/memories/' + $(this).attr('data-id'),
     success: deleteSuccess,
     error: function(x){
       console.log("no" + x);
     }
   });
 });


 $('.memoryWrapper').on('click', '.showBtn', function(e){
   $.get('/memories/' + $(this).attr('data-id'), function(memory){
     console.log(memory);
     render(memory);
   });

 });
 $('.newMem').on('click', function(redirect){
    window.location = '/memories/new';
  });

 $('.logout').on('click', function(redirect){
    window.location = '/logout';
  });

  $('.signInWrapper').on('click', '.singUp',  function(event){
    event.preventDefault();
    window.location = '/signup';
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
