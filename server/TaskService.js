/*
TaskService.js
Function: Task related server functions that the client can call
*/

TaskService = {
  // adds a task to the 'Tasks' collection
  addTask: function addTask(userId, taskId, priority, date, estTime,
                            taskDetails) {
    Tasks.insert({
      user: userId,
      task: new Task(taskId, priority, date, estTime, taskDetails),
    }, function addTaskError() {
      // TODO: Work on exceptions
    });
  },
  // deletes task from 'tasks'
  deleteTask: function deleteTask(taskId) {
    Tasks.remove(taskId);
  },
  // submits time
  submitTime: function submitTime(timeRemaining) {
    // if no time left, delete row
    if (timeRemaining <= 0) {
      Tasks.remove(this._id);
    } else {
      Tasks.update(this._id, {
        $set: { amtTime: timeRemaining },
      });
    }
  },
};
