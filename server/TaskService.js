/*
TaskService.js
Function: Task related server functions that the client can call
*/

TaskService = {
  // adds a task to the 'Tasks' collection
  addTask: function TaskService$addTask(userId, taskName, priority, date, estTime,
                            taskDetails) {
    // put in a task into the MongoDB Collection
    Tasks.insert({
      user: userId,
      task: {
        _taskName: taskName,
        _priority: priority,
        _deadline: new Date(date),
        _estTime: Number(estTime),
        _taskDetails: taskDetails,
        _timeSpent: 0,
      },
    }, function addTaskError() {
      // TODO: Work on exceptions
    });
  },
  // Deletes task from 'tasks'
  deleteTask: function TaskService$deleteTask(taskId) {
    Tasks.remove(taskId);
  },
  // Submits time
  submitTime: function TaskService$submitTime(taskId, timeRemaining) {
    // If no time left, delete row
    if (timeRemaining <= 0) {
      Tasks.remove(taskId);
    } else {
      Tasks.update(taskId, {
        $set: { estTime: timeRemaining },
      });
    }
  },
  // increment timeSpent parameter
  timeSpent: function TaskService$timeSpent(timeToAdd) {
    var allTasks;
    var earliestTask;

    const time = parseInt(timeToAdd, 10);

    allTasks = Tasks.find({}, { sort: { 'task._deadline': 1 } }).fetch();
    if (allTasks.length === 0) {
      return 0;

    }
    earliestTask = allTasks[0];

    Tasks.update({ _id: earliestTask.taskId },
                 { $inc: { 'task._timeSpent': time } });
  },
};
