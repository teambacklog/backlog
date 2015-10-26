TaskScheduler = {
  bestTaskToWorkOn: function() {
    return _earliestDueDate();
  },
  _earliestDueDate: function() {
    return Tasks.find({ deadline: -1 });
  },
};
