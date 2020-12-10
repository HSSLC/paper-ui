window.addEventListener("load",init_urb);
function reg_urb(ele)
{
	var statusEnt = document.createElement("input");
	statusEnt.id = ele.dataset.id;
	statusEnt.name = ele.dataset.name;
	statusEnt.type = "radio";
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
		sameNames = document.getElementsByName(e.target.name);
		for(var i = 0; i < sameNames.length; i++)
		{
			sameNames[i].parentElement.dataset.checked = false;
		}
		e.target.parentElement.dataset.checked = e.target.checked;
	};
	ele.appendChild(statusEnt);
	var disc_border = document.createElement("div");
	disc_border.className = "urb-disc-border";
	var disc = document.createElement("div");
	disc.className = "urb-disc";
	ele.appendChild(disc_border);
	ele.appendChild(disc);
	ele.htmlFor = ele.dataset.id;
	ele.dataset.offset = "24";
	ele.tabIndex = ele.tabIndex;
}
function init_urb()
{
	var eles = document.getElementsByClassName("uncontrolled-radio-button");
	for(var i = 0; i < eles.length; i++)
	{
		reg_urb(eles[i]);
	}
}