Meteor.subscribe('tasks');

Meteor.startup( function Client$Meteor$start() {

});

// when 'addTaskDisplay' is rendered, set the 'datepicker' and 'slider' elements
Template.addTaskDisplay.onRendered(function Client$addTaskDisplay$renderContextMenu() {
  // limits the range of dates to 100 days later
  $('#datepicker').datepicker({
    minDate: 0,
    maxDate: +100,
  });

  // the slider for estimed time: begins at 15, ends at 300, increments by 15
  $( '#slider').slider({
    range: 'min',
    value: 15,
    min: 15,
    max: 300,
    step: 15,
    slide: function sliderValue(event, ui) {
      $('#task-est-time').val( ui.value );
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

// allows addTask.html to add tasks
Template.addTaskDisplay.events({
  // submit information for new row
  'submit form': function Client$addTaskDisplay$addTask(event, template) {
    event.preventDefault();
    const name = template.find('[name="name"]').value;

    const priorityField = template.find('[name="priority"]');
    const priority = priorityField.options[priorityField.selectedIndex].text;

    const date = template.find('[name="date"]').value;
    const time = template.find('[name="est"]').value;
    const taskDetails = template.find('[name="task-details"]').value;
    console.log(taskDetails);
    // add the task to the server 
    Meteor.call('addTask', name, priority, date, time, taskDetails);

    template.find('[name="name"]').value = "";
    template.find('[name="date"]').value = "";
    template.find('[name="est"]').value = "";

    $('#addTaskModal').hide('slow');
  },
  // Hide add task modal
  'click #remove-new-task': function Client$addTaskDisplay$hideAddTaskModal(event) {
    event.preventDefault();
    $("#addTaskForm").data('validator').resetForm();
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
    if( Tasks.find().count() === 0 )
      return;
    Session.set('timeToSpent', 15);
    Session.set('gettingTask', true);
  },
  'click #thirty-min-opt': function Client$timeSlotBoard$addThirtyMinutes() {
    if( Tasks.find().count() === 0 )
      return;
    Session.set('timeToSpent', 30);
    Session.set('gettingTask', true);
  },
  'click #one-hour-opt': function Client$timeSlotBoard$addOneHour() {
    if( Tasks.find().count() === 0 )
      return;
    Session.set('timeToSpent', 60);
    Session.set('gettingTask', true);
  },
});

Template.receiveTask.helpers({
  getSchedulerTask: function client$receiveTask$getSchedulerTask() {
    var timeToSpent = Session.get('timeToSpent');
    return [TaskScheduler.taskToWorkGivenTime(timeToSpent)];
  },
});

Template.receiveTask.events({
  'click #did-not-work-on': function returnToUserBoard() {
    Session.set('gettingTask', false);
  },
  'click #spent-time-to-spent': function client$spentTime() {
    var timeToSpent = Session.get('timeToSpent');
    var workingOnTask = TaskScheduler.taskToWorkGivenTime(timeToSpent);
    console.log(workingOnTask);
    workingOnTask.updateTimeSpent(timeToSpent+workingOnTask.timeSpent);
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

// Color tasks in task list
Template.taskInfo.helpers({
  taskStyle: function Client$taskStyle(task) {
    if (task.timeRemaining <= 0) {
      return 'complete';
    } else if (task.deadline < new Date()) {
      return 'overdue';
    }
    return '';
  },
});

// Functions relating to a specific row in task list
Template.taskInfo.events({
  // Add time spent working on a test
  'click .add-time-spent': function Client$taskList$addTimeSpent() {
    var task = Tasks.findOne(this._id);
    task.updateTimeSpent(task.timeSpent + 15);
  },
  // Add to the estimated time remaining
  'click .add-time-est': function Client$taskList$addTimeEst() {
    var task = Tasks.findOne(this._id);
    task.updateEstTime(task.estTime + 15);
  },
  // Delete button of task
  'click .delete-task': function Client$taskList$deleteTask() {
    Meteor.call('deleteTask', this._id);
  },
  'click .complete-task': function Client$taskList$completeTask() {
    var task = Tasks.findOne(this._id);
    task.updateTimeSpent(task.estTime);
  },
  'contextmenu .date': function Client$taskList$taskInfo$dbclickDate() {
    var task = Tasks.findOne(this._id);
    task.updateTaskName('test right click date');
  },
  'dblclick .priority': function Client$taskList$taskInfo$dbclickPriority() {
    var task = Tasks.findOne(this._id);
    task.updateTaskName('test db click priority');
  },
  'input .task-name': _.debounce(function Client$taskInfo$inputTaskName(e) {
    var task = Tasks.findOne(this._id);
    task.updateTaskName($(e.target).text());
    $(e.target).text('');
  }, 750, false),
  'input .est-time': _.debounce(function Client$taskInfo$inputEstTime(e) {
    var task = Tasks.findOne(this._id);
    task.updateEstTime($(e.target).text());
    $(e.target).text('');
  }, 750, false),
  'input .time-spent': _.debounce(function Client$taskInfo$inputTimeSpent(e) {
    var task = Tasks.findOne(this._id);
    task.updateTimeSpent($(e.target).text());
    $(e.target).text('');
  }, 750, false),
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
  Session.set('displayTaskSummary', true);
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

// Global function
Template.registerHelper('displayTaskSummary', function Client$template$displayTaskSummary() {
  return Session.get('displayTaskSummary');
});

Template.registerHelper('gettingTask', function timeSpentCompZero() {
  return Session.get('gettingTask');
});
Template.registerHelper('currTask', function currentTask() {
  return new Task(Session.get('currTask'));
});

Template.registerHelper('timeToSpent', function timeSpentSession() {
  return Session.get('timeToSpent');
});
