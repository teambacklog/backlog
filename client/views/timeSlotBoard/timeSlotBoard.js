Template.timeSlotBoard.events({
  'click #fifteen-min-opt': function Client$timeSlotBoard$fifteenMin() {
    Router.go('getTask', {minutes: 15});
  },
  'click #thirty-min-opt': function Client$timeSlotBoard$thirtyMin() {
    Router.go('getTask', {minutes: 30});
  },
  'click #one-hour-opt': function Client$timeSlotBoard$oneHour() {
    Router.go('getTask', {minutes: 60});
  },
});
