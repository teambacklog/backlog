/**** TaskScheduler.js ***/
// current version: merely uses the 'publish' to give the user the set of their data

// (Justin) Not sure what the scope is, but I assume 'this' means the user.
//  The user must have an id before receiving info
Meteor.publish('tasks', function getTasks() {
  if (!this.userId) {
    // (Justin) read api, not sure
    this.ready();
  } else {
    return Tasks.find();
  }
});
