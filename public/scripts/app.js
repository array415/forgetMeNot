var allMemories = [];
var template;



$(document).ready(function() {
  console.log('app.js loaded!');

  var memoryHtml = $('.memoryTemplate').html();
  template = Handlebars.compile(memoryHtml);

  $.get('/api/memories', function (memories) {
    // What if there is an error getting all memories?
    // Build in some frontend error handling so the user knows if something went wrong
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
    // Remove this button and its event handler (or comment them out) if the edit route isn't completed
    // Or, you could include a comment noting that this feature isn't built out yet
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
    // You might want to consider building the template to accept memories one-by-one instead of using Handlebars each
    // That way, you won't have to re-render all memories each time that one is added or deleted
    $('.memoryWrapper').empty();
    var html = template({memory: allMemories});
    $('.memoryWrapper').prepend(html);
  }

});
