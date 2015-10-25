describe('TaskService', function() {
  beforeEach(function beforeEach() {
    MeteorStubs.install();
    // Need to sign up and sign up w/ a temporary user
    let userId = Accounts.createUser({
      username: 'UnitTester',
      password: 'P125jT!@25',
    });
  });

  afterEach(function afterEach() {
    MeteorStubs.uninstall();
  });

  describe('addTask', function TestAddTask() {
    it('should add a task to the user', function() {
      // SETUP
      spyOn(Tasks, 'insert');
      // EXECUTE
      TaskService.addTask(userId, 'high', '2015-02-15', 100, 'Math hw#5');
      // VERIFY
      expect(true).toBe(false); // Some test to make sure the unit test is running
      expect(Tasks.insert.calls.length).toEqual(1);
    });
  });
});
