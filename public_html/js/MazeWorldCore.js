var MazeWorldCore = {

  pathWidth : 10, //Width of the Maze Path
  wallWidth: 2, //Width of the Walls between Paths
  outerWall : 2, //Width of the Outer most wall
  width : 20, //Number paths fitted horisontally
  height : 20, //Number paths fitted vertically

  width : 20, //Number paths fitted horisontally
  height : 20, //Number paths fitted vertically

  xStart : 0, //Horisontal starting position
  yStart : 0, //Vertical starting position
  seed : (Math.random() * 100000) | 0, //Seed for random numbers


  map : [],
  route: [],
  player: {
      x: 0,
      y: 0
  },
  AllocateMap : function()
  {
  	for (var i = 0; i < this.height * 2; i++)
  	{
  		this.map[i] = [];
  		for (var j = 0; j < this.width * 2; j++)
  		{
  			this.map[i][j] = false;
  		}
  	}
  },

  GetMap:function(i,j)
  {
    return this.map[i][j];
  },
  SetMap:function(i,j,value)
  {
    return this.map[i][j] = value;
  },
  GetBoardLength: function()
  {
    return this.map.length;
  },
  GetBoardWidth: function()
  {
      return  this.map[1].length;
  },
  convertGridToPos: function(grid)
  {
    offset = this.pathWidth / 2 + this.outerWall;
    return grid*(this.pathWidth + this.wallWidth) + offset
  },
  init : function()
  {

  	var canvas = document.getElementById("mazecanvas");
    //canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = this.outerWall * 2 + this.width * (this.pathWidth + this.wallWidth) - this.wallWidth;
    canvas.height = this.outerWall * 2 + this.height * (this.pathWidth + this.wallWidth) - this.wallWidth;

    ctx.fillStyle = this.wallColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = this.pathColor;
    ctx.lineCap = "square";

    ctx.lineWidth = this.pathWidth;
    ctx.beginPath();

    // Build empty Map
    random = this.randomGen(seed);

  	this.AllocateMap();
  	if(0)	this.blockPercentage(.1);
    ConsolePrintMap();


    //This draws a basic maze
    MazeCreator.Start();



    ctx.beginPath();

    ConsolePrintMap();


    this.xStart = MazeCreator.startX;// = (this.width / 2) | 0; //Horisontal starting position
  	this.yStart = MazeCreator.startY;//= (this.height / 2) | 0; //Vertical starting position

  	//route starts here.
    this.map[this.yStart * 2][this.xStart * 2] = true;

  	//Begining of Route
    this.route = [[this.xStart, this.yStart]];

  	//Start Drawing
    ctx.moveTo(
      this.convertGridToPos(this.xStart),
      this.convertGridToPos(this.yStart));
      ctx.stroke();
  },

  loop : function()
  {
  	routelength = this.route.length;

    x = this.route[routelength - 1][0] | 0; // |0 means cast to an int
    y = this.route[routelength - 1][1] | 0;

    var directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    var frontier = [];

    // Foreach direction (4)
    for (var i = 0; i < directions.length; i++)
  	{
  		// If the map location exists
  		// If the map location in the direction is false (unvisited)
      if ( this.map[(directions[i][1] + y) * 2] != undefined &&
        	 this.map[(directions[i][1] + y) * 2][(directions[i][0] + x) * 2] === false )
  		{
  			// add this as a possible direction
        frontier.push(directions[i]);
      }
    }

    // If there are no possible directions
    if (frontier.length === 0)
  	{
  		// Step back to a previous place where there was an direction possible
      this.route.pop();

  		// If there is still a route
      if (this.route.length > 0)
  		{
          ctx.strokeStyle='green';
          ctx.moveTo(
            this.convertGridToPos(this.route[this.route.length - 1][0]),
            this.convertGridToPos(this.route[this.route.length - 1][1]));
            ctx.stroke();
      //  timer = setTimeout(this.loop.bind(this), this.delay);
      this.loop();
    }
  		else
      {
        //done
        console.log("Done");
  			ConsolePrintMap();
        MazeCreator.Finish();
        console.log("unset");
	      ConsolePrintMap();
  		}
      return;
    }

  	//Pick a random Direction from the possibles and add it onto the route.#

    direction = frontier[(Math.random() * frontier.length) | 0];
    this.route.push([direction[0] + x, direction[1] + y]);

  	// Draw the new step
    ctx.strokeStyle='black';
    ctx.lineTo(  this.convertGridToPos(direction[0] + x),this.convertGridToPos(direction[1] + y));
    ctx.stroke();

  	// Assign the map as visited
  	var x1 = (direction[1] + y) * 2;
  	var y1 = (direction[0] + x) * 2;
  	var x2 = direction[1] + y * 2;
  	var y2 = direction[0] + x * 2;
    this.map[x1][y1] = true;
    this.map[x2][y2] = true;

    //Iterate on the search
    this.loop();
  },
  randomGen : function(seed)
  {
    if (seed === undefined) var seed = performance.now();
    return function() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
  }
}
