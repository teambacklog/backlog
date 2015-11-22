describe('TaskSpec', function TaskSpec() {
  beforeEach(function TaskSpec$beforeEach() {
    MeteorStubs.install();
  });

  afterEach(function TaskSepc$afterEach() {
    MeteorStubs.uninstall();
  });

  describe('updateTaskDetails', function TaskSepc$updateTaskDetails() {
    const TASK_NAME = 'Math hw#5';
    const PRIORITY = 'High';
    const DATE = '05/21/2015';
    const EST_TIME = 100;
    const TASK_DETAIL = 'Problems 1, 2, 4 on pg 12';
    const TASK_ID = 1;

    var taskDoc;
    var taskObj;

    taskDoc = {
                _taskName: TASK_NAME,
                _priority: PRIORITY,
                _deadline: new Date(DATE),
                _estTime: EST_TIME,
                _taskDetails: TASK_DETAIL,
                _timeSpent: 0,
                _id: TASK_ID,
              };

    taskObj = new Task(taskDoc);

    it('should update task detail', function TaskSpec$updateTaskDetailsFunc() {
      spyOn(Tasks, 'update');
      const newDetails = 'New details!';

      taskObj.updateTaskDetails(newDetails);

      expect(Tasks.update).toHaveBeenCalledWith({ _id: TASK_ID },
                                                  { $set:
                                                    { 'task._taskDetails': newDetails},
                                                });
    });

    it('should update task name', function TaskSpec$updateTaskNameFunc() {
      spyOn(Tasks, 'update');
      const newName = 'New name!';
      taskObj.updateTaskName(newName);

      expect(Tasks.update).toHaveBeenCalledWith({ _id: TASK_ID },
                                                { $set:
                                                  { 'task._taskName': newName},
                                                });
    });

    it('should update task est time', function TaskSpec$updateTaskEstTimeFunc() {
      spyOn(Tasks, 'update');
      const newTime = 10;
      taskObj.updateEstTime(newTime);

      expect(Tasks.update).toHaveBeenCalledWith({ _id: TASK_ID },
                                                  { $set:
                                                    { 'task._estTime': newTime},
                                                });
    });

    it('should update task time spent', function TaskSpec$updateTaskEstTimeFunc() {
      spyOn(Tasks, 'update');
      const newTime = 10;
      taskObj.updateTimeSpent(newTime);

      expect(Tasks.update).toHaveBeenCalledWith({ _id: TASK_ID },
                                                  { $set:
                                                    { 'task._timeSpent': newTime},
                                                });
    });
  });
});
