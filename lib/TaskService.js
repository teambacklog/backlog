/* TaskService.js */
// current version: merely uses Meteor methods to perform server functions

// Methods the client can call
Meteor.methods({
  // adds a task to the 'Tasks' collection
  addTask: function addTask(userId, taskId, priority, date, estTime,
                            taskDetails) {
    Tasks.insert({
      user: userId,
      task: new Task(taskId, priority, date, estTime, taskDetails),
    }, function addTaskError() {
      // TODO: Work on exceptions
    });
  },
  // deletes task from 'tasks'
  deleteTask: function deleteTask(taskId) {
    Tasks.remove(taskId);
  },
  // submits time
  submitTime: function submitTime(timeRemaining) {
    // if no time left, delete row
    if (timeRemaining <= 0) {
      Tasks.remove(this._id);
    } else {
      Tasks.update(this._id, {
        $set: { amtTime: timeRemaining },
      });
    }
  },
  getUserTaskCount: function getUserTaskCount() {
    return 5;
  },
});

