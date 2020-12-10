window.addEventListener("load",init_lhff);
function reg_lhff(ele)
{
	ele.tabIndex = 0;
	ele.addEventListener("pointerdown",function(e)
	{
		var targetInput = document.getElementById(e.target.htmlFor);
		var eventObj = new Object();
		eventObj.type = "keydown";
		eventObj.keyCode = 32;
		eventObj.target = targetInput.parentElement;
		crtripplek(eventObj);
	});
	function pu(e)
	{
		var targetInput = document.getElementById(e.target.htmlFor);
		var eventObj = new Object();
		eventObj.type = "keyup";
		eventObj.keyCode = 32;
		eventObj.target = targetInput.parentElement;
		rmripple(eventObj);
	}
	ele.addEventListener("pointerup",function(e)
	{
		e.target.blur();
		pu(e);
	});
	ele.addEventListener("blur",pu);
	ele.addEventListener("pointercancel",pu);
}
function init_lhff()
{
	eles = document.querySelectorAll("label[for]");
	for(var i = 0; i < eles.length; i++)
	{
		if(/(.* |^)paper-button( .*|$)/.test(document.getElementById(eles[i].htmlFor).parentElement.className) && !/(.* |^)paper-button( .*|$)/.test(eles[i].className))
		{
			reg_lhff(eles[i]);
		}
	}
}