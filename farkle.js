var diceArr = [];

function initializeDice(){
	for(i = 0; i < 6; i++){
		diceArr[i] = {};
		diceArr[i].id = "die" + (i + 1);
		diceArr[i].value = i + 1;
		diceArr[i].clicked = 0;
	}
}

/*Rolling dice values*/
function rollDice(){
	for(var i = 0; i < 6; i++){
		if(diceArr[i].clicked === 0){
			diceArr[i].value = Math.floor((Math.random() * 6) + 1);
		} 
	}
	updateDiceImg();
	calculateScore(); 	
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

	img.classList.toggle("transparent");
	if(diceArr[i].clicked === 0){
		diceArr[i].clicked = 1;
	}
	else{
		diceArr[i].clicked = 0;
	}
	calculateScore(); 
}

// Calculating score for clicked die
function calculateScore() {
	let score = 0; 
	let scoreCounter = {};
	
	for(var diceObject of diceArr){
		if(diceObject.clicked === 1) {
			scoreCounter[diceObject.value] = (scoreCounter[diceObject.value] + 1) || 1;
		}
	} 

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

	document.getElementById("score").textContent = score;

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



// I assumed getting 2 sets of 3 would double that score. 
// My next steps were to handle banking a score to store the value but I had difficulty with the logic.
// I wanted to add gameplay logic that checked for a Farkle, but because I calculated the score based on which die 
// was clicked, I struggled to also calculate the values of all die to check if score === 0. 
// I wanted to call my bankScore function and store the chosen score value while also resetting the dice with initializeDice. 