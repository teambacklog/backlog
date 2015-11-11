Meteor.subscribe('tasks');

Meteor.startup( function start() {
  Session.set('displayTaskSummary', true);
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

    Meteor.call('addTask', name, priority, date, time, null);
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

// Get a list of task that belong to this user
// (server only publish user specific task collection)
Template.taskList.helpers({
  tasks: function getTasks() {
    return Tasks.find();
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

// Find tasks specific to this user
Template.taskSummary.helpers({
  taskCount: function getTaskCounts() {
    return Tasks.find().count();
  },
  earliestDue: function getEarliestDue() {
    let dueDate = Tasks.findOne({},
                                { sort: {'task.deadline': 1 }}).task.deadline;
    // TODO: Replace magic number w/ const?
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
    $('#addTaskForm').trigger("reset");
    $('#addTaskModal').openModal();
  },
});

Template.userBoard.onRendered(function renderFrontPage() {
  console.log("fuck off.");
  $('[name="addTaskDisplay"]').hide();
  $('#taskList').hide();
  $('.modal-trigger').leanModal();
});

// Global function
Template.registerHelper('displayTaskSummary', function displayTaskSummary() {
  return Session.get('displayTaskSummary');
});

// Style overdue tasks in task list
Template.taskInfo.helpers({
  taskStyle: function taskStyle(task) {
    if (task.deadline < new Date()) {
      return "background-color:tomato;font-weight:bold"
    } else {
      return ""
    }
  },
});
