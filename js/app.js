/* Cards!
List of icon used for Cards

user-secret		tint	ambulance		graduation-cap
shopping-bag	bug 	bomb			bell
birthday-cake	car		camera			fire-extinguisher
camera-retro 	bus		briefcase		football-ball
bowling-ball 	gem	 	compass			thermometer-half
envelope 		eye		female			heartbeat image
eye-dropper		filter	volume-up		gamepad
fire flag		bath	headphones
*/

const cardIcons = [ "user-secret", "ambulance", "bath", "bus", "bug", "flag", "birthday-cake", "tint", "volume-up",
					"eye-dropper", "camera", "camera-retro", "bell", "briefcase", "bowling-ball", "compass", "bomb",
					"heartbeat", "eye", "fire-extinguisher", "filter", "fire", "envelope", "football-ball", "gamepad",
					"gem", "graduation-cap", "car", "headphones", "image", "shopping-bag", "female", "thermometer-half" ];

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector("#main-menu ul").addEventListener("click", menuClickHandler);
	document.querySelector("#game").addEventListener("click", flipcard);
	setTimeout(function () { sysHeight(); buildGrid(); }, 1500);
});

// temp

// temp end

window.addEventListener('resize', sysHeight);

function sysHeight(){
	document.getElementById("game").style.height = document.getElementById("game").offsetWidth + "px";
	document.getElementById("game").style.perspective = document.getElementById("game").offsetWidth + "px";
}

function  menuClickHandler(element){
	if(element.path[1].id != "main-menu"){
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
}

function buildGrid(){
	let card = [], order = [];

	while (card.length < 8) {
		let tempCard = cardIcons[Math.floor(Math.random() * cardIcons.length)];
		for (var i = 0; i < card.length; i++) if(card[i] === tempCard) card.splice(i, 1);
		card.push(tempCard);
	}
	for (var i = 0; i < 8; i++) {
		createCard(card[i], pozManage());
		createCard(card[i], pozManage());
	}

	function pozManage(){
		let need = true;
		let numb = 0;
		while (need) {
			let tempNumb = Math.floor(Math.random() * 16);
			if(!order[tempNumb]) need = false;
			numb = tempNumb;
		}
		order[numb] = true;
		return numb;
	}

	function createCard(card, order){
		let htmlElement = "<div class=\"card-space\" style=\"order: " + order + ";\">" +
								"<div class=\"card\">" +
									"<figure class=\"front\"></figure>" +
									"<figure class=\"back\"><i class=\"center fas fa-" + card + "\"></i></figure>" +
								"</div>" +
							"</div>";
		document.getElementById("game").insertAdjacentHTML("beforeend", htmlElement);
	}
}

function flipcard(element){
	if(element.path[0].id != "game" && element.path[0].className != "card-space"){
		let elem = element.srcElement.parentElement;
		if(element.srcElement.parentElement.className !=  "card")
			elem = element.srcElement.parentElement.parentElement;
		let rotType = elem.style.transform != "rotateY(180deg)";
		myMove(elem, rotType);
	}

	function myMove(elem, type) {
		var pos = 0;
		type ? pos = 0 : pos = 180;
		var id = setInterval(frame, 15);
		function frame() {
			if (pos == 180 && type) clearInterval(id);
			else if ((pos ==  360 && !type)) clearInterval(id);
			else {
				pos += 10;
				elem.style.transform = "rotateY( " + pos + "deg )";
			}
		}
	}
}
