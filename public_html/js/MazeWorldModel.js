

//--
// This holds the world model with the maze in interval
var MazeWorldModel = {
  pathWidth : 10, //Width of the Maze Path
  wallWidth: 2, //Width of the Walls between Paths
  outerWall : 2, //Width of the Outer most wall
  width : 20, //Number paths fitted horisontally
  height : 20, //Number paths fitted vertically
  delay : 0.1, //Delay between algorithm cycles
  xStart : 0, //Horisontal starting position
  yStart : 0, //Vertical starting position
  seed : (Math.random() * 100000) | 0, //Seed for random numbers
  wallColor : "#d24", //Color of the walls
  pathColor : "#222a33", //Color of the path

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
  blockPercentage : function(percentage)
  {
  	for (var i = 0; i < this.height * 2; i++)
  	{
  		for (var j = 0; j < this.width * 2; j++)
  		{
  			var random_boolean = Math.random() >= 1-percentage;
        if (random_boolean)
  			   this.map[i][j] = random_boolean;
  		}
  	}
  },
  BlockCircle : function(centerX, centerY, radius,value, colour)
  {
  	for (var i = 0; i < this.height * 2; i++)
  	{
  		for (var j = 0; j < this.width * 2; j++)
  		{
        if ((centerX-i )*(centerX-i )+ (centerY -j)*(centerY -j) > radius*radius)
        {
          this.FillSquare(i,j, colour);
  			   this.map[i][j] = value;
       }
       else {
         //this.FillSquare(i,j, colour);
       }
  		}
  	}
  },


  FillSquare : function(x,y,colour)
  {
    offset = this.pathWidth / 4 + this.outerWall/2;
    //offset /=2.0;

    ctx.beginPath();
    ctx.lineWidth="1";
    ctx.strokeStyle=colour;
    var blocksize = 0.5* (this.pathWidth + this.wallWidth*2);
    var x1 = x * blocksize ;//+ offset ;
    var y1 = y * blocksize;// + offset;
    var x2 = blocksize;
    var y2=  blocksize;
    ctx.rect(x1,y1,x2,y2);
    ctx.stroke();
/*
    ctx.moveTo(0.5*x* (this.pathWidth + this.wallWidth) +offset,
            0.5*y* (this.pathWidth + this.wallWidth)  +offset)
            ctx.lineTo(0.5*(x+1)* (this.pathWidth + this.wallWidth)  +offset,
                    0.5*(y+1)* (this.pathWidth + this.wallWidth)  +offset)
            ctx.stroke();
            */
  },


  UnBlockCircle : function(centerX, centerY, radius)
  {
    var percentage = 0.5;
    for (var i = 0; i < this.height * 2; i++)
    {
      this.map[i] = [];
      for (var j = 0; j < this.width * 2; j++)
      {
      //  this.map[i][j] = false;
        var random_boolean = Math.random() >= 1-percentage;
  			map[i][j] = random_boolean;
      }
    }
  },

  randomGen : function(seed)
  {
    if (seed === undefined) var seed = performance.now();
    return function() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
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
    if(0) this.BlockCircle(10,10,4,true,'blue');
    ConsolePrintMap();


    this.xStart = 5;// = (this.width / 2) | 0; //Horisontal starting position
  	this.yStart = 5;//= (this.height / 2) | 0; //Vertical starting position

  	//route starts here.
    this.map[this.yStart * 2][this.xStart * 2] = true;

  	//Begining of Route
    this.route = [[this.xStart, this.yStart]];

  	//Start Drawing
    ctx.moveTo(
      this.convertGridToPos(this.xStart),
      this.convertGridToPos(this.yStart));

    //  this.xStart * (this.pathWidth + this.wallWidth) + offset,
    //  this.yStart * (this.pathWidth + this.wallWidth) + offset);
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
              ctx.strokeStyle='black';
        ctx.moveTo(
          //this.route[this.route.length - 1][0] * (this.pathWidth + this.wallWidth) + offset,
          //   this.route[this.route.length - 1][1] * (this.pathWidth + this.wallWidth) + offset
          this.convertGridToPos(this.route[this.route.length - 1][0]),
        this.convertGridToPos(this.route[this.route.length - 1][1])
        );
        timer = setTimeout(this.loop.bind(this), this.delay);
      }
  		else
      {
        //done
        console.log("Done");
        console.log("unsetting");
  			ConsolePrintMap();
        //if(1) this.BlockCircle(40,40,20,false);

        console.log("unset");
	       ConsolePrintMap();

  		}

      return;
    }

  	//Pick a random Direction from the possibles and add it onto the route.
    direction = frontier[(random() * frontier.length) | 0];
    this.route.push([direction[0] + x, direction[1] + y]);

  	// Draw the new step
    ctx.lineTo(    (direction[0] + x) * (this.pathWidth + this.wallWidth) + offset, (direction[1] + y) * ( this.pathWidth +  this.wallWidth) + offset );

  	// Assign the map as visited
  	var x1 = (direction[1] + y) * 2;
  	var y1 = (direction[0] + x) * 2;
  	var x2 = direction[1] + y * 2;
  	var y2 = direction[0] + x * 2;
    this.map[x1][y1] = true;
    this.map[x2][y2] = true;

  	ctx.stroke();
    timer = setTimeout(this.loop.bind(this), this.delay);
  },
   drawplayer:function(ctx)
  {

   var blocksize =(MazeWorldModel.pathWidth + MazeWorldModel.wallWidth);
    ctx.beginPath();
    var half = this.pathWidth/2;
  	ctx.fillStyle = "Green";
  //	offset = this.pathWidth / 2 + this.outerWall;

  	xpos = 0.5*MazeWorldModel.GetPlayerX() * blocksize;//+ offset;
  	ypos = 0.5*MazeWorldModel.GetPlayerY() * blocksize;//+ offset;
  //	ctx.arc(xpos,ypos, half, 0, 2*Math.PI);
  ctx.arc(this.convertGridToPos(this.GetPlayerX()),this.convertGridToPos(this.GetPlayerY()), half, 0, 2*Math.PI);
  ctx.fill();


  },
  convertGridToPos: function(grid)
  {
    offset = this.pathWidth / 2 + this.outerWall;
    return grid*(this.pathWidth + this.wallWidth) + offset
  },

  CanMove : function (x, y)
  {
    if (typeof this.map == "undefined")
      console.log("Problem");

    var notOffEdge = (y>=0) && (y<this.map.length) && (x >= 0) && (x < this.map[y].length);
    if (notOffEdge)
    {

      if (this.map[y][x] == true)
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

  GetBoardLength: function()
  {
    return this.map.length;
  },

  GetBoardWidth: function()
  {
      return  this.map[1].length;
  },
  GetPlayerX: function()
  {
    return  this.player.x/2;
  },
  GetPlayerY: function()
  {
      return  this.player.y/2;
  },


  Filled: function(x,y)
  {
    return this.board[x][y];
  },




  //Check to see if the new space is inside the board and not a wall


  KeyUp: function(e)
  {
      if((e.which == 38) && this.CanMove(this.player.x, this.player.y-1))//Up arrow
      {
        this.player.y-=2;
      }
      else if((e.which == 40) &&  this.CanMove(this.player.x, this.player.y+1)) // down arrow
      {
        this.player.y+=2;
      }
      else if((e.which == 37) &&  this.CanMove(this.player.x-1, this.player.y))
      {
        this.player.x-=2;
      }
      else if((e.which == 39) &&  this.CanMove(this.player.x+1, this.player.y))// right?
      {
        this.player.x+=2;
      }
      e.preventDefault();
      ConsolePrintMap();

  },


}
