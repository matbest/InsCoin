
//The game board 1 = walls, 0 = free space, and -1 = the goal
var board = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [ 0, 0, 0, 0, 1, 1, 1, 0, 1, 0],
    [ 0, 1, 1, 0, 0, 0, 1, 0, 1, 0],
    [ 0, 0, 1, 1, 1, 1, 1, 0, 1, 0],
    [ 1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
    [ 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
    [ 1, 0, 1, 0, 1, 0, 0, 1, 1, 0],
    [-1, 0, 1, 0, 1, 1, 0, 0, 0, 0]
];

var player = {
    x: 0,
    y: 0
};


var el = function(id){ return document.querySelector(id); };



//Check to see if the new space is inside the board and not a wall
function canMove(x, y)
{
    return (y>=0) && (y<board.length) && (x >= 0) && (x < board[y].length) && (board[y][x] != 1);
}

function KeyUp(e)
{
    if((e.which == 38) && canMove(player.x, player.y-1))//Up arrow
    {
      player.y--;
      SetupBuyButton(player.x,player.y);
    }
    else if((e.which == 40) && canMove(player.x, player.y+1)) // down arrow
    {    player.y++;
        SetupBuyButton(player.x,player.y);
    }
    else if((e.which == 37) && canMove(player.x-1, player.y))
    {    player.x--;
        SetupBuyButton(player.x,player.y);
    }
    else if((e.which == 39) && canMove(player.x+1, player.y))
    {    player.x++;
        SetupBuyButton(player.x,player.y);
    }
    draw();

    e.preventDefault();
}
document.addEventListener("keyup",KeyUp);
