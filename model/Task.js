// Todo: Validation
Task = function TaskConstructor (doc) {
  _.extend(this, doc);
  console.log(this);
}
/*
Task = function TaskConstructor(taskId, priority, deadline, estTime,
                                taskDetails) {
  this._taskId = taskId;
  this._priority = priority;
  this._deadline = new Date(deadline);
  this._estTime = Number(estTime);
  this._taskDetails = taskDetails;
  this._allottedTime = 0;
};
*/

Task.prototype = {
  constructor: Task,

  get taskId() {
    // Read only
    return this._taskId;
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
  get allottedTime() {
    return this._allottedTime;
  },
  incAllottedTime(time) {
    const timeToAdd = parseInt(time);
    this._allottedTime+=timeToAdd
    console.log(this._allottedTime);
  },
};
