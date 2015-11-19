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

    //the validation code which is messy,
    //i'll fix this later
    var validated = true;
    var msg = "";
    if (name == "") {
      msg += "The task name cannot be empty.\n";
      validated = false;
    }

    if (priority == "Choose your priority") {
      msg += "The priority must be chosen.\n";
      validated = false;
    }

    console.log(date);
    if (date == "") {
      msg += "The date must be specified.\n";
      validated = false;
    } else {
      console.log("fuck");
      var curDate = new Date();
      var inDate = new Date(date);
      if (curDate >= inDate) {
        msg += "The date must be later than today.\n";
        validated = false;
      }
    }

    if (time == "") {
      msg += "The time must be estimated.\n";
      validated = false;
    }
    if (!validated) {
      alert(msg);
      return;
    }

    //end of validation code

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
  //the slider for estimed time
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
    Session.set('timeToSpent', 15);
    Session.set('gettingTask', true);
  },
  'click #thirty-min-opt': function addThirtyMinutes() {
    Session.set('timeToSpent', 30);
    Session.set('gettingTask', true);
  },
  'click #one-hour-opt': function addOneHour() {
    Session.set('timeToSpent', 60);
    Session.set('gettingTask', true);
  },
});

Template.receiveTask.events({
  'click #did-not-work-on': function returnToUserBoard() {
    Session.set('gettingTask', false);
  },
  'click #spent-time-to-spent': function client$spentTime() {
    var timeToSpent = Session.get('timeToSpent');
    var workingOnTask = TaskScheduler.taskToWorkGivenTime(timeToSpent);
    workingOnTask.updateTimeSpent(timeToSpent+workingOnTask.timeSpent);
  },
});

Template.receiveTask.helpers({
  getSchedulerTask: function client$receiveTask$getSchedulerTask() {
    var timeToSpent = Session.get('timeToSpent');
    return [TaskScheduler.taskToWorkGivenTime(timeToSpent)];
  },
});

// Get a list of task that belong to this user
// (server only publish user specific task collection)
Template.taskList.helpers({
  tasks: function getTasks() {
    return Tasks.find({}, { sort: { 'task._deadline': 1 } });
  },
});

Template.taskList.onRendered(function taskListOnDisplay() {
  $('.scroll').slimScroll({
    height: '250px',
  });
});

// Functions relating to a specific row in task list
Template.taskInfo.events({
  // Add time spent working on a test
  'click .add-time-spent': function addTimeSpent() {
    var task = Tasks.findOne(this._id);
    task.updateTimeSpent(task.timeSpent + 15);
  },
  // Add to the estimated time remaining
  'click .add-time-est': function addTimeEst() {
    var task = Tasks.findOne(this._id);
    task.updateEstTime(task.estTime + 15);
  },
  // Delete button of task
  'click .delete-task': function deleteTask() {
    Meteor.call('deleteTask', this._id);
  },
  'click .complete-task': function completeTask() {
    var task = Tasks.findOne(this._id);
    task.updateTimeSpent(task.estTime);
  },
  'contextmenu .date': function client$taskList$taskInfo$dbclickDate() {
    var task = Tasks.findOne(this._id);
    task.updateTaskName('test right click date');
  },
  'dblclick .priority': function client$taskList$taskInfo$dbclickPriority() {
    var task = Tasks.findOne(this._id);
    task.updateTaskName('test db click priority');
  },
  'input .task-name': _.debounce(function client$taskInfo$inputTaskName(e) {
    var task = Tasks.findOne(this._id);
    task.updateTaskName($(e.target).text());
    $(e.target).text('');
  }, 750, false),
  'input .est-time': _.debounce(function client$taskInfo$inputEstTime(e) {
    var task = Tasks.findOne(this._id);
    task.updateEstTime($(e.target).text());
    $(e.target).text('');
  }, 750, false),
  'input .time-spent': _.debounce(function client$taskInfo$inputTimeSpent(e) {
    var task = Tasks.findOne(this._id);
    task.updateTimeSpent($(e.target).text());
    $(e.target).text('');
  }, 750, false),
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

    let allTasks = Tasks.find({}, { sort: { 'task._deadline': 1 } }).fetch();
    if (allTasks.length === 0) {
      return 0;
    }
    let earliestTask = allTasks[0];
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

// Color tasks in task list
Template.taskInfo.helpers({
  taskStyle: function client$taskStyle(task) {
    if (task.timeRemaining <= 0) {
      return 'complete';
    } else if (task.deadline < new Date()) {
      return 'overdue';
    }
    return '';
  },
});

Template.registerHelper('gettingTask', function timeSpentCompZero() {
  return Session.get('gettingTask');
});

Template.registerHelper('timeToSpent', function timeSpentSession() {
  return Session.get('timeToSpent');
});

