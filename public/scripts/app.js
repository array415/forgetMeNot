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

  $('.memoryWrapper').on('click', '.delete', function(deleted){
    $.ajax({
      method: 'DELETE',
      url: '/api/memories/' + $(this).attr('data-id'),
      success: deleteSuccess,
      error: function(err){
        console.log("no" + err);
      }
    });

  });


  $('.newMem').on('click', function(event){
    window.location = '/create';
  });

  $('.logout').on('click', function(event){
    window.location = '/logout';
  });

  $('.memoryWrapper').on('click', '.edit', function(event){
    console.log('THIS BUTTON WORKS');
  });


  function deleteSuccess(data){
    for(var i = 0; i < allMemories.length; i++){
      if(allMemories[i]._id === data._id) {
        allMemories.splice(i, 1);
        break;
      }
    }
    render();
  }

  function render(memory){
    $('.memoryWrapper').empty();
    var html = template({memory: allMemories});
    $('.memoryWrapper').prepend(html);
  }

});
