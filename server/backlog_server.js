Meteor.publish('tasks', function getTasks() {
  return Tasks.find({ user: this.userId });
});

Meteor.startup(function start() {
  // code to run on server at startup

});
