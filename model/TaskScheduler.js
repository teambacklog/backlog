TaskScheduler = {
  taskToWorkOn: function TaskScheduler$taskToWorkOn() {
    return this._earliestDueDate();
  },
  taskToWorkGivenTime: function TaskScheduler$taskToWorkGivenTime() {
    return this._earliestDueDate();
  },
  _earliestDueDate: function TaskScheduler$earliestDueDate() {
    var earliestTask;
    var allTasks;
    var i;

    allTasks = Tasks.find({}, { sort: { 'task._deadline': 1 } }).fetch();
    if (allTasks.length === 0) {
      return 0;
    }

    earliestTask = null;
    for (i = 0; i < allTasks.length; i += 1) {
      if (allTasks[i].timeRemaining !== 0) {
        earliestTask = allTasks[i];
        break;
      }
    }
    if (earliestTask === null) {
      return 0;
    }
    return earliestTask;
  },
};
