game.Background = me.Renderable.extend({
  init : function() {
    this.parent(new me.Vector2d(0, 0), 480, 320);
    this.z = 1;
  },

  draw : function(ctx) {
    me.video.clearSurface(ctx, '#fff');
  }
});
