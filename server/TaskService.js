TaskService = {
  // adds a task to the 'rows' collection
  addTask: function addTask(user, name, priority, date, time) {
    Rows.insert({
      User: user,
      Name: name,
      Priority: priority,
      Date: date,
      Est: time,
    }, function addTaskError() {
      Console.log('Error adding task');
    });
  },
  deleteTask: function deleteTask(taskId) {
    Rows.remove(taskId);
  },
  // submits time
  submitTime: function submitTime(timeRemaining) {
    // if no time left, delete row
    if (timeRemaining <= 0) {
      Rows.remove(this._id);
    } else {
      Rows.update(this._id, {
        $set: { amtTime: timeRemaining },
      });
    }
  },
};
