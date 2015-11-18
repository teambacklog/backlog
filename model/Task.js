// extend the BSON-object with 'Task' accessor functions
Task = function TaskConstructor(doc) {
  _.extend(this, doc);
};

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
    this._allottedTime += time;    
  },
};
