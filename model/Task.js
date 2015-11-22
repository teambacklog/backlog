// extend the BSON-object with 'Task' accessor functions
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
    return Number(this._estTime);
  },
  get taskDetails() {
    return this._taskDetails;
  },
  get timeSpent() {
    return Number(this._timeSpent);
  },
  get timeRemaining() {
    return Number(this._estTime - this._timeSpent);
  },
  updateTaskDetails: function Task$updateTaskDetails(newDetail) {
    Tasks.update({ _id: this._id },
                 { $set: { 'task._taskDetails': newDetail },
                });
  },
  updateTaskName: function Task$updateTaskName(newTaskName) {
    Tasks.update({ _id: this._id }, { $set: { 'task._taskName': newTaskName}});
  },
  updateEstTime: function Task$updateEstTime(time) {
    Tasks.update({ _id: this._id }, { $set: { 'task._estTime': time}});
  },
  updateTimeSpent: function Task$updateTimeSpent(time) {
    Tasks.update({ _id: this._id }, { $set: { 'task._timeSpent': time}});
  },
};
