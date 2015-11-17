Meteor.subscribe('tasks');

Meteor.startup( function start() {
});

// allows addTask.html to add tasks
Template.addTaskDisplay.events({
  // submit information for new row
  /*'click #submit-new-task'*/'submit form': function addTask(event, template) {
    event.preventDefault();

    const name = template.find('[name="name"]').value;

    const priorityField = template.find('[name="priority"]');
    const priority = priorityField.options[priorityField.selectedIndex].text;

    const date = template.find('[name="date"]').value;
    const time = template.find('[name="est"]').value;

    Meteor.call('addTask', name, priority, date, time, null);

    template.find('[name="name"]').value = "";
    template.find('[name="date"]').value = "";
    template.find('[name="est"]').value = "";

    $('#addTaskModal').hide('slow');
  },
  'click #remove-new-task': function shrinkContextMenu(event) {
    event.preventDefault();
    $("#addTaskForm").data('validator').resetForm();
    $('#addTaskModal').hide('slow');
  },
  'change #slider': function moveSlider(event) {
    event.preventDefault();
    $('#amount').val('$' + $('#slider').slider('value'));
  },
});

Template.addTaskDisplay.onRendered(function renderAddTaskMenu() {
  $('#datepicker').datepicker({
    minDate: 0,
    maxDate: +100,
  });

  $( '#slider').slider({
    range: 'min',
    value: 15,
    min: 15,
    max: 300,
    step: 15,
    slide: function sliderValue(event, ui) {
      $('#task_est_time').val( ui.value );
    },
  });

  $('#addTaskForm').validate({
    rules: {
      name: {required: true,},
      priority: {required: true,},
      date: {required: true,},
      est: {required: true,},
    },
    messages: {
      name: '*Task Name required',
      priority: '*Assign a priority',
      date: '*Deadline required',
      est: '*Give the estimated length of the task',
    },
  });
});

// Row of task list
Template.taskInfo.events({
  // Click delete task
  'click #delete-task': function deleteTask() {
    Meteor.call('deleteTask', this._id);
  },
});

// Find tasks specific to this user
Template.taskList.helpers({
  tasks: function getTasks() {
    return Tasks.find();
  },
});

Template.taskList.onRendered( function taskListOnDisplay() {
  $('.scroll').slimScroll({
    height: '250px',
  });
});

// Find tasks specific to this user
Template.taskSummary.helpers({
  taskCount: function getTaskCounts() {
    return Tasks.find().count();
  },
  earliestDue: function getEarliestDue() {
    const dueDate =
      Tasks.findOne({}, { sort: { 'task.deadline': 1 }}).task.deadline;
    return Math.ceil((dueDate - Date.now()) / 86400000);
  },
  workLoad: function getWorkLoad() {
    let total = 0;
    Tasks.find().map(function sumTimes(item) {
      total += item.task.estTime;
    });
    return total / 60;
  },
});

Template.userBoard.events({
  'change #switchBox': function toggleSummary(event) {
    event.preventDefault();
    Session.set('displayTaskSummary', !Session.get('displayTaskSummary'));
  },
  'click #add-task-button': function showContextMenu() {
    $('#addTaskModal').show('slow');
  },
});

Template.userBoard.onRendered(function renderFrontPage() {
  Session.set('displayTaskSummary', true);
  $('[name="addTaskDisplay"]').hide();
  $('#taskList').hide();
  $('.modal-trigger').leanModal();
});

// Global function
Template.registerHelper('displayTaskSummary', function displayTaskSummary() {
  return Session.get('displayTaskSummary');
});
