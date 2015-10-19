$(document).ready(function(){
  $('#contextMenu').hide();
  $('#taskList').hide();

  $('#add-task-button').click(function(){
    $('#contextMenu').toggle('slow');
  });


});
