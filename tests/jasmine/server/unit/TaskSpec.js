describe('TaskSpec', function TaskSpec() {
  beforeEach(function TaskSpec$beforeEach() {
    MeteorStubs.install();

    /*
    const userId = 'woah';
    const taskName = 'Math hw#5';
    const priority = 'High';
    const date = '05/21/2015';
    const time = 100;
    const taskDetail = 'Problems 1, 2, 4 on pg 12';
    const newDetails = 'New details!';
    const id = 1;
    */

    // TaskService.addTask(userId, taskName, priority, date, estTime, taskDetails);
  });

  afterEach(function TaskSepc$afterEach() {
    MeteorStubs.uninstall();
  });

  describe('updateTaskDetails', function TaskSepc$updateTaskDetails() {
    var taskDoc;
    var taskObj;

    const taskName = 'Math hw#5';
    const priority = 'High';
    const date = '05/21/2015';
    const time = 100;
    const taskDetail = 'Problems 1, 2, 4 on pg 12';
    const id = 1;

    taskDoc = { _taskName: taskName,
                  _priority: priority,
                  _deadline: new Date(date),
                  _estTime: time,
                  _taskDetails: taskDetail,
                  _timeSpent: 0,
                  _id: id,
              };

    taskObj = new Task(taskDoc);

    it('should update task detail', function TaskSpec$updateTaskDetailsFunc() {
      spyOn(Tasks, 'update');
      const newDetails = 'New details!';

      taskObj.updateTaskDetails(newDetails);

      expect(Tasks.update).toHaveBeenCalledWith({ _id: id },
                                                  { $set: { 'task._taskDetails': newDetails},
                                                });
    });

    it('should update task name', function TaskSpec$updateTaskNameFunc() {
      spyOn(Tasks, 'update');
      const newName = 'New name!';
      taskObj.updateTaskName(newName);

      expect(Tasks.update).toHaveBeenCalledWith({ _id: id },
                                                  { $set: { 'task._taskName': newName},
                                                });
    });

    it('should update task est time', function TaskSpec$updateTaskEstTimeFunc() {
      spyOn(Tasks, 'update');
      const newTime = 10;
      taskObj.updateEstTime(newTime);

      expect(Tasks.update).toHaveBeenCalledWith({ _id: id },
                                                  { $set: { 'task._estTime': newTime},
                                                });
    });

    it('should update task time spent', function TaskSpec$updateTaskEstTimeFunc() {
      spyOn(Tasks, 'update');
      const newTime = 10;
      taskObj.updateTimeSpent(newTime);

      expect(Tasks.update).toHaveBeenCalledWith({ _id: id },
                                                  { $set: { 'task._timeSpent': newTime},
                                                });
    });
  });

});
