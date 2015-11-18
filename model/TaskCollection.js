/*
TaskCollection.js
Function: holds global Task collection
*/

Tasks = new Mongo.Collection('tasks', {
  // transform all MongoDB elements to 'Task' objects
  transform: function transformToTask(doc) {
    let task = new Task(doc.task);
    return task;
  },
});
