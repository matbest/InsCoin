
ConsolePrintMap = function()
{
	console.log("Player at ", MazeWorldModel.player.x, ",",MazeWorldModel.player.y);
	var row = "";
	console.log("Map size is ", width, "X",height);
	console.log(" #  = blocked , = traversable wall . = free space");
	console.log(" True is traversable, false is blocked");
	console.log("Odd numbers in the arrays are walls, even positions are possible locations to be.")
	//Evens are the spaces, odds are the walls.
	for (var i = 0; i < height * 2; i++)
	{
		row = row.concat(i);
		for (var j = 0; j < width * 2; j++)
		{
			if (MazeWorldModel.player.x == j && MazeWorldModel.player.y == i)
				row = row.concat("X");
			else
			{
				if (MazeWorldModel.map[i][j] === true)
				  if((i%2 == 1) ||( j %2 == 1 ))
					{
						row = row.concat(","); // traversable wall
					}
					else
					{
						row = row.concat("."); // Free space
					}
				else
					row = row.concat("#"); // blocked wall
				}
		}
		console.log(row);
		row= "";
	}
}

MazeWorldModel.init();
EthereumConnection.init();
SetupBuyButton(0,0);

inputWidth = document.getElementById("width");
inputHeight = document.getElementById("height");
inputPathWidth = document.getElementById("pathwidth");
inputWallWidth = document.getElementById("wallwidth");
inputOuterWidth = document.getElementById("outerwidth");
inputPathColor = document.getElementById("pathcolor");
inputWallColor = document.getElementById("wallcolor");
inputSeed = document.getElementById("seed");
buttonRandomSeed = document.getElementById("randomseed");

settings =
{
  display: function()
	{
    inputWidth.value = MazeWorldModel.width;
    inputHeight.value = MazeWorldModel.height;
    inputPathWidth.value = MazeWorldModel.pathWidth;
    inputWallWidth.value = MazeWorldModel.wallWidth;
    inputOuterWidth.value = MazeWorldModel.outerWall;
    inputPathColor.value = MazeWorldModel.pathColor;
    inputWallColor.value = MazeWorldModel.wallColor;
    inputSeed.value = MazeWorldModel.seed;
  },
  check: function()
	{
    if ( inputWidth.value != width ||
      inputHeight.value != height ||
      inputPathWidth.value != pathWidth ||
      inputWallWidth.value != wallWidth ||
      inputOuterWidth.value != outerWall ||
      inputPathColor.value != pathColor ||
      inputWallColor.value != wallColor ||
      inputSeed.value != seed )
		{
      settings.update();
    }
  },
  update: function()
	{
  //  clearTimeout(timer);
    width = parseFloat(inputWidth.value);
    height = parseFloat(inputHeight.value);
    pathWidth = parseFloat(inputPathWidth.value);
    wallWidth = parseFloat(inputWallWidth.value);
    outerWall = parseFloat(inputOuterWidth.value);
    pathColor = inputPathColor.value;
    wallColor = inputWallColor.value;
    seed = parseFloat(inputSeed.value);
    x = (width / 2) | 0;
    y = (height / 2) | 0;
    MazeWorldModel.init();
    MazeWorldModel.loop();
  }
};

buttonRandomSeed.addEventListener("click", function()
{
  inputSeed.value = (Math.random() * 100000) | 0;
});


settings.display();
//MazeWorldModel.loop();

setInterval(settings.check, 400);

// --------------------------------------------------------
// End of the generation part -----------------------------
// --------------------------------------------------------
//

	UpdateBuyButton = function(e)
	{
		if (EthereumConnection.connected)
		{
			if (typeof SetupBuyButton !== "undefined")
				SetupBuyButton(MazeWorldModel.player.x,MazeWorldModel.player.y);
		}
		else {
			console.log("Ethereum not connected");
		}
		e.preventDefault();

	};



var el = function(id){ return document.querySelector(id); };
//Draw the game board
function draw(wm)
{
		var canvas = document.getElementById("movingcanvas");
		var width = canvas.width;

		var boardlength = MazeWorldModel.GetBoardLength();
		var boardwidith = MazeWorldModel.GetBoardWidth();

		var blockSize = width/ boardlength;
		var ctx = canvas.getContext('2d');
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, width, width);
		ctx.fillStyle="white";

    //Draw the player
		MazeWorldModel.drawplayer(ctx);

}
document.addEventListener("keyup",MazeWorldModel.KeyUp.bind(MazeWorldModel));
document.addEventListener("keyup",UpdateBuyButton);
document.addEventListener("keyup",draw);
