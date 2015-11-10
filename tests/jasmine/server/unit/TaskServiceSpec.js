describe('TaskService', function TaskServiceSpec() {
  beforeEach(function beforeEach() {
    MeteorStubs.install();
    // Need to sign up and sign up w/ a temporary user
  });

  afterEach(function afterEach() {
    MeteorStubs.uninstall();
  });

  describe('addTask', function TaskServiceSpec$addTask() {
    it('should add a task to the user', function TaskServiceSpec$addTask$1() {
      // SETUP
      spyOn(Tasks, 'insert');
      const user = Meteor.userId();
      // text from text fields
      const name = 'Math hw#5';
      const priority = 'High';
      const date = '2015-05-21';
      const time = 100;
      // EXECUTE
      TaskService.addTask(user, name, priority, date, time);
      // VERIFY
      // TODO: More things to expect
      expect(Tasks.insert).toHaveBeenCalled();
    });
  });
});
