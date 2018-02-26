document.addEventListener('DOMContentLoaded', function () {
	document.querySelector("#main-menu ul").addEventListener("click", menuClickHandler);
});

function  menuClickHandler(element){
	switch (element.path[1].id) {
		case "classic":
			break;
		case "classic-time":
			break;
		case "classic-shuffle":
			break;
		case "memorize":
			break;
		case "memorize-shuffle":
			break;
		default:
			console.log("Error unknown button pressed");
			console.log(element);
	}
}
