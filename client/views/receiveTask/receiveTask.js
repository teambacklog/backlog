Template.receiveTask.events({
  // Return to userboard
  'click #did-not-work-on': function Client$receiveTask$returnToUserBoard() {
    Router.go('/');
  },
  // Return to userboard
  'click #finished-task': function Client$receiveTask$finishedTask() {
    // TODO
  },
  // Update the task with the time user spent on it
  'click #spent-time-to-spent': function Client$receiveTask$spentTime() {
    // TODO
  },
});

Template.receiveTask.onRendered( function Client$schedulerTask$onRendered() {
  const millisecInMin = 60000;
  const minIntervals = 5;
  var intervalId;
  Session.set('timeElapsed', 0);
  intervalId = Meteor.setInterval(function() {
    Session.set('timeElapsed', Session.get('timeElapsed') + minIntervals);
  }, minIntervals*millisecInMin);
  Session.set('intervalId', intervalId);
});

Template.receiveTask.onDestroyed(function Client$schedulerTask$onDestroyed() {
  Meteor.clearTimeout(Session.get('intervalId'))
});

Template.receiveTask.helpers({
  timeElapsed: function Client$schedulerTask$getTimeElapsed() {
    return Session.get('timeElapsed');
  },
  timeToGo: function Client$schedulerTask$timeToGo() {
    return Math.max(this.timeToSpent - Session.get('timeElapsed'), 0);
  },
});
