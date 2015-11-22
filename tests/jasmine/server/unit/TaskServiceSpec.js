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
      const USER_ID = "Tester";
      const TASK_NAME = 'Math hw#5';
      const PRIORITY = 'High';
      const DATE = '05/21/2015';
      const EST_TIME = 100;
      const TASK_DETAIL = 'Problems 1, 2, 4 on pg 12';
      const TASK_ID = 1;
      // EXECUTE
      TaskService.addTask(USER_ID, TASK_NAME, PRIORITY, DATE, EST_TIME, TASK_DETAIL);
      // VERIFY
      expect(Tasks.insert).toHaveBeenCalledWith({ user: USER_ID,
                                                  task: { _taskName: TASK_NAME,
                                                          _priority: PRIORITY,
                                                          _deadline: new Date(DATE),
                                                          _estTime: EST_TIME,
                                                          _taskDetails: TASK_DETAIL,
                                                          _timeSpent: 0,
                                                        },
                                                }, jasmine.any(Function));
    });
  });

  describe('deleteTask', function TaskServiceSpec$deleteTask() {
    it('should delete a task given the task id', function TaskServiceSpec$deleteTaskFunc() {
      spyOn(Tasks, 'remove');
      const TASK_ID = 1;
      TaskService.deleteTask(TASK_ID);

      expect(Tasks.remove).toHaveBeenCalledWith(TASK_ID);
    });
  });
});
