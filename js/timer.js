game.Timer = Object.extend({
  init : function() {
    this.start = me.timer.getTime();
    this.elapsed = 0;
    this.pauseStartTime = null;
    this.last = me.timer.getTime();
  },

  pause : function() {
    this.pauseStartTime = me.timer.getTime();
  },
  
  restart : function() {
    this.start = me.timer.getTime();
    this.last = me.timer.getTime();
  },

  resume : function() {
    this.pauseStartTime = null;
    this.last = me.timer.getTime();
  },

  update : function() {
    var n = me.timer.getTime();
    this.elapsed += n - this.last;
    this.last = n;
  }
});