// Todo: Validation
Task = function(taskId, priority, deadline, estTime, taskDetails) {
  this._taskId = taskId;
  // this._userId = ownerId;
  this._priority = priority
  this._deadline = deadline;
  this._estTime = estTime;
  this._taskDetails = taskDetails;
};

Task.prototype = {
  getTaskId() {
    return this._taskId;
  },
  getOwnerId() {
    return this._ownerId;
  },
  getPriority() {
    return this._priority;
  },
  getDeadline() {
    return this._deadline;
  },
  getEstTime() {
    return this._estTime;
  },
  getTaskDetails() {
    return this._taskDetails;
  }
};
