var Rows = new Mongo.Collection("rows");

Meteor.publish("rows", function() {
  return Rows.find();
});

Rows.allow({
  insert: function(userId, doc) {
    return true;
  }
});


Meteor.methods({
  addTask: function(name, time) {
    Rows.insert({
      Name: name,
      amtTime: time
    }, function(error, result){    }
    );
  },
  deleteTask: function(taskId) {
    Rows.remove(taskId);
  },
  submitTime: function(timeRemaining) {
    // if no time left, delete row
    if( timeRemaining <= 0){
      Rows.remove(this._id);
    } else {
      Rows.update(this._id, {
      $set: { amtTime: timeRemaining }
      });
    }
  }
});
