Meteor.subscribe('tasks');

Meteor.startup( function start() {
  Session.set('displayTaskSummary', true);
  Session.set('addError', false);
});

// allows addTask.html to add tasks
Template.addTaskDisplay.events({
  // submit information for new row
  'click #submit-new-task': function addTask(event, template) {
    event.preventDefault();
    Session.set('addError', false);

    const name = template.find('[name="name"]').value;

    const priorityField = template.find('[name="priority"]');
    const priority = priorityField.options[priorityField.selectedIndex].text;

    const date = template.find('[name="date"]').value;
    const time = template.find('[name="est"]').value;

    if (name === '' || priority.localeCompare('Choose your priority') === 0
      || date === null || time === '') {
      Session.set('addError', true);
    } else {
      Meteor.call('addTask', name, priority, date, time, null);
    }

    $('#addTaskModal').hide('slow');
  },
  'click #remove-new-task': function shrinkContextMenu(event) {
    event.preventDefault();
    $('#addTaskModal').hide('slow');
  },
  'change #slider': function moveSlider(event) {
    event.preventDefault();
    $('#amount').val('$' + $('#slider').slider('value'));
  },
});

Template.addTaskDisplay.onRendered(function renderContextMenu() {
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
    Session.set('addError', false);
    Session.set('displayTaskSummary', !Session.get('displayTaskSummary'));
  },
  'click #add-task-button': function showContextMenu() {
    $('#addTaskModal').show('slow');
  },
});

Template.userBoard.onRendered(function renderFrontPage() {
  $('[name="addTaskDisplay"]').hide();
  $('#taskList').hide();
  $('.modal-trigger').leanModal();
});

// Global function
Template.registerHelper('displayTaskSummary', function displayTaskSummary() {
  return Session.get('displayTaskSummary');
});
Template.registerHelper('addError', function addError() {
  return Session.get('addError');
});
