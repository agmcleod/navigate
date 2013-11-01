(function() {
  var variableWidth = 300;
  var xBorders = Array(2);
  var yVelocity = 1;
  var xVarianceAmount = 30;
  game.Track = me.Renderable.extend({
    init : function() {
      var half = me.game.viewport.width / 2;
      var startX = half - variableWidth / 2;
      var freq = Number.prototype.random(4, 6);
      this.leftVectors = Array(freq);
      var i = 0;
      for(var p = freq; p >= 0; p--) {
        var y = p / freq * me.game.viewport.height;
        this.leftVectors[i] = new me.Vector2d(startX + this.edgeVariance(), y);
        i++;
      }
      this.parent(new me.Vector2d(0, 0), me.game.viewport.width, me.game.viewport.height);
      this.z = 2;
      this.time = me.timer.getTime();
      variableWidth = 300;
      xBorders = Array(2);
      yVelocity = 1;
      xVarianceAmount = 30;
    },

    draw : function(context) {
      context.save();
      context.beginPath();
      context.moveTo(this.leftVectors[0].x, this.leftVectors[0].y);
      for(var v = 1; v < this.leftVectors.length; v++) {
        var vector = this.leftVectors[v];
        context.lineTo(vector.x, vector.y);
      }
      for(var v = this.leftVectors.length - 1; v >= 0; v--) {
        var vector = this.leftVectors[v];
        context.lineTo(vector.x + variableWidth, vector.y);
      }
      context.lineTo(this.leftVectors[0].x, this.leftVectors[0].y);
      context.fillStyle = '#fff';
      context.fill();
      context.restore();
    },

    edgeVariance : function() {
      return Number.prototype.random(-xVarianceAmount, xVarianceAmount);
    },

    getXBorders : function() {
      return xBorders;
    },

    update : function() {
      for(var i = 0; i < this.leftVectors.length; i++) {
        this.leftVectors[i].y += yVelocity;
      }
      if(this.leftVectors[1].y > me.game.viewport.height) {
        this.leftVectors.slice(0, 1);
      }
      if(this.leftVectors[this.leftVectors.length-1].y >= 0) {
        var x = me.game.viewport.width / 2 - variableWidth / 2 + this.edgeVariance();
        this.leftVectors.push(new me.Vector2d(x, -1 * Number.prototype.random(100, 130)));
      }

      this.updateXBorders();

      if(me.timer.getTime() - this.time > 3000) {
        if(variableWidth > 150) {
          variableWidth -= 10;
        }
        else {
          xVarianceAmount += 2;
        }
        yVelocity += 0.2;
        this.time = me.timer.getTime();
      }

      return true;
    },

    updateXBorders : function() {
      var forY = game.piece.pos.y + (game.piece.d / 2);
      var pointOne, pointTwo;
      for(var i = 0; i < this.leftVectors.length; i++) {
        var vector = this.leftVectors[i];
        if(vector.y < forY) {
          pointOne = this.leftVectors[i-1];
          pointTwo = vector;
          break;
        }
      }

      var slope = game.math.slope(pointOne, pointTwo);
      xBorders[0] = game.math.xFromSlope(forY, slope, game.math.getYIntercept(pointOne, slope));
      xBorders[1] = xBorders[0] + variableWidth;
    },
  });
}).call(this);
