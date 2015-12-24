Meteor.startup( function Client$Meteor$start() {
  Meteor.subscribe('tasks');
});

/* calculate the earliest deadline, and if it is due in
 *   five days, warn the user
 */
Accounts.onLogin( function Client$Meteor$LogIn() {
  // TODO: make sure earDate actually exist
  /*
  const currDate = new Date();
  const earDate = TaskScheduler._earliestDueDate();
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  const year = earDate.deadline.getFullYear();
  const month = earDate.deadline.getMonth();
  const date = earDate.deadline.getDate();

  const utc1 = Date.UTC(currDate.getFullYear(), currDate.getMonth(), currDate.getDate());
  const utc2 = Date.UTC(year, month, date);

  if (Math.floor((utc1 - utc2) / _MS_PER_DAY) < 5) {
    Materialize.toast('Incoming Deadline!\n'
      + '"' + earDate.taskName + '": ' + month + '/' + date + '/' + year, 5000);
  }
  */
});
