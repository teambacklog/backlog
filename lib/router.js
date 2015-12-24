Router.configure({
    layoutTemplate: 'masterLayout',
});

Router.route('/', function () {
  if (!Meteor.user()) {
    this.render('tutorial');
  } else {
    this.layout('interactiveLayout');
    this.render('taskSummary');
  }
});

Router.route('taskList', function () {
  if (!Meteor.user()) {
    // Tell the user to login first
    this.render('tutorial');
  } else {
    this.layout('interactiveLayout');
    this.render('taskList');
  }
});

Router.route('/getTask/:minutes', function () {
  if (!Meteor.user()) {
    // Tell user to login first
    this.render('tutorial');
  } else {
    this.render('receiveTask', {
      data: function () {
        // TODO: make use of this.params.minutes as input in TaskScheduler.
        var taskToWorkOn = TaskScheduler._nextTask();
        if (taskToWorkOn === null) {
          console.log("Something's wrong in getTask/minutes, tasToWorkOn");
        }
        taskToWorkOn.timeToSpent = this.params.minutes;
        return taskToWorkOn;
      }
    });
  }
}, {
  name: 'getTask',
});
