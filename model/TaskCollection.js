/*
TaskCollection.js
Function: holds global Task collection
*/

Tasks = new Mongo.Collection('tasks', {
  transform: function transformToTask(doc) {
    var taskBson = doc.task;
    return new Task(taskBson);
  },
});
