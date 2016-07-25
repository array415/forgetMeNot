$(document).ready(function(){
  $('.createForm').on('submit', function(event){
    console.log('boo');
    event.preventDefault();
    $.post('/api/memories', $(this).serialize(), function(newMemory){
      window.location = '/';
    });
  });

});
