
// (Justin) Not sure what the scope is, but I assume 'this' means the user.
//  The user must have an id before receiving info
Meteor.publish('rows', function getTasks() {
  if (!this.userId) {
    // (Justin) read api, not sure
    this.ready();
  } else {
    return Rows.find();
  }
});

// maybe useful one day
/*
Rows.allow({
  insert: function(userId, doc) {
    return true;
  }
});
*/

// Methods the client can call
Meteor.methods({
  // adds a task to the 'rows' collection
  addTask: function addTask(user, name, priority, date, time) {
    Rows.insert({
      User: user,
      Name: name,
      Priority: priority,
      Date: date,
      Est: time,
    }, function addTaskError() {  }
    );
  },
  // deletes task from 'rows'
  deleteTask: function deleteTask(taskId) {
    Rows.remove(taskId);
  },
  // submits time
  submitTime: function submitTime(timeRemaining) {
    // if no time left, delete row
    if (timeRemaining <= 0) {
      Rows.remove(this._id);
    } else {
      Rows.update(this._id, {
        $set: { amtTime: timeRemaining },
      });
    }
  },
});

Meteor.startup(function start() {
  // code to run on server at startup

});
