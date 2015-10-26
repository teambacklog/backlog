
$(window).load(function() {

  $('#contextMenu').hide();
  $('#taskList').hide();
  $('.scroll').slimScroll({
        height: '250px'
    });

  $('#add-task-button').click(function toggleContextMenu() {
    $('#contextMenu').toggle('slow');
  });
  $("#datepicker").datepicker();

  $( "#slider" ).slider({
      range: "min",
      value: 15,
      min: 15,
      max: 300,
      step: 15,
      slide: function( event, ui ) {
        $( "#task_est_time" ).val( ui.value );
      }
  });

  $( "#amount" ).val( "$" + $( "#slider" ).slider( "value" ));

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

  $('#remove-new-task').click(function() {
    $('#contextMenu').hide();
  });


  $(".modal-trigger").leanModal();

  // $('.datepicker').pickadate({
  //   selectMonths: true, // Creates a dropdown to control month
  //   selectYears: 15, // Creates a dropdown of 15 years to control year
  // });

  // $('input#input_text, textarea#textarea1').characterCounter();

  // $('select').material_select();
  // $('.modal-trigger').leanModal({
  //     dismissible: true, // Modal can be dismissed by clicking outside of the modal
  //     opacity: .5, // Opacity of modal background
  //     in_duration: 300, // Transition in duration
  //     out_duration: 200, // Transition out duration
  //     ready: function() { alert('Ready'); }, // Callback for Modal open
  //     complete: function() { alert('Closed'); } // Callback for Modal close
  //   }
  // );
});
