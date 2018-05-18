
var assert = function(condition, message) {
    if (!condition)
        throw Error("Assert failed" + (typeof message !== "undefined" ? ": " + message : ""));
};

assert(1===1);



function SetBuyButtonStatus(st)
{
    document.getElementById("BuyButton").disabled = !st;
    console.log("Setting buy button status to ", st);
}

function SetupBuyButton(x,y)
{
  console.log("Testing to see if location ", x,y, "is free to buy");
  if (isAvailable(x,y,SetBuyButtonStatus));
  GetPlotPrice(function(a){
    document.getElementById("BuyButton").innerHTML = "Buy (" + a + " Eth)";
  });
}
function isNum(data)
{
  return !isNaN(data);
}

function myBuyFunction( )
{
  var x = MazeWorldModel.player.x;
  var y = MazeWorldModel.player.y;
  if(!isNum(x))
    console.error('X -oops not a number');
  if(!isNum(y))
    console.error('y -oops not a number');

  console.log("Buying ",x ,", ", y );
  isAvailable(x,y,MintPlot(x,y));
  console.log("Buy End!");

}
function GetPriceforNewPlot()
{

}
function GetPriceforSaving()
{

}

function mySaveFunction()
{
    console.log("Save!");
}
