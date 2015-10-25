Meteor.publish('tasks', function getTasks() {
  return Tasks.find({ user: this.userId });
});

// Expose TaskService functions to the client
Meteor.methods({
  // adds a task to the 'Tasks' collection
  addTask: function addTask(userId, taskId, priority, date, estTime,
                            taskDetails) {
    TaskService.addTask(userId, taskId, priority, date, estTime, taskDetails);
  },
  // deletes task from 'tasks'
  deleteTask: function deleteTask(taskId) {
    TaskService.deleteTask(taskId);
  },
  // submits time
  submitTime: function submitTime(timeRemaining) {
    TaskService.submitTime(timeRemaining);
  },
});

Meteor.startup(function start() {
  // code to run on server at startup

});
