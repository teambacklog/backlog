Router.configure({
  layoutTemplate: 'masterLayout',
});

Router.route('/', function router$home() {
  if (!Meteor.user()) {
    this.render('tutorial');
  } else {
    this.layout('interactiveLayout');
    this.render('taskSummary');
  }
});

Router.route('taskList', function router$taskList() {
  if (!Meteor.user()) {
    // Tell the user to login first
    this.render('tutorial');
  } else {
    this.layout('interactiveLayout');
    this.render('taskList');
  }
});

Router.route('/getTask/:minutes', function router$getTask() {
  if (!Meteor.user()) {
    // Tell user to login first
    this.render('tutorial');
  } else {
    this.render('receiveTask', {
      data: function router$getTask$returnTask() {
        // TODO: make use of this.params.minutes as input in TaskScheduler.
        var taskToWorkOn = TaskScheduler._nextTask();
        if (taskToWorkOn === null) {
          console.log('Error in getTask/minutes, taskToWorkOn');
        }
        taskToWorkOn.timeToSpent = this.params.minutes;
        return taskToWorkOn;
      },
    });
  }
}, {
  name: 'getTask',
});
