Meteor.publish('tasks', function getTasks() {
  return Tasks.find({ user: this.userId });
});

// Expose TaskService functions to the client
Meteor.methods({
  // Adds a task to the 'Tasks' collection
  addTask: function addTask(taskName, priority, date, estTime,
                            taskDetails) {
    const user = Meteor.userId();
    TaskService.addTask(user, taskName, priority, date, estTime, taskDetails);
  },
  // Deletes task from 'tasks'
  deleteTask: function deleteTask(taskId) {
    TaskService.deleteTask(taskId);
  },
  // Submits time
  submitTime: function Server$submitTime(taskId, timeRemaining) {
    TaskService.submitTime(taskId, timeRemaining);
  },
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
