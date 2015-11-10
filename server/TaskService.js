/*
TaskService.js
Function: Task related server functions that the client can call
*/

TaskService = {
  // adds a task to the 'Tasks' collection
  addTask: function addTask(userId, taskId, priority, date, estTime,
                            taskDetails) {
    // TODO: Input validation
    Tasks.insert({
      user: userId,
      task: {
        _taskId: taskId,
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
  submitTime: function TaskService$submitTime(timeToAdd) {
    // If no time left, delete row

    // not useful for Justin's implementation (feel free to discuss with me)
    /*
    if (timeRemaining <= 0) {
      Tasks.remove(this._id);
    } else {
      Tasks.update(this._id, {
        $set: { amtTime: timeRemaining },
      });
    }
    */
    // let topTask = Tasks.findOne();
    // Easier to test than any random old task.
    let earliestTask = Tasks.findOne({}, { sort: {deadline: 1 }});
    if (earliestTask !== null ) {
      earliestTask.incAllottedTime(timeToAdd);
    }
  },
};
