/*
TaskCollection.js
Function: holds global Task collection
*/

Tasks = new Mongo.Collection('tasks', {
  transform: function transformToTask(doc) {
    var task = new Task(doc.task);
    //console.log(task);
    return task;
  }
});
