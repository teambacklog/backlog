/*
TaskService.js
Function: Task related server functions that the client can call
*/

TaskService = {
  // adds a task to the 'Tasks' collection
  addTask: function addTask(userId, taskName, priority, date, estTime,
                            taskDetails) {
    // TODO: Input validation
    Tasks.insert({
      user: userId,
      task: {
        _taskName: taskName,
        _priority: priority,
        _deadline: new Date(date),
        _estTime: Number(estTime),
        _taskDetails: taskDetails,
        _allottedTime: 0,
      },
    }, function addTaskError() {
      // TODO: Work on exceptions
    });
  },
  // Deletes task from 'tasks'
  deleteTask: function deleteTask(taskId) {
    Tasks.remove(taskId);
  },
  // Submits time
  submitTime: function submitTime(taskId, timeRemaining) {
    // If no time left, delete row
    if (timeRemaining <= 0) {
      Tasks.remove(taskId);
    } else {
      Tasks.update(taskId, {
        $set: { estTime: timeRemaining },
      });
    }
  },
  timeSpent: function TaskService$timeSpent(timeToAdd) {
    const time = parseInt(timeToAdd, 10);

    let allTasks = Tasks.find({}, { sort: { 'task._deadline': 1 } }).fetch();
    if (allTasks.length === 0) {
      return 0;
    }
    let earliestTask = allTasks[0];

    Tasks.update({ _id: earliestTask._id },
                 { $inc: { 'task._allottedTime': time } });
  },
};
