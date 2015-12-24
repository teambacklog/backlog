Helper = {
  getTasks: function Helper$getTasks() {
    return Tasks.find().fetch();
  },
  getTaskCounts: function Helper$getTasks() {
    return Tasks.find().count();
  },
  getTasksSortedByDeadline: function Helper$getTasksSortedByDeadline() {
    return Tasks.find({}, { sort: { deadline: 1 } }).fetch();
  },
};
