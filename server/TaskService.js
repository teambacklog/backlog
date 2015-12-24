/* Task related server functions that the server publishes to the client */

// TODO: change it into a singleton class.
TaskService = {
  // adds a task to the 'Tasks' collection
  addTask:
    function TaskService$addTask(userId, taskName, priority, date, estTime,
                                 taskDetails) {
    // put in a task into the MongoDB Collection
    Tasks.insert({
      userId: userId,
      taskName: taskName,
      priority: priority,
      deadline: new Date(date),
      estTime: Number(estTime),
      taskDetails: taskDetails,
      timeSpent: 0,
    });
  },
  // Deletes task from 'tasks'
  deleteTask: function TaskService$deleteTask(userId, taskId) {
    // Make sure it is the right userId
    Tasks.remove(taskId);
  },
  modifyTask: function TaskService$modiftTask(userId, taskId, taskJson) {
    // Make sure it is the right userId
    // some kind of task update
  }
};
