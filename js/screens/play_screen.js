game.PlayScreen = me.ScreenObject.extend({
  init : function() {
    this.parent(true);
  },
  /**
   *  action to perform on state change
   */
  onResetEvent : function() {
    // reset the score
    game.data.score = 0;
    me.input.bindKey(me.input.KEY.LEFT, 'left');
    me.input.bindKey(me.input.KEY.RIGHT, 'right');
    me.game.world.addChild(new game.Background());
    me.game.world.addChild(new game.HUD.Container());
    game.piece = new game.Piece();
    game.track = new game.Track();
    me.game.world.addChild(game.piece);
    me.game.world.addChild(game.track);
    me.device.watchDeviceOrientation();
    this.time = me.timer.getTime();
  },


  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
    // remove the HUD from the game world
    me.input.unbindKey(me.input.KEY.LEFT);
    me.input.unbindKey(me.input.KEY.RIGHT);
    me.device.unwatchDeviceOrientation();
  },

  update : function() {
    var xBorders = game.track.getXBorders();
    if(game.piece.hitsEdge(xBorders)) {
      (function() {
        me.game.reset();
        game.loaded();
      }).defer();
    }

    if(me.timer.getTime() - this.time > 300) {
      game.data.score += 10;
      this.time = me.timer.getTime();
    }

    return true;
  }
});
