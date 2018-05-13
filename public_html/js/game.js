
//The game board 1 = walls, 0 = free space, and -1 = the goal


var el = function(id){ return document.querySelector(id); };



//Check to see if the new space is inside the board and not a wall


function KeyUp(e)
{
    if((e.which == 38) && WorldModel.CanMove(WorldModel.player.x, WorldModel.player.y-1))//Up arrow
    {
      MazeWorldModel.player.y--;
    }
    else if((e.which == 40) &&  WorldModel.CanMove(WorldModel.player.x, WorldModel.player.y+1)) // down arrow
    {    MazeWorldModel.player.y++;
    }
    else if((e.which == 37) &&  WorldModel.CanMove(WorldModel.player.x-1, WorldModel.player.y))
    {    MazeWorldModel.player.x--;
    }
    else if((e.which == 39) &&  WorldModel.CanMove(WorldModel.player.x+1, WorldModel.player.y))
    {    MazeWorldModel.player.x++;

    }
    if (typeof SetupBuyButton !== "undefined")
      SetupBuyButton(MazeWorldModel.player.x,MazeWorldModel.player.y);
  //  draw( WorldModel);

    e.preventDefault();
}
document.addEventListener("keyup",KeyUp);
