// Only returns the tasks that belongs to current user
Meteor.publish('tasks', function getTasks() {
  return Tasks.find({ user: this.userId });
});

// Methods exposed to the client side
Meteor.methods({
  // Adds a task to the 'Tasks' collection
  addTask: function Server$addTask(taskName, priority, date, estTime,
                                   taskDetails) {
    // Fetch the user's ID
    const user = Meteor.userId();
    TaskService.addTask(user, taskName, priority, date, estTime, taskDetails);
  },
  // Deletes task from 'tasks'
  deleteTask: function Server$deleteTask(taskId) {
    TaskService.deleteTask(taskId);
  },
});

Meteor.startup(function start() {
  // Prevents the user from modifying user information
  Meteor.users.deny({
    update: function Server$denyUpdate() {
      return true;
    },
  });

  // Allows tasks to update themselves on the client side
  Tasks.allow({
    update: function Tasks$allow$update() {
      return true;
    },
  });
});
