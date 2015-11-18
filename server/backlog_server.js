// returns only the tasks for one user
Meteor.publish('tasks', function getTasks() {
  return Tasks.find({ user: this.userId });
});

// Server methods; these are channeled to TaskService.js
Meteor.methods({
  // Adds a task to the 'Tasks' collection
  addTask: function Server$addTask(taskName, priority, date, estTime,
                            taskDetails) {
    // add the Meteor ID
    const user = Meteor.userId();
    TaskService.addTask(user, taskName, priority, date, estTime, taskDetails);
  },
  // Deletes task from 'tasks'
  deleteTask: function Server$deleteTask(taskId) {
    TaskService.deleteTask(taskId);
  },
  // Submits time
  submitTime: function Server$submitTime(taskId, timeRemaining) {
    TaskService.submitTime(taskId, timeRemaining);
  },
  // increments time spent on a task
  timeSpent: function Server$timeSpent(timeToAdd) {
    TaskService.timeSpent(timeToAdd);
  },
});

Meteor.startup(function start() {
  // code to run on server at startup
  // Prevents the user from modifying user information
  Meteor.users.deny({
    update: function Server$denyUpdate() {
      return true;
    },
  });
});
