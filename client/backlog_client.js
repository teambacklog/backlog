Meteor.subscribe('tasks');

// Tasks = new Mongo.Collection('tasks');

Meteor.startup( function start() {  });

// defines what 'tasks' and 'contextMenus' are when referenced in the HTML doc
Template.body.helpers({
  tasks: function getTasks() {
    return Tasks.find();
  },
});

// allows addTask.html to add tasks
Template.contextMenu.events({
  // submit information for new row
  'click #submit-new-task': function addTask(event, template) {
    event.preventDefault();
    // unique Meteor variable
    // text from text fields
    const name = template.find('[name="name"]').value;

    const priorityField = template.find('[name="priority"]');
    const priority = priorityField.options[priorityField.selectedIndex].text;

    const date = template.find('[name="date"]').value;
    const time = template.find('[name="est"]').value;
    Meteor.call('addTask', name, priority, date, time);
    // Session.set('showAddTask', false);
    // Session.set('showFrontPage', true);
  },
});

// Find tasks specific to this user
Template.taskList.tasks = function getTasks() {
  return Tasks.find();
};

// Find tasks specific to this user
Template.userSummary.helpers({
  taskCount: function getTaskCounts() {
    return Tasks.find().count();
  },
});

// Return days until soonest due date
Template.userSummary.helpers({
  earliestDue: function getEarliestDue() {
    var dueDate = Tasks.findOne({}, { sort: { "task.deadline": 1 }}).task.deadline
    return Math.ceil((dueDate - Date.now()) / 86400000);
  },
});

// Return total work load
Template.userSummary.helpers({
  workLoad: function getWorkLoad() {
    var total = 0;
    Tasks.find().map(function(item) {
      total += item.task.estTime;
    });
    return total / 60
  },
});
