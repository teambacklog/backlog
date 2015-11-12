// Todo: Validation
Task = function TaskConstructor(doc) {
  _.extend(this, doc);
};

Task.prototype = {
  constructor: Task,

  get taskId() {
    // Read only
    return this._id;
  },
  get taskName() {
    return this._taskName;
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
    // Not used right now
    this._allottedTime += time;
  },
};
