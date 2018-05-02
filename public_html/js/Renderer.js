
//Draw the game board
function draw(wm)
{
		var canvas = document.getElementById("GameBoardCanvas");
		var width = canvas.width;
		//var blockSize = width/board.length;


		var boardlength = wm.GetBoardLength();
		var boardwidith = wm.GetBoardWidth();

		var blockSize = width/ boardlength;
		var ctx = canvas.getContext('2d');
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, width, width);
		ctx.fillStyle="white";
  //Loop through the board array drawing the walls and the goal
    for(var y = 0; y < boardlength; y++)
    {
        for(var x = 0; x < boardwidith; x++)
        {
            //Draw a wall
            if(wm.Filled(x,y) === 1){
                ctx.fillRect(x*blockSize, y*blockSize, blockSize, blockSize);
            }
            //Draw the goal
            else if(wm.Filled(x,y) === -1){
                ctx.beginPath();
                ctx.lineWidth = 5;
                ctx.strokeStyle = "gold";
                ctx.moveTo(x*blockSize, y*blockSize);
                ctx.lineTo((x+1)*blockSize, (y+1)*blockSize);
                ctx.moveTo(x*blockSize, (y+1)*blockSize);
                ctx.lineTo((x+1)*blockSize, y*blockSize);
                ctx.stroke();
            }
        }
    }
    //Draw the player
    ctx.beginPath();
    var half = blockSize/2;
    ctx.fillStyle = "blue";
    ctx.arc(wm.GetPlayerX()*blockSize+half,wm.GetPlayerY()*blockSize+half, half, 0, 2*Math.PI);
    if (el('#R_X') != null )
      el('#R_X').innerHTML ="0";
    if (el('#R_Y') != null )
      el('#R_Y').innerHTML ="0";
    if (el('#L_X') != null )
      el('#L_X').innerHTML = wm.player.x;
    if (el('#L_Y') != null )
      el('#L_Y').innerHTML = wm.player.y;
    ctx.fill();
}
