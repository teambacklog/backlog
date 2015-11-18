describe('TaskSpec', function TaskSpec() {
  beforeEach(function TaskSpec$beforeEach() {
    MeteorStubs.install();
  });

  afterEach(function TaskSepc$afterEach() {
    MeteorStubs.uninstall();
  });

  describe('updateTaskDetails', function TaskSepc$updateTaskDetails() {
    it('should update task detail database', function TaskSpec$updateTaskDetailsFunc() {
      var taskDoc;
      var taskObj;

      spyOn(Tasks, 'update');

      const taskName = 'Math hw#5';
      const priority = 'High';
      const date = '05/21/2015';
      const time = 100;
      const taskDetail = 'Problems 1, 2, 4 on pg 12';
      const newDetails = 'New details!';
      taskDoc = { _taskName: taskName,
                      _priority: priority,
                      _deadline: new Date(date),
                      _estTime: time,
                      _taskDetails: taskDetail,
                      _timeSpent: 0,
                      _id: 1,
                    };
      taskObj = new Task(taskDoc);

      taskObj.updateTaskDetails(newDetails);

      expect(Tasks.update).toHaveBeenCalledWith({ _id: taskObj.taskId },
                                                  { $set: { 'task._taskDetails': newDetails},
                                                });
    });
  });
});
