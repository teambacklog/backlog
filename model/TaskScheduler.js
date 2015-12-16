TaskScheduler = {
  getCalculatedTasks: function TaskScheduler$getCalculatedTasks() {
    var priorityInt;
    // receive tasks based on the substring given

    // convert string into a MongoDB data type
    const query = new RegExp('^'+Session.get('Query')+'.*');

    var tasks = Tasks.find( { 'task._taskName': query}).fetch();

    return _.sortBy(tasks, function (task) {
      // Send completed tasks to the bottom
      if (task.timeRemaining === 0) {
        return Infinity;
      }
      // Get priority weight
      if (task._priority === 'Low') {
        priorityInt = PRIORITY_LOW;
      } else if (task._priority === 'Medium') {
        priorityInt = PRIORITY_MEDIUM;
      } else if (task._priority === 'High') {
        priorityInt = PRIORITY_HIGH;
      }
      return (task._deadline - new Date()) / priorityInt;
    });
  },
  getDatedTasks: function TaskScheduler$getDatedTasks() {
    return Tasks.find({}, { sort: { 'task._deadline': 1 } });  
  },
  // get a collection of tasks already completed
  getNotCompletedTasks: function TaskScheduler$getNotCompletedTasks() {
    return Tasks.find( { $where: function() { return (this.task._estTime - this.task._timeSpent) != 0; } }); 
  },
  // get a collection of overdue tasks
  getOverdueTasks: function TaskScheduler$getNotCompletedTasks() {
    const currDate = new Date();
    return Tasks.find( { $where: function() { return this.task._deadline <= currDate } } );
  },
  taskToWorkOn: function TaskScheduler$taskToWorkOn() {
    return this._nextTask();
  },
  taskToWorkGivenTime: function TaskScheduler$taskToWorkGivenTime() {
    return this._nextTask();
  },
  _earliestDueDate: function TaskScheduler$earliestDueDate() {
    var earliestTask;
    var allTasks;
    var i;

    allTasks = Tasks.find({}, { sort: { 'task._deadline': 1 } }).fetch();
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
    var nextTask = null;
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
      if (allTasks[i]._priority === 'Low') {
        priorityInt = 1;
      } else if (allTasks[i]._priority === 'Medium') {
        priorityInt = 2;
      } else if (allTasks[i]._priority === 'High') {
        priorityInt = 3;
      }
      score = (allTasks[i]._deadline - new Date()) / priorityInt;
      if (score < lowestScore) {
        lowestScore = score;
        nextTask = allTasks[i];
      }
    }
    return nextTask;
  },
};
