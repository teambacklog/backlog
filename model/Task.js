// Todo: Validation
Task = function(/*id,*/ id, priority, deadline, estTime) {
  //this._id = id;
  this._id = id;
  this._priority = priority;
  this._deadline = deadline;
  this._estTime = estTime;
};

Task.prototype = {
  getId() {
    return this._id;
  },
  /*getOwnerId() {
    return this._ownerId;
  },*/
  getPriority() {
    return this._priority;
  },
  getDeadline() {
    return this._deadline;
  },
  getEstTime() {
    return this._estTime;
  },
};
