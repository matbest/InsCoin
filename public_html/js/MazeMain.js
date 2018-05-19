ConsolePrintMap = function()
{
	console.log("Player at ", MazeWorldCore.player.x, ",",MazeWorldCore.player.y);
	var row = "";
	console.log("Map size is ", MazeWorldCore.GetBoardWidth(), "X",MazeWorldCore.GetBoardLength());
	console.log("#  = blocked , = traversable wall . = free space");
	console.log("True is traversable, false is blocked");
	console.log("Even-Odd numbers in the arrays are walls, double even positions are possible locations to be.")

	height = MazeWorldCore.GetBoardLength();
	width =  MazeWorldCore.GetBoardWidth();
	for (var i = 0; i < height; i++)
	{
		row = row.concat(i);
		row = row.concat(". ");
		if (i<10)
			row = row.concat(" ");

		for (var j = 0; j < width ; j++)
		{
			// draw the player if thats where he is.
			if (MazeWorldCore.player.x == j && MazeWorldCore.player.y == i)
				row = row.concat("X");
			//else draw the map
			else
			{
				  if (MazeWorldModel.IsHorizontalWall(i,j)&&(MazeWorldModel.GetMap(i,j)!=true))
						row = row.concat("#");
					else if (MazeWorldModel.IsVerticalWall(i,j)&&(MazeWorldModel.GetMap(i,j)!=true))
						row = row.concat("#");
					else  if (MazeWorldModel.IsPlace(i,j)&&(MazeWorldModel.GetMap(i,j)==true))
							row = row.concat("0");
					else
						row = row.concat(" ");


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
  //  MazeWorldModel.init();
  //  MazeWorldModel.loop();
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
				SetupBuyButton(MazeWorldCore.player.x,MazeWorldCore.player.y);
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
