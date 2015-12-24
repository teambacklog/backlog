Tasks = new Mongo.Collection('tasks');

Tasks.helpers({
  timeRemaining: function() {
    return Math.max(this.estTime - this.timeSpent, 0);
  }
})

/*
var Schemas = {};

Schemas.Task = new SimpleSchema({
    // todo
});

Tasks.attachSchema(Schemas.Task);
*/
