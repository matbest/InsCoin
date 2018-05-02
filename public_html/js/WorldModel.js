var WorldModel = {

  board : [
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
      [ 0, 0, 0, 0, 1, 1, 1, 0, 1, 0],
      [ 0, 1, 1, 0, 0, 0, 1, 0, 1, 0],
      [ 0, 0, 1, 1, 1, 1, 1, 0, 1, 0],
      [ 1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
      [ 1, 0, 1, 0, 1, 0, 0, 1, 1, 0],
      [-1, 0, 1, 0, 1, 1, 0, 0, 0, 0]
  ],

   player: {
      x: 0,
      y: 0
  },

  //playerx: 0,
  //playery: 0,

  CanMove : function (x, y)
  {
      return (y>=0) && (y<this.board.length) && (x >= 0) && (x < this.board[y].length) && (this.board[y][x] != 1);
  },

  GetBoardLength: function()
  {
    return this.board.length;
  },

  GetBoardWidth: function()
  {
      return  this.board[1].length;
  },
  GetPlayerX: function()
    {
        return  this.player.x;
    },
    GetPlayerY: function()
      {
          return  this.player.y;
      },


  Filled: function(x,y)
  {
    return this.board[y][x];
  }
}
