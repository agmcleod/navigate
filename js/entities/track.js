(function() {
  var variableWidth = 300;
  game.Track = me.Renderable.extend({
    init : function() {
      var half = me.game.viewport.width / 2;
      var startX = half - 150;
      var freq = Number.prototype.random(4, 6);
      this.leftVectors = Array(freq);
      for(var i = 0; i <= freq; i++) {
        var y = i / freq * me.game.viewport.height;
        var rx = Number.prototype.random(-20, 20);
        this.leftVectors[i] = new me.Vector2d(startX + rx, y);
      }
      this.parent(new me.Vector2d(0, 0), me.game.viewport.width, me.game.viewport.height);
      this.z = 2;
    },

    draw : function(context) {
      context.save();
      context.beginPath();
      context.moveTo(this.leftVectors[0].x, this.leftVectors[0].y);
      for(var v = 1; v < this.leftVectors.length; v++) {
        var vector = this.leftVectors[v];
        context.lineTo(vector.x, vector.y);
      }
      for(var v = this.leftVectors.length - 1; v > -1; v--) {
        var vector = this.leftVectors[v];
        context.lineTo(vector.x + variableWidth, vector.y);
      }
      context.lineTo(this.leftVectors[0].x, this.leftVectors[0].y);
      context.fillStyle = '#fff';
      context.fill();
    },

    update : function() {

    }
  });
}).call(this);
