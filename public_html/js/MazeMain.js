
ConsolePrintMap = function()
{
	console.log("Player at ", MazeWorldModel.player.x, ",",MazeWorldModel.player.y);
	var row = "";
	console.log("Map size is ", width, "X",height);
	for (var i = 0; i < height * 2; i++)
	{
		for (var j = 0; j < width * 2; j++)
		{
			if (MazeWorldModel.player.x == j && MazeWorldModel.player.y == i)
				row = row.concat("X");
			else
			{
				if (MazeWorldModel.map[i][j] === true)
				  row = row.concat("1");
				else
					row = row.concat("0");
				}
		}
		console.log(row);
		row= "";
	}
}

MazeWorldModel.init();






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

		if (typeof SetupBuyButton !== "undefined")
			SetupBuyButton(MazeWorldModel.player.x,MazeWorldModel.player.y);
		e.preventDefault();
	};


function drawplayer(ctx)
{

 var blocksize =(MazeWorldModel.pathWidth + MazeWorldModel.wallWidth);
  ctx.beginPath();
  var half = this.pathWidth/2;
	ctx.fillStyle = "Green";
	offset = this.pathWidth / 2 + this.outerWall;

	xpos = 0.5*MazeWorldModel.GetPlayerX() * blocksize+ offset;
	ypos = 0.5*MazeWorldModel.GetPlayerY() * blocksize+ offset;
	ctx.arc(xpos,ypos, half, 0, 2*Math.PI);
	ctx.fill();


}
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
		drawplayer(ctx);

}
document.addEventListener("keyup",MazeWorldModel.KeyUp.bind(MazeWorldModel));
document.addEventListener("keyup",UpdateBuyButton);
document.addEventListener("keyup",draw);
