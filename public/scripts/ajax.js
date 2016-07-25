$(document).ready(function(){


  $('.createForm').on('submit', function(event){
    event.preventDefault();
    $.post('/api/memories', $(this).serialize(), function(newMemory){
      redirect();
    });
  });

  $('.signUp').on('submit', function(event){
    event.preventDefault();
    $.post('/api/users', $(this).serialize(), function(newUser){
      redirect();
    });
  });

  $('.signIn').on('submit', function(event){
    event.preventDefault();
    $.post('/api/users', $(this).serialize(), function(newUser){
      redirect();
    });
  });
  
  function redirect(){
    window.location = '/';
  }

});
