// when 'taskList' is rendered, allow the table to be scrolled through
Template.taskList.onRendered(function Client$taskList$taskListOnDisplay() {
  Session.set('Query', '');

  $('.scroll').slimScroll({
    height: '250px',
  });
});

// Get a list of task that belong to this user:
// Sorts by priority and time remaining
Template.taskList.helpers({
  tasks: function Client$taskList$getTasks() {
    var priorityInt;
    // receive tasks based on the substring given

    // convert string into a MongoDB data type
    const query = new RegExp('^'+Session.get('Query')+'.*');

    var tasks = Tasks.find({ 'taskName': query }).fetch();

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
});

Template.taskList.events({
  // to find certain tasks based on a substring
  'input #search': function Client$taskList$searchQuery(event) {
    Session.set('Query', event.currentTarget.value);
  },
});

// Add classes to tasks in task list
Template.taskRow.helpers({
  taskStyle: function Client$taskList$taskRow$taskStyle(task) {
    if (task.timeRemaining <= 0) {
      return 'complete';
    } else if (task.deadline < new Date()) {
      return 'overdue';
    }
    return '';
  },
});

// Functions relating to a specific row in task list
Template.taskRow.events({
  // Delete button of task
  'click .delete-task': function Client$taskList$taskRow$deleteTask() {
    Meteor.call('deleteTask', this._id);
  },
  'click .complete-task': function Client$taskList$taskRow$completeTask() {
    // TODO: mark as complete
    console.log('TODO');
  },
});