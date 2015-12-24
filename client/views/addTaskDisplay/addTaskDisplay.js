Template.addTaskDisplay.onRendered(
  // Set the 'datepicker' and 'slider' elements
  function Client$addTaskDisplay$renderContextMenu() {
    $('.modal-trigger').leanModal();

    // limits the range of dates to 100 days later
    $('#datepicker').datepicker({
      minDate: 0,
      maxDate: +100,
    });

    // the slider for estimed time: begins at 15 minutes, ends at 300 minutes,
    //  with increments of 15
    $( '#slider').slider({
      range: 'min',
      value: 15,
      min: 15,
      max: 300,
      step: 15,
      slide: function Client$addTaskDisplay$sliderValue(event, ui) {
        $('#task-est-time').val( ui.value );
      },
    });

    // Form validation using jQuery validation for add task form
    $('#addTaskForm').validate({
      rules: {
        name: {
          required: true,
        },
        priority: {
          required: true,
        },
        date: {
          required: true,
        },
        est: {
          required: true,
        },
      },
      messages: {
        name: '*Task Name required',
        priority: '*Assign a priority',
        date: '*Deadline required',
        est: '*Give the estimated length of the task',
      },
    });
  }
);

// Listeners for events in addTaskDisplay
Template.addTaskDisplay.events({
  // submit information for new row
  'submit #addTaskForm': function Client$addTaskDisplay$addTask(event, template) {
    event.preventDefault();
    const name = template.find('[name="name"]').value;

    const priorityField = template.find('[name="priority"]');
    const priority = priorityField.options[priorityField.selectedIndex].text;

    const date = template.find('[name="date"]').value;
    const time = template.find('[name="est"]').value;
    const taskDetails = template.find('[name="task-details"]').value;

    // add the task to the server
    Meteor.call('addTask', name, priority, date, time, taskDetails);

    // Resets the fields
    template.find('[name="name"]').value = '';
    template.find('[name="date"]').value = '';
    template.find('[name="est"]').value = '';

    // Hide the display
    $('#addTaskModal').closeModal('slow');
  },
  // Hide add task modal
  'click #remove-new-task':
    function Client$addTaskDisplay$hideAddTaskModal(event) {
      event.preventDefault();
      $('#addTaskForm').data('validator').resetForm();
      $('#addTaskModal').closeModal('slow');
    },
  // Update slider value as it changes
  'change #slider': function Client$addTaskDisplay$moveSlider(event) {
    event.preventDefault();
    $('#amount').val('$' + $('#slider').slider('value'));
  },
});
