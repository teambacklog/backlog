Rows = new Mongo.Collection('rows');

if (Meteor.isClient) {

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
      Rows.remove(this._id);
    }
    ,
    // change time remaining on task by user input
    'submit .submitTime': function(event, template) {
      event.preventDefault();

      var timeToTake = event.target.submitTime.value;
      var timeLeft = this.amtTime;
      var timeRemaining = timeLeft - timeToTake;
      
      // if no time left, delete row
      if( timeRemaining <= 0){
        Rows.remove(this._id);
      } else {
        Rows.update(this._id, {
          $set: { amtTime: timeRemaining }
        });
      }
      event.target.submitTime.value = "";
    }
  });

  Template.contextMenu.events({
    // "collapse" popup menu
    'click .remove-new-task': function(event) {
      Session.set('displayContextMenu', false);
    }
    ,
    // submit information for new row
    'click .submit-new-task': function(event, template) {
      event.preventDefault(); 
      var name = template.find('[name="name"]').value;
      var time = template.find('[name="time"]').value;
      Rows.insert({
        Name: name,
        amtTime: time
      });
      Session.set('displayContextMenu', false);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
   
  });
}
