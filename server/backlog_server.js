Meteor.publish('tasks', function getTasks() {
  return Tasks.find({ User: this.userId });
});

Meteor.startup(function start() {
  // code to run on server at startup

});
