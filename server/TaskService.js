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
      task: new Task(taskId, priority, date, estTime, taskDetails),
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
};
