/* Task related server functions that the server publishes to the client */

TaskService = {
  // adds a task to the 'Tasks' collection
  addTask:
    function TaskService$addTask(userId, taskName, priority, date, estTime,
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
      }, function TaskService$addTaskError() {
      });
    },
  // Deletes task from 'tasks'
  deleteTask: function TaskService$deleteTask(taskId) {
    Tasks.remove(taskId);
  },
};
