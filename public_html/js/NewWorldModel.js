// This holds the world model with the maze in interval
var MazeWorldModel = {

  width : 20, // Number of Squares horizontally
  height : 20, //Number of Squares fitted vertically

  wallColor : "green", //Color of the walls
  pathColor : "blue", //Color of the path

  pathWidth : 10, //Width of the Maze Path
  wallWidth: 2, //Width of the Walls between Paths
  outerWall : 2, //Width of the Outer most wall


  xStart : 0, //Horisontal starting position
  yStart : 0, //Vertical starting position
  seed : (Math.random() * 100000) | 0, //Seed for random numbers


  map : [],
  walls : [],
  route: [],
  player: {
      x: 0,
      y: 0
  },
  AllocateMap : function()
  {
  	for (var i = 0; i < this.height ; i++)
  	{
  		this.map[i] = [];
  		for (var j = 0; j < this.width ; j++)
  		{
  			this.map[i][j] = false;
  		}
  	}

    for (var i = 0; i < this.height -1; i++)
    {
      this.walls[i] = [];
      for (var j = 0; j < this.width -1 ; j++)
      {
        this.walls[i][j] = false;
      }
    }

  },

  GetMap:function(i,j)
  {
    return this.map[i][j];
  },
