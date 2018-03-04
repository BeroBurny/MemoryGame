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
	document.querySelector("#game").addEventListener("click", clickCard);
	setTimeout(function () { sysHeight(); buildGrid(); }, 1500);
});

// temp
let cardMap = {
	map: [[]],

	startTime: false,
	finishTime: false,
	endTime: false,
	intervalTimerObj: false,

	activeCards: 0,
	firstCard: true,
	clicks: 0,
	movesLeft: 8,

	addCard (id, open, correct) {
		this.map[id] = [open, correct];
	},

	addClick (){
		this.clicks++;

		document.getElementById("clicks").innerHTML = this.clicks;
	},

	openCard (id) {
		this.map[id][0] = true;
		this.activeCards++;
	},

	closeCard (id) {
		this.map[id][0] = false;
		this.activeCards--;
	},

	theyMatch (cardA, cardB) {
		this.map[cardA][1] = true;
		this.map[cardB][1] = true;
		this.activeCards = 0;
		this.firstCard = true;
		this.movesLeft--;
	},

	dintMatch (cardA, cardB) {
		this.map[cardA][0] = false;
		this.map[cardB][0] = false;
		this.activeCards = 0;
		this.firstCard = true;
	},

	startTimer () {
		this.startTime = Date.now();
		this.endTime = this.startTime + (60 * 60 * 1000) - 1;
		gameTimerUI();
	},

	resetGame () {
		this.map = [[]];
		this.startTime = false;
		this.finishTime = false,
		this.endTime = false;
		clearInterval(this.intervalTimerObj);
		this.intervalTimerObj = false;

		this.activeCards = 0;
		this.firstCard = true;
		this.movesLeft = 8;
		emtyGrid();
		buildGrid();

		document.getElementById("mil").innerHTML = "000";
		document.getElementById("sec").innerHTML = "00";
		document.getElementById("min").innerHTML = "00";

		document.getElementById("clicks").innerHTML = "0";
	},

	get gameWin () {
		return this.movesLeft > 0 ? false: true;
	},

	get secondCard () {
		return this.activeCards >= 2 ? false: true;
	},
};

function emtyGrid() {
	for(let card of document.querySelectorAll(".card-space"))
		card.remove();
}
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
		cardMap.addCard(order, false, false)
		let htmlElement = "<div class=\"card-space\" style=\"order: " + order + ";\">" +
								"<div class=\"card\">" +
									"<figure class=\"front\"></figure>" +
									"<figure class=\"back\"><i class=\"center fas fa-" + card + "\"></i></figure>" +
								"</div>" +
							"</div>";
		document.getElementById("game").insertAdjacentHTML("beforeend", htmlElement);
	}
}

function gameTimerUI() {
	cardMap.intervalTimerObj = setInterval(updateUI, 11);
	function updateUI() {
		if(cardMap.endTime <= Date.now()) clearInterval(cardMap.intervalTimerObj);
		const timePasst = Date.now() - cardMap.startTime;
		let time = [ Math.floor(timePasst % 1000),
					Math.floor((timePasst / 1000) % 60),
					Math.floor((timePasst / (1000*60)) % 60) ];

		document.getElementById("mil").innerHTML = time[0];
		document.getElementById("sec").innerHTML = time[1];
		document.getElementById("min").innerHTML = time[2];
	}
}

function clickCard(element){
	if(cardMap.secondCard && element.path[0].id != "game" && element.path[0].className != "card-space"){
		let elem, cartNum, cardName;
		if(element.srcElement.parentElement.className !=  "card") {
			elem = element.srcElement.parentElement.parentElement;
			cartNum = element.path[3].style.order;
			cardName = element.path[0].classList[2];
		} else {
			elem = element.srcElement.parentElement;
			cartNum = element.path[2].style.order;
			if(cardMap.map[cartNum][0]) cardName = element.path[0].firstChild.classList[2];
			else cardName = element.path[0].nextSibling.firstChild.classList[2];
		}
		if(!cardMap.map[cartNum][1] && !cardMap.gameWin) {
			let rotType = elem.style.transform != "rotateY(180deg)";
			flipCard(elem, rotType);
			cardMap.addClick();

			setTimeout(function () {
				if(cardMap.map[cartNum][0]){
					cardMap.closeCard(cartNum);
					cardMap.firstCard = true;
				}
				else {
					cardMap.openCard(cartNum);
					if(cardMap.firstCard === true) cardMap.firstCard = [elem, cartNum, cardName];
					else if (cardMap.firstCard[2] === cardName) {
						elem.lastChild.classList.add("good");
						cardMap.firstCard[0].lastChild.classList.add("good");

						cardMap.theyMatch(cardMap.firstCard[1], cartNum);
					} else {
						elem.lastChild.classList.add("bad");

						cardMap.firstCard[0].lastChild.classList.add("bad");
						setTimeout(function() {
							flipCard(elem, false);
							flipCard(cardMap.firstCard[0], false);

							elem.lastChild.classList.remove("bad");
							cardMap.firstCard[0].lastChild.classList.remove("bad");

							cardMap.dintMatch(cardMap.firstCard[1], cartNum);
						}, 1000 );
					}
				}
				if(cardMap.gameWin) {
					cardMap.finishTime = Date.now();
					clearInterval(cardMap.intervalTimerObj);
					console.log("Win");
				}
			}, 300);
		}
		if(!cardMap.startTime) cardMap.startTimer();
	}
}

function flipCard(elem, type) {
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
