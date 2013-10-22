game.Piece = me.Renderable.extend({
  init : function() {
    var d = 64;
    this.parent(new me.Vector2d(me.game.viewport.width / 2 - d, me.game.viewport.height - d - 20), d, d);
    this.d = d;
    this.z = 2;
  },
  
  draw : function(context) {
    context.save();
    var r = this.d / 2;
    var gradient = context.createRadialGradient(this.pos.x + r,this.pos.y + r,10,this.pos.x + r / 2,this.pos.y + r / 2,this.d / 2);
    gradient.addColorStop(0, '#A7D30C');
    gradient.addColorStop(0.9, '#019F62');
    gradient.addColorStop(1, 'rgba(1,159,98,0)');

    context.fillStyle = gradient;
    context.fillRect(this.pos.x, this.pos.y, this.d, this.d);
    context.restore();
  }
});
