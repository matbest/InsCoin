var MazeCreator = {
  type: "circle",
  centerX : 10,
  centerY :10,
  radius: 7,
  startX: 6,
  startY: 6,

  Start : function()
  {     ConsolePrintMap();
        MazeWorldModel.MarkPlacesForRouteFinding(this.centerX,this.centerY,this.radius,true,'pink',true);
        ConsolePrintMap();
  },
  Finish : function()
  {
    ConsolePrintMap();
      MazeWorldModel.MarkWallsForRouteFinding(this.centerX,this.centerY,this.radius,true,'pink',false);
ConsolePrintMap();
  //  MazeWorldModel.FillSquare(this.startX,this.startY,'green',0.5);
  }
}
