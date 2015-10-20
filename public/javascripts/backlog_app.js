$(document).ready(function start() {
  $('#contextMenu').hide();
  $('#taskList').hide();

  $('#add-task-button').click(function toggleContextMenu() {
    $('#contextMenu').toggle('slow');
  });

  $('#switchBox').click(function switchTaskDisplay() {
    const $this = $(this);
    // $this will contain a reference to the checkbox
    if ($this.is(':checked')) {
      // the checkbox was checked
      $('#taskList').show('slow');
      $('#taskSummaryBoard').hide('slow');
    } else {
      // the checkbox was unchecked
      $('#taskList').hide('slow');
      $('#taskSummaryBoard').show('slow');
    }
  });

  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year
  });

  $('input#input_text, textarea#textarea1').characterCounter();

  $('select').material_select();
});
