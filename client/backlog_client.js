const timeBeforeUpdating = 750;

var getNotCompletedTasks;

Meteor.subscribe('tasks');

Meteor.startup( function Client$Meteor$start() {

});

// Shared functions
getNotCompletedTasks = function Client$getNotCompletedTasks() {
  // Doesn't quite work yet because Meteor does not allow comparison of fields
  // and subfields, it seems.
  // return Tasks.find({ $where: 'task._estTime > task._timeSpent' });
  return Tasks.find();
};

// when 'addTaskDisplay' is rendered, set the 'datepicker' and 'slider' elements
Template.addTaskDisplay.onRendered(
  function Client$addTaskDisplay$renderContextMenu() {
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
  'submit form': function Client$addTaskDisplay$addTask(event, template) {
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
    $('#addTaskModal').hide('slow');
  },
  // Hide add task modal
  'click #remove-new-task':
    function Client$addTaskDisplay$hideAddTaskModal(event) {
      event.preventDefault();
      $('#addTaskForm').data('validator').resetForm();
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
    // If there are no tasks to work on, do nothing.
    if ( Tasks.find().count() === 0 ) {
      return;
    }
    Session.set('timeToSpent', 15);
    Session.set('gettingTask', true);
  },
  'click #thirty-min-opt': function Client$timeSlotBoard$addThirtyMinutes() {
    // If there are no tasks to work on, do nothing.
    if ( Tasks.find().count() === 0 ) {
      return;
    }
    Session.set('timeToSpent', 30);
    Session.set('gettingTask', true);
  },
  'click #one-hour-opt': function Client$timeSlotBoard$addOneHour() {
    // If there are no tasks to work on, do nothing.
    if ( Tasks.find().count() === 0 ) {
      return;
    }
    Session.set('timeToSpent', 60);
    Session.set('gettingTask', true);
  },
});

Template.receiveTask.helpers({
  // Returns a list of tasks to work on
  getSchedulerTask: function Client$receiveTask$getSchedulerTask() {
    const timeToSpent = Session.get('timeToSpent');
    const taskToWorkOn = TaskScheduler.taskToWorkGivenTime(timeToSpent);
    return [taskToWorkOn];
  },
});

Template.receiveTask.events({
  // Return to userboard
  'click #did-not-work-on': function Client$receiveTask$returnToUserBoard() {
    Session.set('gettingTask', false);
  },
  // Return to userboard
  'click #finished-task': function Client$receiveTask$finishedTask() {
    const timeToSpent = Session.get('timeToSpent');
    const workingOnTask = TaskScheduler.taskToWorkGivenTime(timeToSpent);
    workingOnTask.updateTimeSpent(workingOnTask.estTime);
    Session.set('gettingTask', false);
  },
  // Update the task with the time user spent on it
  'click #spent-time-to-spent': function Client$receiveTask$spentTime() {
    const timeToSpent = Session.get('timeToSpent');
    const workingOnTask = TaskScheduler.taskToWorkGivenTime(timeToSpent);
    workingOnTask.updateTimeSpent(timeToSpent + workingOnTask.timeSpent);
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

// Add classes to tasks in task list
Template.taskInfo.helpers({
  taskStyle: function Client$taskList$taskInfo$taskStyle(task) {
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
  'click .add-time-spent': function Client$taskList$taskInfo$addTimeSpent() {
    var task = Tasks.findOne(this._id);
    task.updateTimeSpent(task.timeSpent + 15);
  },
  // Add to the estimated time remaining
  'click .add-time-est': function Client$taskList$taskInfo$addTimeEst() {
    var task = Tasks.findOne(this._id);
    task.updateEstTime(task.estTime + 15);
  },
  // Delete button of task
  'click .delete-task': function Client$taskList$taskInfo$deleteTask() {
    Meteor.call('deleteTask', this._id);
  },
  'click .complete-task': function Client$taskList$taskInfo$completeTask() {
    var task = Tasks.findOne(this._id);
    task.updateTimeSpent(task.estTime);
  },
  // Debounce is an underscorejs function that only calls the nested function
  //  once within a certain amount of time
  'input .task-name': _.debounce(
    function Client$taskList$taskInfo$inputTaskName(event) {
      var task = Tasks.findOne(this._id);
      task.updateTaskName($(event.target).text());
      $(event.target).text('');
    }, timeBeforeUpdating, false
  ),
  'input .est-time': _.debounce(
    function Client$taskList$taskInfo$inputEstTime(event) {
      var task = Tasks.findOne(this._id);
      task.updateEstTime(parseInt($(event.target).text(), 10));
      $(event.target).text('');
    }, timeBeforeUpdating, false
  ),
  'input .time-spent': _.debounce(
    function Client$taskList$taskInfo$inputTimeSpent(event) {
      var task = Tasks.findOne(this._id);
      task.updateTimeSpent(parseInt($(event.target).text(), 10));
      $(event.target).text('');
    }, timeBeforeUpdating, false
  ),
});

// 'taskSummary' has a number of metrics to aggregate info on the tasks
Template.taskSummary.helpers({
  // returns the number of tasks
  taskCount: function Client$taskSummary$getTaskCounts() {
    return getNotCompletedTasks().count();
  },
  // retrieves the earliest due date
  earliestDue: function Client$taskSummary$getEarliestDue() {
    const MILLI_SEC_PER_DAY = 86400000;
    var notCompletedTasks = getNotCompletedTasks();

    if (notCompletedTasks.count() === 0) {
      return 0;
    }

    earliestTask = notCompletedTasks.fetch()[0];
    return Math.ceil((earliestTask.deadline - Date.now()) / MILLI_SEC_PER_DAY);
  },
  // returns the amount of work across all tasks in hours
  workLoad: function Client$taskSummary$getWorkLoad() {
    var total = 0;
    var notCompletedTasks = getNotCompletedTasks();
    notCompletedTasks.map(function sumTimes(item) {
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
Template.registerHelper('displayTaskSummary',
  function Client$template$displayTaskSummary() {
    return Session.get('displayTaskSummary');
  }
);

Template.registerHelper('gettingTask', function gettingTask() {
  return Session.get('gettingTask');
});

Template.registerHelper('timeToSpent', function timeSpentSession() {
  return Session.get('timeToSpent');
});
