Meteor.subscribe('tasks');

Meteor.startup( function Client$Meteor$start() {
  Session.set('displayTaskSummary', true);
});

// when 'addTaskDisplay' is rendered, set the 'datepicker' and 'slider' elements
Template.addTaskDisplay.onRendered(function Client$addTaskDisplay$renderContextMenu() {
  // limits the range of dates to 100 days later
  $('#datepicker').datepicker({
    minDate: 0,
    maxDate: +100,
  });

  // the slider for estimed time: begins at 15, ends at 300, increments by 15
  $('#slider').slider({
    range: 'min',
    value: 15,
    min: 15,
    max: 300,
    step: 15,
    slide: function Client$slider$updateSlider(event, ui) {
      $('#task-est-time').val(ui.value);
    },
  });
});

// Allows addTask.html to add tasks
Template.addTaskDisplay.events({
  // Submit information for new task
  'click #submit-new-task': function Client$addTaskDisplay$addTask(event, template) {
    event.preventDefault();

    // retrieve information from addTaskDisplay's fields
    const name = template.find('[name="name"]').value;

    const priorityField = template.find('[name="priority"]');
    const priority = priorityField.options[priorityField.selectedIndex].text;

    const date = template.find('[name="date"]').value;
    const time = template.find('[name="est"]').value;

    const taskDetails = template.find('[name="task-details"]').value;

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

    // add the task to the server 
    Meteor.call('addTask', name, priority, date, time, taskDetails);

    // hide the modal
    $('#addTaskModal').hide('slow');
  },
  // Hide add task modal
  'click #remove-new-task': function Client$addTaskDisplay$hideAddTaskModal(event) {
    event.preventDefault();
    $('#addTaskModal').hide('slow');
  },
  // Update slider value as it changes
  'change #slider': function Client$addTaskDisplay$moveSlider(event) {
    event.preventDefault();
    $('#amount').val('$' + $('#slider').slider('value'));
  },
});

// these is for the buttons that retrieve the highest sorted task to work on:
//   only in 15-minute, 30-minute, 1-hour increments
Template.timeSlotBoard.events({
  'click #fifteen-min-opt': function Client$timeSlotBoard$addFifteenMinutes() {
    Meteor.call('timeSpent', 15);
  },
  'click #thirty-min-opt': function Client$timeSlotBoard$addThirtyMinutes() {
    Meteor.call('timeSpent', 30);
  },
  'click #one-hour-opt': function Client$timeSlotBoard$addOneHour() {
    Meteor.call('timeSpent', 60);
  },
});

// when 'taskList' is rendered, allow the table to be scrolled through
Template.taskList.onRendered(function Client$taskList$taskListOnDisplay() {
  $('.scroll').slimScroll({
    height: '250px',
  });
});

// Get a list of task that belong to this user:
//   sorts by earliest deadline
Template.taskList.helpers({
  tasks: function Client$taskList$getTasks() {
    return Tasks.find({}, { sort: { 'task._deadline': 1 } });
  },
});

// Style overdue tasks in task list
Template.taskInfo.helpers({
  taskStyle: function Client$taskStyle(task) {
    if (task.deadline < new Date()) {
      return 'overdue';
    }
    return '';
  },
});

// Functions relating to a specific row in task list
Template.taskInfo.events({
  // Delete button of task
  'click #delete-task': function Client$taskList$taskInfo$deleteTask() {
    Meteor.call('deleteTask', this._id);
  },
  // 
  'click #complete-task': function Client$taskList$taskInfo$completeTask() {
    Meteor.call('submitTime', this._id, 0);
  },
});

// 'taskSummary' has a number of metrics to aggregate info on the tasks
Template.taskSummary.helpers({
  // returns the number of tasks
  taskCount: function Client$taskSummary$getTaskCounts() {
    return Tasks.find().count();
  },
  // retrieves the earliest due date
  earliestDue: function Client$taskSummary$getEarliestDue() {
    const MILLI_SEC_PER_DAY = 86400000;

    let allTasks = Tasks.find({}, { sort: { 'task._deadline': 1 } }).fetch();
    if (allTasks.length === 0) {
      return 0;
    }
    let earliestTask = allTasks[0];
    return Math.ceil((earliestTask.deadline - Date.now()) / MILLI_SEC_PER_DAY);
  },
  // returns the amount of work across all tasks in hours
  workLoad: function Client$taskSummary$getWorkLoad() {
    let total = 0;
    Tasks.find().map(function sumTimes(item) {
      total += item.estTime;
    });
    return total / 60;
  },
});

// 
Template.userBoard.onRendered(function Client$userBoard$renderFrontPage() {
  $('[name="addTaskDisplay"]').hide();
  $('#taskList').hide();
  // sets up the code for 'addTaskDisplay'
  $('.modal-trigger').leanModal();
});

Template.userBoard.events({
  // allows switching between 'taskSummary' and 'taskList'
  'change #switchBox': function Client$userBoard$toggleSummary(event) {
    event.preventDefault();
    Session.set('displayTaskSummary', !Session.get('displayTaskSummary'));
  },
  // 
  'click #add-task-button': function Client$userBoard$showContextMenu() {
    $('#add-task-form').trigger('reset');
  },
});

// Global function: returns the session variable 'displayTaskSummary'
Template.registerHelper('displayTaskSummary', function Client$template$displayTaskSummary() {
  return Session.get('displayTaskSummary');
});

// For debugging purposes only
Template.registerHelper('log', function Client$template$log(something) {
  console.log(something);
});
