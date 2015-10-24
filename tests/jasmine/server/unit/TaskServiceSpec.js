describe('TaskService', function() {

  beforeEach(function() {
    MeteorStubs.install();
    // Need to sign up and sign up w/ a temporary user
    var userId = Accounts.createUser({
      username: 'UnitTester',
      password: 'P125jT!@25'
    });
  });

  afterEach(function() {
    MeteorStubs.uninstall();
  });

function(taskId, priority, deadline, estTime, taskDetails)

  describe('addTask', function() {
    it('should add a task to the user', function() {
      // SETUP
      spyOn(Tasks, "insert");
      // EXECUTE
      TaskService.addTask(userId, 'high', '2015-02-15', 100, 'Math hw#5');
      // VERIFY
      expect(true).toBe(false); // Some test to make sure the unit test is running
      expect(Tasks.insert.calls.length).toEqual(1);
    });
  });
});
