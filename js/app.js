/* Cards!
List of icon used for Cards

user-secret		tint	ambulance		graduation-cap
shopping-bag	bug 	bomb			bell
birthday-cake	car		camera			fire-extinguisher
camera-retro 	bus		briefcase		football-ball
bowling-ball 	dna 	compass			thermometer-half
envelope 		eye		female			heartbeat image
eye-dropper		fly		filter			volume-up
first-aid		gem		gamepad
fire flag		bath	headphones
*/

const cardIcons = [ "user-secret", "ambulance", "bath", "bell", "bug", "bomb", "birthday-cake", "tint", "volume-up",
					"car", "camera", "camera-retro", "bus", "briefcase", "bowling-ball", "dna", "compass", "envelope",
					"female", "eye", "fire-extinguisher", "first-aid", "filter", "fire", "flag", "football-ball",
					"fly", "gem", "gamepad", "graduation-cap", "heartbeat", "headphones", "image", "shopping-bag",
					"eye-dropper", "thermometer-half" ];

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector("#main-menu ul").addEventListener("click", menuClickHandler);
});

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
