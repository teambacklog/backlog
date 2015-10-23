TaskCollection = new Meteor.Collection('taskCollection');

// Todo: Validation
Task = function(id, ownerId, priority, estTime, deadline) {
  this._id = id;
  this._ownerId = ownerId;
  this._priority = priority;
  this._estTime = estTime;
  this._deadline = deadline;
};

Task.prototype = {
  get id() {
    return this._id;
  },
  get ownerId() {
    return this._ownerId;
  },
  get priority() {
    return this._priority;
  },
  get estTime() {
    return this._estTime;
  },
  get deadline() {
    return this._deadline;
  },
};
