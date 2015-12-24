TaskScheduler = {
  taskToWorkOn: function TaskScheduler$taskToWorkOn() {
    return this._nextTask();
  },
  taskToWorkGivenTime: function TaskScheduler$taskToWorkGivenTime(timeToUse) {
    return this._nextTask();
  },
  _earliestDueDate: function TaskScheduler$earliestDueDate() {
    var earliestTask;
    var allTasks;
    var i;

    allTasks = Tasks.find({}, { sort: { deadline: 1 } }).fetch();
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
  _nextTask: function TaskScheduler$nextTask() {
    var allTasks = Tasks.find().fetch();
    var nextTask = allTasks[0];
    var lowestScore = Infinity;
    var score;
    var priorityInt;

    // Find task with lowest score
    for (i = 0; i < allTasks.length; i += 1) {
      // Ignore completed tasks
      if (allTasks[i].timeRemaining === 0) {
        continue;
      }
      // Get priority weight
      priorityInt = 0;
      if (allTasks[i].priority === 'Low') {
        priorityInt = 1;
      } else if (allTasks[i].priority === 'Medium') {
        priorityInt = 2;
      } else if (allTasks[i].priority === 'High') {
        priorityInt = 3;
      }
      score = (allTasks[i].deadline - new Date()) / priorityInt;
      if (score < lowestScore) {
        lowestScore = score;
        nextTask = allTasks[i];
      }
    }
    return nextTask;
  },
};
