// Todo: Validation
Task = function TaskConstructor(doc) {
  _.extend(this, doc);
};
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
    // I don't think we need to parseInt, time should already be an int
    // const timeToAdd = parseInt(time);
    // this._allottedTime+=timeToAdd

    // If by it doesn't work, you may mean that the database isn't updated. It
    // isn't. We need to manually do that ourselves. May want a helper function
    // for that. The task object is changed, but not the database info.
    this._allottedTime += time;
  },
};
