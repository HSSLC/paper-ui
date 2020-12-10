window.addEventListener("load",init_wtpc);
function reg_wtpc(ele)
{
	var statusEnt = document.createElement("input");
	statusEnt.type = "checkbox";
	statusEnt.hidden = true;
	statusEnt.id = ele.dataset.id;
	if(ele.dataset.defchecked == "true")
	{
		statusEnt.checked = true;
		ele.dataset.checked = true;
	}
	else
	{
		ele.dataset.checked = false;
	}
	statusEnt.onchange = function(e)
	{
		e.target.parentElement.dataset.checked = e.target.checked;
	}
	ele.appendChild(statusEnt);
	
	var bg = document.createElement("div");
	bg.className = "wtpc-bg";
	var cover1 = document.createElement("div");
	cover1.className = "wtpc-cover1";
	bg.appendChild(cover1);
	var check = document.createElement("div");
	check.className = "wtpc-check";
	var checkContainer = document.createElement("div");
	checkContainer.className = "wtpc-check-container";
	var p1 = document.createElement("div");
	p1.className = "wtpc-check-p1";
	var p2 = document.createElement("div");
	p2.className = "wtpc-check-p2";
	checkContainer.appendChild(p1);
	checkContainer.appendChild(p2);
	check.appendChild(checkContainer);
	bg.appendChild(check);
	ele.appendChild(bg);
	ele.dataset.offset = 24;
	ele.htmlFor = ele.dataset.id;
	ele.tabIndex = ele.tabIndex;
}
function init_wtpc()
{
	var eles = document.getElementsByClassName("wiz-toggle-paper-checkbox");
	for(var i = 0; i < eles.length; i++)
	{
		reg_wtpc(eles[i]);
	}
}