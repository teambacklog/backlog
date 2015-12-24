// Only returns the tasks that belongs to current user


// Methods exposed to the client side
Meteor.methods({
  // Adds a task to the 'Tasks' collection
  addTask: function Server$addTask(taskName, priority, date, estTime,
                                   taskDetails) {
    // Fetch the user's ID
    const userId = Meteor.userId();
    TaskService.addTask(userId, taskName, priority, date, estTime, taskDetails);
  },
  // Deletes task from 'tasks'
  deleteTask: function Server$deleteTask(taskId) {
    // Fetch the user's ID
    const userId = Meteor.userId();
    TaskService.deleteTask(userId, taskId);
  },
  // Modify the task from 'tasks'
  modifyTask: function Server$modifyTask(taskId, taskJson) {
    // Fetch the user's ID
    const userId = Meteor.userId();
    TaskService.modifyTask(userId, taskId, taskJson);
  },
});

Meteor.startup(function Server$startup() {
  // Prevents the user from modifying user information
  Meteor.users.deny({
    update: function Server$denyUpdate() {
      return true;
    },
  });

  Meteor.publish('tasks', function Server$publish$tasks() {
    return Tasks.find({ userId: this.userId });
  });
});
