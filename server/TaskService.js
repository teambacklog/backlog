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
        taskId: taskId,
        priority: priority,
        date: date,
        estTime: estTime,
        taskDetails: taskDetails,
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
  
    var topTask = Tasks.findOne();
    console.log(topTask.estTime);
    if( topTask != null ) {
      topTask.incAllottedTime(timeToAdd);
    }
  },
};
