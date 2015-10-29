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

Template.userSummary.onRendered( function renderFrontPage() {
  $('#contextMenu').hide();
  $('#taskList').hide();
  $(".modal-trigger").leanModal();
});


Template.userSummary.events({
  'change #switchBox': function switchTaskDisplay(event) {
    const box = event.target;
    // $this will contain a reference to the checkbox
    if ( box.checked ) {
      // the checkbox was checked
      $('#taskList').show('slow');
      $('#taskSummaryBoard').hide('slow');
    } else {
      // the checkbox was unchecked
      $('#taskList').hide('slow');
      $('#taskSummaryBoard').show('slow');
    }
  },
  'click #add-task-button': function showContextMenu() {
    $('#contextMenu').toggle('slow');
  },
});

Template.taskList.onRendered( function taskListOnDisplay() {
  $('.scroll').slimScroll({
    height: '250px',
  });
});

Template.addTaskDisplay.onRendered( function renderContextMenu() {
  // $(".modal-content").leanModal();
  $('#datepicker').datepicker();
  $( '#slider').slider({
    range: 'min',
    value: 15,
    min: 15,
    max: 300,
    step: 15,
    slide: function(event, ui) {
      $('#task_est_time').val( ui.value );
    },
  });

  // $('select').material_select();
});

// allows addTask.html to add tasks
Template.addTaskDisplay.events({
  // submit information for new row
  'click #submit-new-task': function addTask(event, template) {
    event.preventDefault();
    const name = template.find('[name="name"]').value;

    const priorityField = template.find('[name="priority"]');
    const priority = priorityField.options[priorityField.selectedIndex].text;

    const date = template.find('[name="date"]').value;
    const time = template.find('[name="est"]').value;

    Meteor.call('addTask', name, priority, date, time, null);
    // Session.set('showAddTask', false);
    // Session.set('showFrontPage', true);
  },
  'click #remove-new-task': function shrinkContextMenu(event) {
    event.preventDefault();
    $('#contextMenu').hide('slow');
  },
  'change #slider': function moveSlider(event) {
    event.preventDefault();
    $('#amount').val('$' + $('#slider').slider('value'));
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
