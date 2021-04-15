var diceArr = [];

function initializeDice(){
	for(i = 0; i < 6; i++){
		diceArr[i] = {};
		diceArr[i].id = "die" + (i + 1);
		diceArr[i].value = i + 1;
		diceArr[i].clicked = 0;
		diceArr[i].removed = false; 
	}
}

/*Rolling dice values*/
function rollDice(){
	for(var i = 0; i < 6; i++){
		if(diceArr[i].clicked === 0){
			diceArr[i].value = Math.floor((Math.random() * 6) + 1);
		} else {
			diceArr[i].removed = true; 
		}
	}
	updateDiceImg();

	let scoreCounter = {}; 

	for(var diceObject of diceArr){
		if(!diceObject.removed){
			scoreCounter[diceObject.value] = (scoreCounter[diceObject.value] + 1) || 1;
		}
	} 
	
	let score = calculateScore(scoreCounter);

	document.getElementById("possible-score").textContent = score;

	if(score === 0){
		alert("Farkle! Try again.")
		initializeDice();
		updateDiceImg(); 
		for(var i = 1; i < 7; i++){
			document.getElementById("die" + i).classList.remove("transparent");
		}
		document.getElementById("score").textContent = null; 
	}

}

/*Updating images of dice given values of rollDice*/
function updateDiceImg(){
	var diceImage;
	for(var i = 0; i < 6; i++){
		diceImage = "images/" + diceArr[i].value + ".png";
		document.getElementById(diceArr[i].id).setAttribute("src", diceImage);
	}
}

function diceClick(img){
	var i = img.getAttribute("data-number");

	// img.classList.toggle("transparent");

	if(diceArr[i].clicked === 0){
		diceArr[i].clicked = 1;
		img.classList.add("transparent");
	}
	else{
		diceArr[i].clicked = 0;
		img.classList.remove("transparent");
	}
	calculateClickedScore(); 
}

// Calculating score for clicked die
function calculateClickedScore() {

	let scoreCounter = {}; 

	for(var diceObject of diceArr){
		if(diceObject.clicked === 1 && !diceObject.removed) {
			scoreCounter[diceObject.value] = (scoreCounter[diceObject.value] + 1) || 1;
		}
	}  

	let initialScore = calculateScore(scoreCounter);

	if(initialScore != document.getElementById("score").textContent){
		document.getElementById("score").textContent = Number(document.getElementById("score").textContent) + initialScore;
	}
	// This is an issue. Unclicking doesn't subtract, but I was trying to maintain the functionality
	// wherein the game calculates a temporary score for the user. However, based on clicked, the 
	// score was being recalculated when I needed the value to persist. 
}

// Calculating score for die
function calculateScore(scoreCounter) {
	
	let score = 0; 

	// Handling special cases for 1
	if(scoreCounter[1] === 6) {
		score += 2000;
		scoreCounter[1] -= 6;
	}
	else if(scoreCounter[1] >= 3) {
		score += 1000;
		scoreCounter[1] -= 3;
	}

	if(scoreCounter[1] === 2) {
		score += 200;
	}
	else if(scoreCounter[1] === 1) {
		score += 100; 
	}

	// Handling special cases for 5
	if(scoreCounter[5] === 6) {
		score += 1000;
		scoreCounter[5] -= 6;
	}
	else if(scoreCounter[5] >= 3) {
		score += 500;
		scoreCounter[5] -= 3;
	}

	if(scoreCounter[5] === 2) {
		score += 100;
	}
	else if(scoreCounter[5] === 1) {
		score += 50; 
	}

	score += calculateNumber(2, scoreCounter);

	score += calculateNumber(3, scoreCounter);

	score += calculateNumber(4, scoreCounter);

	score += calculateNumber(6, scoreCounter);



	return score;

}

function calculateNumber(num, scoreCounter) {
	//Function to reduce redundancy of score calculation.
	//Takes the die number and the scoreCounter object and returns calculated score. 

	let score = 0;

	if(scoreCounter[num] === 6) {
		score += (num * 100) * 2;
	}
	else if(scoreCounter[num] >= 3) {
		score += num * 100; 
	}

	return score; 
}

function testScore(dice) {
	//Function for testing the score calculation. 
	//Takes an array of dice values and to update diceArr, then calls calculateScore.

	for(var i = 0; i < 6; i++) {
		diceArr[i].value = dice[i];
	}

	console.log(calculateScore()); 
}

// function bankScore() {
// 	initializeDice();
// }




// I wanted to call my bankScore function and store the chosen score value while also resetting the dice with initializeDice. 

