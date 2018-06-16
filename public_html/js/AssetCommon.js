function consoleLog(thisString)
{
  console.log(thisString);
  var oldcontent = document.getElementById("console").innerHTML;
  var html = thisString + "<br>" + oldcontent;
  document.getElementById("console").innerHTML = html;
}
function consoleErrorLog(thisString)
{
  console.log(thisString);
  var oldcontent = document.getElementById("console").innerHTML;
  var html = thisString + "<br>" + oldcontent;
  document.getElementById("console").innerHTML = html;
}
