/*** TaskService.js ***/
// current version: merely uses Meteor methods to perform server functions

// Methods the client can call
Meteor.methods({
  // adds a task to the 'Tasks' collection
  addTask: function addTask(user, name, priority, date, time) {
    Tasks.insert({
      /*User: user,
      Name: name,
      Priority: priority,
      Date: date,
      Est: time,*/
      User: user, 
      Task: new Task(name, priority, date, time),
      }, function addTaskError() {  }
    );
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
});

Meteor.startup(function start() {
  // code to run on server at startup

});
