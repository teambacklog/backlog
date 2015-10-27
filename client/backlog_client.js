Meteor.subscribe('tasks');

// Tasks = new Mongo.Collection('tasks');

Meteor.startup( function start() {
  Session.setDefault('displayTaskSummary', true);
  // window.addEventListener('resize', function(){
  //   Session.set("resize", new Date());
  // });
});

// Session.set("resize", null);

// Template.userFrontPage.resized = function(){
//   var width = $(window).width();
//   var height = $(window).height();

//   // doSomethingCool(width, height);

//   return Session.get('resize');
// };

// defines what 'tasks' and 'contextMenus' are when referenced in the HTML doc
Template.body.helpers({
  tasks: function getTasks() {
    return Tasks.find();
  },
});

// allows addTask.html to add tasks
Template.addTaskDisplay.events({
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
Template.taskList.helpers({
  tasks: function getTasks() {
    return Tasks.find();
  },
});

// Find tasks specific to this user
Template.taskSummaryBoard.helpers({
  taskCount: function getTaskCounts() {
    return Tasks.find().count();
  },
});

Template.userSummary.events({
  'change #switchBox': function toggleSummary(event) {
    event.preventDefault();
    Session.set('displayTaskSummary', !Session.get('displayTaskSummary'));
  },
});

Template.registerHelper('displayTaskSummary', function() {
  return Session.get('displayTaskSummary');
});
