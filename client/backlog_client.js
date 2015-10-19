Meteor.subscribe("rows");

Rows = new Mongo.Collection("rows");

Meteor.startup( function(){  });

// defines what 'rows' and 'contextMenus' are when referenced in the HTML doc
Template.body.helpers({
  rows: function(){
      return Rows.find({});
  }
  ,
  // only if the "displayContextMenu" is true is there at most one object in the collection
  contextMenus: function(){
    if(Session.get('displayContextMenu')){
      return [{ }];
    } else { return []; }
  }
});


Template.body.events({
  // when clicked on, set "displayContextMenu" to true: meaning, show popup menu
  'click .add-new-task': function(event) {
    event.preventDefault();
    Session.set('displayContextMenu', true);
  }
});

Template.row.events({
  // delete row
  'click .delete': function(event) {
    //event.preventDefault();
    Meteor.call("deleteTask", this._id);
  },
  // change time remaining on task by user input
  'submit .submitTime': function(event, template) {
    //event.preventDefault();

    var timeToTake = event.target.submitTime.value;
    var timeLeft = this.amtTime;
    var timeRemaining = timeLeft - timeToTake;

    Meteor.call("submitTime", timeRemaining);

    event.target.submitTime.value = "";
  }
});

// allows addTask.html to add tasks
Template.contextMenu.events({
  // submit information for new row
  'click #submit-new-task': function(event, template) {
    event.preventDefault();
    //alert("called");
    // unique Meteor variable
    var user = Meteor.user();
    // text from text fields
    var name = template.find('[name="name"]').value;

    var priorityField = template.find('[name="priority"]');
    var priority = priorityField.options[priorityField.selectedIndex].text;
 
    var date = template.find('[name="date"]').value;
    var time = template.find('[name="est"]').value;

    Meteor.call("addTask", user, name, priority, date, time);
    //Session.set('showAddTask', false);
    //Session.set('showFrontPage', true);
  }
});

// Find tasks specific to this user
Template.taskList.rows = function(){
  return Rows.find({ User: Meteor.user() });
}
