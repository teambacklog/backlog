// Todo: Validation
Task = function TaskConstructor(taskId, priority, deadline, estTime,
                                taskDetails) {
  this._taskId = taskId;
  // this._userId = ownerId;
  this._priority = priority;
  this._deadline = new Date(deadline);
  this._estTime = Number(estTime);
  this._taskDetails = taskDetails;
};

Task.prototype = {
  get taskId() {
    // Read only
    return this._taskId;
  },
  get ownerId() {
    return this._ownerId;
  },
  get priority() {
    return this._priority;
  },
  get deadline() {
    return this._deadline;
  },
  get estTime() {
    return this._estTime;
  },
  get taskDetails() {
    return this._taskDetails;
  },
};
