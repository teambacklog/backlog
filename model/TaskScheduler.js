TaskScheduler = {
  taskToWorkOn: function TaskScheduler$taskToWorkOn() {
    return this._earliestDueDate();
  },
  taskToWorkGivenTime: function TaskScheduler$taskToWorkGivenTime(timeToSpent) {
    return this._earliestDueDate();
  },
  _earliestDueDate: function TaskScheduler$earliestDueDate() {
    let allTasks = Tasks.find({}, { sort: { 'task._deadline': 1 } }).fetch();
    if (allTasks.length === 0) {
      return 0;
    }
    let earliestTask = allTasks[0];
    return earliestTask;
  },
};
