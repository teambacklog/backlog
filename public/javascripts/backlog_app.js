$(document).ready(function(){
  $('#contextMenu').hide();
  $('#taskList').hide();

  $('#add-task-button').click(function(){
    $('#contextMenu').toggle('slow');
  });

  $('#switchBox').click(function() {
    var $this = $(this);
    // $this will contain a reference to the checkbox
    if ($this.is(':checked')) {
        // the checkbox was checked
        $('#taskList').show('slow');

    } else {
        // the checkbox was unchecked
        $('#taskList').hide('slow');
    }
});
});
