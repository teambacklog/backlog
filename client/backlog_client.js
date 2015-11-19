Meteor.subscribe('tasks');

Meteor.startup( function start() {

});

// Allows addTask.html to add tasks
Template.addTaskDisplay.events({
  // Submit information for new task
  'click #submit-new-task': function addTask(event, template) {
    event.preventDefault();
    const name = template.find('[name="name"]').value;

    const priorityField = template.find('[name="priority"]');
    const priority = priorityField.options[priorityField.selectedIndex].text;

    const date = template.find('[name="date"]').value;
    const time = template.find('[name="est"]').value;

    Meteor.call('addTask', name, priority, date, time, "Hello this is hard assignment");
    $('#addTaskModal').hide('slow');
  },
  // Hide add task modal
  'click #remove-new-task': function hideAddTaskModal(event) {
    event.preventDefault();
    $('#addTaskModal').hide('slow');
  },
  // Update slider value as it changes
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

  $('#slider').slider({
    range: 'min',
    value: 15,
    min: 15,
    max: 300,
    step: 15,
    slide: function updateSlider(event, ui) {
      $('#task_est_time').val(ui.value);
    },
  });
});


Template.timeSlotBoard.events({
  'click #fifteen-min-opt': function addFifteenMinutes() {
    if( Tasks.find().count() <= 0){
      return;
    }
    let earliestTask = Tasks.findOne({}, { sort: { deadline: -1 }});
    console.log(earliestTask);
    Session.set('timeSpent', 15);
    Session.set('currTask', earliestTask);
  },
  'click #thirty-min-opt': function addThirtyMinutes() {
    if( Tasks.find().count() <= 0){
      return;
    }
    let earliestTask = Tasks.findOne({}, { sort: { deadline: -1 }});

    Session.set('timeSpent', 30);
    Session.set('currTask', earliestTask);
  },
  'click #one-hour-opt': function addOneHour() {
    if( Tasks.find().count() <= 0){
      return;
    }
    let earliestTask = Tasks.findOne({}, { sort: { deadline: -1 }});

    Session.set('timeSpent',60);
    Session.set('currTask', earliestTask);
  },
});

Template.receiveTask.events({
  'click #return-to-userBoard': function returnToUserBoard() {
    Meteor.call('timeSpent',  Session.get('currTask'), Session.get('timeSpent'));
    Session.set('timeSpent', 0);
    Session.set('displayUserSummary', false);
  },
});

// Get a list of task that belong to this user
// (server only publish user specific task collection)
Template.taskList.helpers({
  tasks: function getTasks() {
    return Tasks.find({}, { sort: { _deadline: -1 }});
  },
});

Template.taskList.onRendered(function taskListOnDisplay() {
  $('.scroll').slimScroll({
    height: '250px',
  });
});

// Functions relating to a specific row in task list
Template.taskInfo.events({
  // Delete button of task
  'click #delete-task': function deleteTask() {
    Meteor.call('deleteTask', this._id);
  },
  'click #complete-task': function completeTask() {
    Meteor.call('submitTime', this._id, 0);
  },
});

// Style overdue tasks in task list
Template.taskInfo.helpers({
  taskStyle: function client$taskStyle(task) {
    if (task.deadline < new Date()) {
      return 'overdue';
    }
    return '';
  },
});

// Find tasks specific to this user
Template.taskSummary.helpers({
  taskCount: function getTaskCounts() {
    return Tasks.find().count();
  },
  earliestDue: function getEarliestDue() {
    const MILLI_SEC_PER_DAY = 86400000;
    let earliestTask = Tasks.findOne({}, { sort: { _deadline: -1 }});
    if (typeof earliestTask === 'undefined') {
      return 0;
    }
    return Math.ceil((earliestTask.deadline - Date.now()) / MILLI_SEC_PER_DAY);
  },
  workLoad: function getWorkLoad() {
    let total = 0;
    Tasks.find().map(function sumTimes(item) {
      total += item.estTime;
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
    $('#addTaskForm').trigger('reset');
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

Template.registerHelper('timeSpent', function timeSpentSession() {
  return Session.get('timeSpent');
});
Template.registerHelper('timeSpentCompZero', function timeSpentCompZero() {
  return Session.get('timeSpent') > 0;
});
Template.registerHelper('currTask', function currentTask() {
  return new Task(Session.get('currTask'));
});

// For debugging purposes only; tests Handlebars
Template.registerHelper('log', function client$template$log(something) {
  console.log(something);
});
