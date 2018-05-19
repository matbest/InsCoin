

//--
// This holds the world model with the maze in interval
var MazeWorldModel = {

  delay : 1, //Delay between algorithm cycles

  seed : (Math.random() * 100000) | 0, //Seed for random numbers
  wallColor : "green", //Color of the walls
  pathColor : "blue", //Color of the path


  GetMap:function(i,j)
  {
    if (i<this.GetBoardLength())
      if (j<this.GetBoardWidth())
        return MazeWorldCore.map[i][j];
    return
  },
  SetMap:function(i,j,value)
  {
    return MazeWorldCore.map[i][j] = value;
  },
  GetBoardLength: function()
  {
    return MazeWorldCore.map.length;
  },
  GetBoardWidth: function()
  {
      return  MazeWorldCore.map[1].length;
  },


init : function()
{
  MazeWorldCore.init();
  // put the player at the start of the mazecanvas
  MazeWorldCore.player.x = MazeCreator.startX;
  MazeWorldCore.player.y = MazeCreator.startY;
  MazeWorldCore.loop();

},
  blockPercentage : function(percentage)
  {
  	for (var i = 0; i < this.height * 2; i++)
  	{
  		for (var j = 0; j < this.width * 2; j++)
  		{
  			var random_boolean = Math.random() >= 1-percentage;
        if (random_boolean)
  			   this.SetMap(i,j,random_boolean);
  		}
  	}
  },
  IsWall: function(x,y)
  {
    return (this.IsHorizontalWall(x,y) || this.IsVerticalWall(x,y));
  },
  IsHorizontalWall: function(x,y)
  {
    return ((x%2 == 0 ) && (y%2 ==1 ));
  },
  IsVerticalWall: function(x,y)
  {
    return ((x%2 == 1 ) && (y%2 ==0 ));
  },
  IsPlace: function(x,y)
  {
    if  ((x > this.height * 2-1)
          || (x < 0)
          || (y > this.width * 2-1)
          || (y< 0) )
    	return false;
    return ((x%2 ==0 ) && (y%2 ==0 ));
  },
  SafeSetMap: function(x,y,value)
  {
    if (this.IsPlace(x,y))
      this.SetMap(i,j,value);
  },

  MarkPlacesForRouteFinding : function(centerX, centerY, radius,value, colour, draw)
  {
  	for (var i = 0; i < MazeWorldCore.height * 2; i++)
  	{
  		for (var j = 0; j < MazeWorldCore.width * 2; j++)
  		{
        if (this.IsPlace(i,j))
        {
          // if this place is outside of the radius then set its value from the argument
          if ((centerX-i )*(centerX-i )+ (centerY -j)*(centerY -j) >= radius*radius)
          {
              this.SetMap(i,j,value);
          }
          else
          {

           if (draw)
              this.FillSquare(i/2,j/2, colour,2);
          }
        }
  		}
  	}
        ctx.closePath();
  },
  MarkWallsForRouteFinding : function(centerX, centerY, radius,value, colour, draw)
  {
  	for (var i = 0; i < MazeWorldCore.height * 2; i++)
  	{
  		for (var j = 0; j < MazeWorldCore.width * 2; j++)
  		{
        if (this.IsWall(i,j))
        {
          // if this place is outside of the radius then set its value from the argument
          if ((centerX-i )*(centerX-i )+ (centerY -j)*(centerY -j) > radius*radius)
          {
              this.SetMap(i,j,value);
          }
          else
          {

           if (draw)
              this.FillSquare(i/2,j/2, colour,2);
          }
        }
  		}
  	}
        ctx.closePath();
  },


 count : 0,
  FillSquare : function(x,y,colour, scale =1 )
  {
    console.log("Filling Square",this.count++,x,y,colour);
    var blocksize = (MazeWorldCore.pathWidth -MazeWorldCore.wallWidth*2);
    blocksize *=scale;
    var x1 = MazeWorldCore.convertGridToPos(x)- blocksize/2;
    var y1 = MazeWorldCore.convertGridToPos(y)-  blocksize/2;
    var x2 = blocksize;
    var y2 = blocksize;
    ctx.fillStyle='black';
    ctx.fillRect(x1,y1,x2,y2);
  },



  drawplayer:function(ctx)
  {
    ctx.beginPath();
    var half = MazeWorldCore.pathWidth/2;
    ctx.fillStyle = "red";
    ctx.arc(MazeWorldCore.convertGridToPos(this.GetPlayerX()),MazeWorldCore.convertGridToPos(this.GetPlayerY()), half, 0, 2*Math.PI);
    ctx.fill();

  },



  CanMove : function (x, y)
  {
    console.log("testig to see if ",x,y," accessible");
    if (typeof this.map == "undefined")
      console.log("Problem");

    var notOffEdge = (y>=0) && (y<MazeWorldCore.map.length) && (x >= 0) && (x < MazeWorldCore.map[y].length);
    if (notOffEdge)
    {

      if (MazeWorldCore.map[y][x] == true)
      {
        return true;
      }
      else
      {
        console.log("Blocked at (",x,",",y,")");
        return false;
      }

    }
    return  notOffEdge && notBlocked;
  },
  GetPlayerX: function()
  {
    return  MazeWorldCore.player.x/2;
  },
  GetPlayerY: function()
  {
      return  MazeWorldCore.player.y/2;
  },
  //Check to see if the new space is inside the board and not a wall
  KeyUp: function(e)
  {
    console.log("player at ",MazeWorldCore.player.x, MazeWorldCore.player.y);
      if((e.which == 38) && this.CanMove(MazeWorldCore.player.x, MazeWorldCore.player.y-1))//Up arrow
      {
        MazeWorldCore.player.y-=2;
      }
      else if((e.which == 40) &&  this.CanMove(MazeWorldCore.player.x, MazeWorldCore.player.y+1)) // down arrow
      {
        MazeWorldCore.player.y+=2;
      }
      else if((e.which == 100)||(e.which == 37) &&  this.CanMove(MazeWorldCore.player.x-1, MazeWorldCore.player.y)) // left
      {
        MazeWorldCore.player.x-=2;
      }
      else if((e.which == 102)||(e.which == 39) &&  this.CanMove(MazeWorldCore.player.x+1, MazeWorldCore.player.y))// right?
      {
        MazeWorldCore.player.x+=2;
      }
      e.preventDefault();
      ConsolePrintMap();

  },


}
