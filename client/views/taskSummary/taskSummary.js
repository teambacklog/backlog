// 'taskSummary' has a number of metrics to aggregate info on the tasks
Template.taskSummary.helpers({
  // returns the number of tasks
  taskCount: function Client$taskSummary$getTaskCounts() {
    return Helper.getTaskCounts();
  },
  // retrieves the earliest due date
  earliestDue: function Client$taskSummary$getEarliestDue() {
    const MILLI_SEC_PER_DAY = 86400000;
    var notCompletedTasks = Helper.getTasksSortedByDeadline();
    if (notCompletedTasks.length === 0) {
      return 0;
    }
    earliestTask = notCompletedTasks[0];
    return Math.ceil((earliestTask.deadline - Date.now()) / MILLI_SEC_PER_DAY);
  },
  // returns the amount of work across all tasks in hours
  workLoad: function Client$taskSummary$getWorkLoad() {
    var timeLeft;
    var total = 0;
    var notCompletedTasks = Tasks.find().fetch();
    notCompletedTasks.map(function sumTimes(task) {
      timeLeft = Math.max(task.estTime - task.timeSpent, 0);
      total += timeLeft;
    });
    total = total / 60; // Change it to in hours
    return Math.round(total * 100) / 100; // Round it to the 2nd decimal
  },
});
