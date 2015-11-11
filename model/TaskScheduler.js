TaskScheduler = {
  bestTaskToWorkOn: function TaskScheduler$bestTaskToWorkOn() {
    return _earliestDueDate();
  },
  _earliestDueDate: function TaskScheduler$earliestDueDate() {
    return Tasks.find({ deadline: -1 });
  },
};
