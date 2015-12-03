TaskScheduler = {
  taskToWorkOn: function TaskScheduler$taskToWorkOn() {
    return this._nextTask();
  },
  taskToWorkGivenTime: function TaskScheduler$taskToWorkGivenTime() {
    return this._nextTask();
  },
  /*
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
  */
  _nextTask: function TaskScheduler$nextTask() {
    var allTasks = Tasks.find().fetch();
    var nextTask = null;
    var lowestScore = Infinity;
    // Find task with lowest score
    for (i = 0; i < allTasks.length; i += 1) {
        // Ignore completed tasks
        if (allTasks[i].timeRemaining == 0) {
          continue;
        }
        // Get priority weight
        var priorityInt = 0;
        if (allTasks[i]._priority == 'Low') {
          priorityInt = 1;
        } else if (allTasks[i]._priority == 'Medium') {
          priorityInt = 2;
        } else if (allTasks[i]._priority == 'High') {
          priorityInt = 3;
        }
        var score = (allTasks[i]._deadline - new Date()) / priorityInt;
        if (score < lowestScore) {
          lowestScore = score;
          nextTask = allTasks[i];
        }
    }
    return nextTask
  }
};
