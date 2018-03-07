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
	document.querySelector("#restart").addEventListener("click", restartGame);
	document.querySelector("#restart-end").addEventListener("click", restartGame);
	setTimeout(function () { sysHeight(); buildGrid(); }, 250);
});

let cardMap = {
	map: [[]],

	startTime: false,
	finishTime: false,
	endTime: false,
	intervalTimerObj: false,

	intervalStarsObj: false,
	gamePoints: 300,
	punishPoints: 0,
	movePoints: 0,

	activeCards: 0,
	firstCard: true,
	clicks: 0,
	movesLeft: 8,

	addCard (id, open, correct) {
		this.map[id] = [open, correct];
	},

	addClick (){
		this.clicks++;
		this.movePoints++;

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
		this.punishPoints += 2;
	},

	startTimer () {
		this.startTime = Date.now();
		this.endTime = this.startTime + (60 * 60 * 1000) - 1;
		gameTimerUI();
	},

	starDecay () {
		this.gamePoints--;
		if(this.gamePoints < 200 ) this.gamePoints--;
		if(this.gamePoints < 100 ) this.gamePoints--;
		if (this.punishPoints) {
			this.punishPoints--;
			this.gamePoints--;
		}
		if (this.movePoints) {
			this.movePoints--;
			this.gamePoints--;
		}
	},

	resetGame () {
		this.map = [[]];

		this.startTime = false;
		this.finishTime = false;
		this.endTime = false;
		this.intervalTimerObj = false;

		this.intervalStarsObj = false;
		this.gamePoints = 300;
		this.punishPoints = 0;
		this.movePoints = 0;

		this.activeCards = 0;
		this.firstCard = true;
		this.clicks = 0;
		this.movesLeft = 8;
		emtyGrid();
		buildGrid();

		document.getElementById("mil").innerHTML = "000";
		document.getElementById("sec").innerHTML = "00";
		document.getElementById("min").innerHTML = "00";

		document.getElementById("clicks").innerHTML = "0";

		document.getElementById("star1").style.backgroundImage = "linear-gradient(orange 100%, lightgray 100%)";
		document.getElementById("star2").style.backgroundImage = "linear-gradient(orange 100%, lightgray 100%)";
		document.getElementById("star3").style.backgroundImage = "linear-gradient(orange 100%, lightgray 100%)";

		document.querySelector("#end").style.display = "none";
		document.querySelector(".menu-bg").classList.remove("menu-bg-show");

		document.querySelector("#end-star1").style.display = "none";
		document.querySelector("#end-star2").style.display = "none";
		document.querySelector("#end-star3").style.display = "none";
	},

	get gameWin () {
		return this.movesLeft > 0 ? false: true;
	},

	get secondCard () {
		return this.activeCards >= 2 ? false: true;
	},
};

function restartGame() {
	clearInterval(cardMap.intervalTimerObj);
	clearInterval(cardMap.intervalStarsObj);

	cardMap.resetGame();
}

function emtyGrid() {
	for(let card of document.querySelectorAll(".card-space"))
		card.remove();
}

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

		document.getElementById("mil").innerHTML = time[0] > 99 ? time[0]: time[0] > 9 ? "0" + time[0]: "00" + time[0];
		document.getElementById("sec").innerHTML = time[1] > 9 ? time[1]: "0" + time[1];
		document.getElementById("min").innerHTML = time[2] > 9 ? time[2]: "0" + time[2];
	}
}

function starsLogic() {
	cardMap.intervalStarsObj = setInterval(updateStars, 500);
	function updateStars() {
		cardMap.starDecay();

		if(!(cardMap.gamePoints >= 300)) {
			let starID, points;
			let lostStar = "linear-gradient(135deg, lightgray 14%, gray 15%, gray 29%, lightgray 30%, lightgray 44%, gray 45%, gray 59%, lightgray 60%,  lightgray 74%, gray 75%,  gray 89%, lightgray 90%)";
			if(cardMap.gamePoints >= 200) {
				starID = "star1";
				points = cardMap.gamePoints - 200;
			}
			else if (cardMap.gamePoints < 200 &&  cardMap.gamePoints >= 100) {
				starID = "star2";
				points = cardMap.gamePoints - 100;
			} else {
				starID = "star3";
				points = cardMap.gamePoints;
			}

			if(cardMap.gamePoints > 0 ){
				let gradient;
				if(window.matchMedia("(orientation : portrait)").matches)
					gradient = "linear-gradient(to right, orange " + points + "%, lightgray " + points + "%)";
				else gradient = "linear-gradient(to bottom, orange " + points + "%, lightgray " + points + "%)";

				document.getElementById(starID).style.backgroundImage = gradient;
			}

			if (cardMap.gamePoints < 200 && cardMap.gamePoints >= 100) {
				document.getElementById("star1").style.backgroundImage = lostStar;
			} else if (cardMap.gamePoints < 100 && cardMap.gamePoints >= 0) {
				document.getElementById("star2").style.backgroundImage = lostStar;
			} if (cardMap.gamePoints < 0 ) {
				document.getElementById("star3").style.backgroundImage = lostStar;
				endGame();
			}
		}
	}
}

function clickCard(element){
	if(cardMap.secondCard && element.target.id != "game" && element.target.className != "card-space"){
		let elem, cartNum, cardName;
		if(element.target) {
			if(element.target.parentElement.className !=  "card") {
				elem = element.target.parentElement.parentElement;
				cartNum = element.target.parentElement.parentElement.parentElement.style.order;
				cardName = element.target.classList[2];
			} else {
				elem = element.target.parentElement;
				cartNum = element.target.parentElement.parentElement.style.order;
				if(cardMap.map[cartNum][0]) cardName = element.target.firstChild.classList[2];
				else cardName = element.target.nextSibling.firstChild.classList[2];
			}
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
					endGame();
				}
			}, 300);
		}
		if(!cardMap.startTime) {
			cardMap.startTimer();
			starsLogic();
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
}

function endGame() {
	let endMsg;

	clearInterval(cardMap.intervalTimerObj);
	clearInterval(cardMap.intervalStarsObj);

	if (cardMap.gamePoints > 200) endMsg = "Awesome job!";
	else if (cardMap.gamePoints > 100) endMsg = "Great job!";
	else if (cardMap.gamePoints > 0) endMsg = "Well done!";
	else endMsg = "Better luck next time.";
	document.getElementById("end-msg").innerHTML = endMsg;

	const timePasst = cardMap.finishTime - cardMap.startTime;
	let time = [ Math.floor(timePasst % 1000),
				Math.floor((timePasst / 1000) % 60),
				Math.floor((timePasst / (1000*60)) % 60) ];

	if (cardMap.gamePoints > 0) document.getElementById("time").innerHTML = (time[2] + ":" + time[1] + ":" + time[0]);

	if (cardMap.gamePoints > 0) document.querySelector("#end-star1").style.display = "inline";
	if (cardMap.gamePoints > 100) document.querySelector("#end-star2").style.display = "inline";
	if (cardMap.gamePoints > 200) document.querySelector("#end-star3").style.display = "inline";

	document.querySelector("#end").style.display = "block";
	document.querySelector(".menu-bg").classList.add("menu-bg-show");
}
