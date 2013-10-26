game.PlayScreen = me.ScreenObject.extend({
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
    me.game.world.addChild(game.track)
  },


  /**  
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
    // remove the HUD from the game world
    me.game.world.removeChild(me.game.world.getEntityByProp("name", "HUD")[0]);
    me.input.unbindKey(me.input.KEY.LEFT);
    me.input.unbindKey(me.input.KEY.RIGHT);
  }
});
