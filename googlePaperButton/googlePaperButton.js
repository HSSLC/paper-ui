window.addEventListener("load",init);
function reg(ele)
{
	var ripples = document.createElement("div");
	ripples.className = "paper-ripple";
	ele.insertBefore(ripples,ele.children[0]);
	ele.children[0].ripples = new Array();
	ele.dataset.press = false;
	ele.addEventListener("pointerdown",crtripplem);
	ele.addEventListener("pointerup",rmripple);
	// ele.addEventListener("keydown",crtripplek);
	// ele.addEventListener("keyup",rmripple);
	ele.addEventListener("blur",rmripple);
	ele.addEventListener("pointercancel",rmripple);
	ele.tabIndex = ele.tabIndex;
}
function init()
{
	var eles = document.getElementsByClassName("paper-button");
	for(var i = 0; i < eles.length; i++)
	{
		reg(eles[i]);
	}
}
function getOffset(ele)
{
	if(ele.dataset.offset) return parseInt(ele.dataset.offset);
	else return 0;
}
function crtripplem(e)
{
	if(e.button != 0) return;
	if(!/(.* |^)paper-button( .*|$)/.test(e.target.className)) return;
	var targetEle = e.target;
	if(targetEle != null)
	{
		targetEle.dataset.press = true;
		var ripple = document.createElement("div");
		ripple.className = "ripple";
		var height = targetEle.offsetHeight + getOffset(targetEle);
		var width = targetEle.offsetWidth + getOffset(targetEle);
		var x = e.offsetX + getOffset(targetEle)/2;
		var y = e.offsetY + getOffset(targetEle)/2;
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
		ripple.style.height = ripple.style.width = (size * 2).toString() + "px";
		ripple.style.left = (-1 * size + x).toString() + "px";
		ripple.style.top = (-1 * size + y).toString() + "px";
		targetEle.children[0].ripples.push(ripple);
		targetEle.children[0].appendChild(ripple);
		ripple.animate([{transform:"scale(0)"},{transform:"scale(1)"}],{duration:800,fill:"forwards",easing:"cubic-bezier(.2, .9, .1, .9)"});
	}
}
function crtripplek(e)
{
	if(e.keyCode != 32) return;
	if(!/(.* |^)paper-button( .*|$)/.test(e.target.className)) return;
	if(e.target.dataset.press == "true") return;
	var targetEle = e.target;
	if(targetEle != null)
	{
		targetEle.dataset.press = true;
		var ripple = document.createElement("div");
		ripple.className = "ripple";
		var height = targetEle.offsetHeight + getOffset(targetEle);
		var width = targetEle.offsetWidth + getOffset(targetEle);
		var size = Math.sqrt(Math.pow(height / 2,2) + Math.pow(width / 2,2));
		ripple.style.height = ripple.style.width = (size * 2).toString() + "px";
		ripple.style.left = (-1 * size + width / 2).toString() + "px";
		ripple.style.top = (-1 * size + height / 2).toString() + "px";
		targetEle.children[0].ripples.push(ripple);
		targetEle.children[0].appendChild(ripple);
		ripple.animate([{transform:"scale(0)"},{transform:"scale(1)"}],{duration:800,fill:"forwards",easing:"cubic-bezier(.2, .9, .1, .9)"});
	}
}
function rmripple(e)
{
	if(e.button == 2) return;
	if(!/(.* |^)paper-button( .*|$)/.test(e.target.className)) return;
	if(e.type == "keyup" && e.keyCode != 32) return;
	if(!e.target.dataset.press == "true") return;
	e.target.dataset.press = false;
	e.target.blur();
	var eles = e.target.children[0].ripples;
	for(var i = 0; i < eles.length; i++)
	{
		var rmrip = eles[i];
		function rm(e) {e.target.ripple.remove();};
		if(rmrip.noani) continue;
		else rmrip.noani = true;
		var animation = rmrip.animate({opacity:[.25,0]},{duration:150,fill:"forwards"});
		animation.ripple = rmrip;
		animation.addEventListener("finish",rm);
		animation.addEventListener("cancel",rm);
	}
}