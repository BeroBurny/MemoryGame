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

const cardIcons = [ "user-secret", "ambulance", "bath", "bell", "bug", "bomb", "birthday-cake", "tint", "volume-up",
					"car", "camera", "camera-retro", "bus", "briefcase", "bowling-ball", "compass", "envelope",
					"female", "eye", "fire-extinguisher", "filter", "fire", "flag", "football-ball", "gamepad",
					"gem", "graduation-cap", "heartbeat", "headphones", "image", "shopping-bag", "eye-dropper", "thermometer-half" ];

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector("#main-menu ul").addEventListener("click", menuClickHandler);
	setTimeout(function () { sysHeight(); buildGrid(); }, 1500);
});

window.addEventListener('resize', sysHeight);

function sysHeight(){
	document.getElementById("game").style.height = document.getElementById("game").offsetWidth + "px";
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
	let card = [];
	while (card.length < 8) {
		let tempCard = cardIcons[Math.floor(Math.random() * cardIcons.length)];
		for (var i = 0; i < card.length; i++) if(card[i] === tempCard) card.splice(i, 1);
		card.push(tempCard);
	}
	for (var i = 0; i < 8; i++) {
		createCard(card[i]);
		createCard(card[i]);
	}
}

function createCard(card){
	let htmlElement = "<div class=\"card\"><i class=\"fas fa-" + card + "\"></i></div>";
	document.getElementById("game").insertAdjacentHTML("beforeend", htmlElement);
}
