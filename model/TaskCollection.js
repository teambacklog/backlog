/*** TaskCollection.js ***/
// current version: merely holds global Task collection

Tasks = new Mongo.Collection('tasks');

// (Justin) Not sure what the scope is, but I assume 'this' means the user.
//  The user must have an id before receiving info

/*
Meteor.publish('tasks', function getTasks() {
  if (!this.userId) {
    // (Justin) read api, not sure
    this.ready();
  } else {
    return Tasks.find();
  }
});
*/

// maybe useful one day
/*
Tasks.allow({
  insert: function(userId, doc) {
    return true;
  }
});
*/