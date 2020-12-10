window.addEventListener("load",init_prb);
function reg_prb(ele)
{
	var ripples = document.createElement("div");
	ripples.className = "paper-ripple-prb";
	ele.insertBefore(ripples,ele.children[0]);
	ele.children[0].ripples = new Array();
	ele.addEventListener("pointerdown",crtripplem_prb);
	ele.addEventListener("keydown",crtripplek_prb);
	ele.addEventListener("keyup",keyRelease_prb);
}
function init_prb()
{
	var eles = document.getElementsByClassName("paper-ripple-button");
	for(var i = 0; i < eles.length; i++)
	{
		reg_prb(eles[i]);
	}
}
function crtripplem_prb(e)
{
	if(e.button != 0) return;
	if(e.target.className != "paper-ripple-button") return;
	var targetEle = e.target;
	if(targetEle != null)
	{
		var ripple = document.createElement("div");
		ripple.className = "ripple-prb";
		var height = targetEle.offsetHeight;
		var width = targetEle.offsetWidth;
		var x = e.offsetX;
		var y = e.offsetY;
		if(x <= width / 2)
		{
			//left
			if(y <= height / 2)
			{
				//left top
				var size = Math.sqrt(Math.pow(height - y,2) + Math.pow(width - x,2));
			}
			else
			{
				//left bottom
				var size = Math.sqrt(Math.pow(y,2) + Math.pow(width - x,2));
			}
		}
		else
		{
			//right
			if(y <= height / 2)
			{
				//right top
				var size = Math.sqrt(Math.pow(height - y,2) + Math.pow(x,2));
			}
			else
			{
				//right bottom
				var size = Math.sqrt(Math.pow(y,2) + Math.pow(x,2));
			}
		}
		ripple.addEventListener("animationend",function() {ripple.remove()});
		ripple.style.height = ripple.style.width = (size * 2).toString() + "px";
		ripple.style.left = (-1 * size + x).toString() + "px";
		ripple.style.top = (-1 * size + y).toString() + "px";
		targetEle.children[0].appendChild(ripple);
	}
}
function crtripplek_prb(e)
{
	if(e.keyCode != 32) return;
	if(e.target.className != "paper-ripple-button") return;
	if(e.target.dataset.press == "true") return;
	var targetEle = e.target;
	if(targetEle != null)
	{
		targetEle.dataset.press = true;
		var ripple = document.createElement("div");
		ripple.className = "ripple-prb";
		var height = targetEle.offsetHeight;
		var width = targetEle.offsetWidth;
		var size = Math.sqrt(Math.pow(height / 2,2) + Math.pow(width / 2,2));
		ripple.style.height = ripple.style.width = (size * 2).toString() + "px";
		ripple.style.left = (-1 * size + width / 2).toString() + "px";
		ripple.style.top = (-1 * size + height / 2).toString() + "px";
		ripple.addEventListener("animationend",function() {ripple.remove()});
		targetEle.children[0].appendChild(ripple);
	}
}
function keyRelease_prb(e)
{
	e.target.removeAttribute("data-press");
}