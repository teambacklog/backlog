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
  get timeSpent() {
    return this._timeSpent;
  },
  updateTaskDetails: function Task$updateTaskDetails(newDetail) {
    Tasks.update({ _id: this._id },
                 { $set: { 'task._taskDetails': newDetail, 'task._estTime': 70 }, }
                );
  },
  updateTaskName: function Task$updateTaskName(newTaskName) {
    Tasks.update({ _id: this._id }, { $set: { 'task._taskName': newTaskName}});
  }
};
