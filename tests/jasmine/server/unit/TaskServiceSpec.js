describe('TaskService', function TaskServiceSpec() {
  beforeEach(function TaskServiceSpec$beforeEach() {
    MeteorStubs.install();
  });

  afterEach(function TaskServiceSpec$afterEach() {
    MeteorStubs.uninstall();
  });

  describe('addTask', function TaskServiceSpec$addTask() {
    it('should add a task to the user', function TaskServiceSpec$addTaskFunc() {
      // SETUP
      spyOn(Tasks, 'insert');
      const userName = Meteor.userId();
      const taskName = 'Math hw#5';
      const priority = 'High';
      const date = '05/21/2015';
      const time = 100;
      const taskDetail = 'Problems 1, 2, 4 on pg 12';
      // EXECUTE
      TaskService.addTask(userName, taskName, priority, date, time, taskDetail);
      // VERIFY
      expect(Tasks.insert).toHaveBeenCalledWith({ user: userName,
                                                  task: { _taskName: taskName,
                                                          _priority: priority,
                                                          _deadline: new Date(date),
                                                          _estTime: time,
                                                          _taskDetails: taskDetail,
                                                          _timeSpent: 0,
                                                        },
                                                }, jasmine.any(Function));
    });
  });

  describe('deleteTask', function TaskServiceSpec$deleteTask() {
    it('should delete a task given the task id', function TaskServiceSpec$deleteTaskFunc() {
      spyOn(Tasks, 'remove');
      const taskId = 1;
      TaskService.deleteTask(taskId);

      expect(Tasks.remove).toHaveBeenCalledWith(1);
    });
  });
});
