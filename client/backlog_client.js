Meteor.subscribe('tasks');

//Tasks = new Mongo.Collection('tasks');

Meteor.startup( function start() {  });

// defines what 'tasks' and 'contextMenus' are when referenced in the HTML doc
Template.body.helpers({
  tasks: function getTasks() {
    return Tasks.find({});
  },
});

Template.row.events({
  // delete row
  'click .delete': function deleteTask() {
    // event.preventDefault();
    Meteor.call('deleteTask', this._id);
  },
  // change time remaining on task by user input
  'submit .submitTime': function submitTime(event) {
    const timeToTake = event.target.submitTime.value;
    const timeLeft = this.amtTime;
    const timeRemaining = timeLeft - timeToTake;

    Meteor.call('submitTime', timeRemaining);

    event.target.submitTime.value = '';
  },
});

// allows addTask.html to add tasks
Template.contextMenu.events({
  // submit information for new row
  'click #submit-new-task': function addTask(event, template) {
    event.preventDefault();
    // unique Meteor variable
    const user = Meteor.user();
    // text from text fields
    const name = template.find('[name="name"]').value;

    const priorityField = template.find('[name="priority"]');
    const priority = priorityField.options[priorityField.selectedIndex].text;

    const date = template.find('[name="date"]').value;
    const time = template.find('[name="est"]').value;

    Meteor.call('addTask', user, name, priority, date, time);
    // Session.set('showAddTask', false);
    // Session.set('showFrontPage', true);
  },
});

// Find tasks specific to this user
Template.taskList.tasks = function getTasks() {
  return Tasks.find({ User: Meteor.user() });
};
