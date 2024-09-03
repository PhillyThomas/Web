let playercount = 2;
let players = [];
let currentPlayerID = 0;
let currentPlayer = "Poetry for Neanderthals";
let currCard = 0;
let gamemode = "standard";
let timelimit = 0;
let buzzer_audio = new Audio('buzzer.mp3');
let tick_audio = new Audio('tick.mp3');
let timer_active = true;
let currTick = 0;
let currPercent = 0.1;
let viewport_height = window.innerHeight;
let timer;
let tick_timer;

const timeout_messages = [
	"Oof, out of time!",
	"Yikes, ran out of time!",
	"Uh oh, timer says no!",
	"Not quite, you're out of time!",
	"Timer beat you to the finish line!",
	"No time left, sorry!",
	"Oooof, buzzed out, sorry!",
	"Out of time! Nice try!",
	"Better luck next time!"
]

// Variables for names and shit
const firstNames = [
	'Ambitious', 'Aromatic','Amazing', 'Beautiful', 'Dazzling', 'Elegant', 'Fancy', 'Glamorous', 
	'Handsome', 'Gorgeous', 'Long','Magnificent', 'Muscular', 'Quaint', 'Scruffy', 'Short',
	'Amusing', 'Bold', 'Basic', 'Authentic', 'Uncanny', 'Cautious', 'Boundless', 'Daring', 
	'Decisive', 'Explosive', 'Fascinating', 'Famous', 'Fearless', 'Golden', 'Gentle',
	'Hasty', 'Hearty', 'Hectic', 'Intuitive', 'Immense', 'Incredible', 'Jolly', 'Jubilant', 'Jovial',
	'Joyful', 'Jittery', 'Keen', 'Kind', 'Kingly', 'Loyal', 'Lustrous', 'Major', 'Maximum', 'Magical',
	'Mythical', 'Magnetic', 'Majestic', 'Neutral', 'Noisy', 'Noble', 'Obscure', 'Odd', 'Pampered',
	'Pure', 'Peculiar', 'Patient', 'Perfect', 'Quiet', 'Quirky', 'Quick', 'Radiant', 'Rapid', 'Rare',
	'Strong', 'Super', 'Subtle', 'Tactical', 'Thoughtful', 'Tranquil', 'Unique', 'Ultra', 'Vintage',
	'Vibrant', 'Versatile', 'Witty', 'Winged', 'Wild', 'Young', 'Yappy', 'Stoic'
];

const lastNames = [
	'Tiger', 'Lion', 'Gazelle', 'Zebra', 'Pelican', 'Mongooose', 'Axolotl', 'Mouse', 'Cat', 'Dog',
	'Pigeon', 'Eagle', 'Cheetah', 'Hyena', 'Moose', 'Rhino', 'Elephant', 'Giraffe', 'Chinchilla', 'Elk',
	'Snake', 'Penguin', 'Toucan', 'Hippo', 'Wolf', 'Anteater', 'Tapir', 'Viper', 'Labrador', 'Bulldog', 'Terrier',
	'Kitten', 'Puppy', 'Deer', 'Fox', 'Hedgehog', 'Horse', 'Donkey', 'Pony', 'Kiwi', 'Shark', 'Salmon', 'Sheep',
	'Goat', 'Llama', 'Alpaca', 'Panda', 'Otter', 'Slow Loris', 'Quokka', 'Marmoset', 'Capybara',
	'Koala', 'Bat', 'Shrew', 'Pika', 'Sloth', 'Platypus', 'Coyote', 'Porcupine', 'Kangaroo', 'Hummingbird',
	'Hamster', 'Guinea Pig', 'Gecko', 'Seal', 'Lemur'
];



$(document).ready(function(){
	$('.playercount').hide();
	$('.playernames').hide();
	$('.main').hide();

	shuffle(cards);
	shuffle(phrases);
	$('.playerNameHeader').html(currentPlayer);
});

$('.minus').on('click',function(){
	playercount--;
	if(playercount<2){
		playercount = 2;
	}
	updatePlayerCount();
});

$('.plus').on('click',function(){
	playercount++;
	if(playercount>10){
		playercount = 10;
	}
	updatePlayerCount();
});

$('#playercount-next').on('click',function(){
	$('.playercount').hide();
	preparePlayerList();
	$('.playernames').show();
});

$('#playernames-next').on('click',function(){
	processPlayerNames();
	$('.playernames').hide();
	$('.main').show();
});

$('.menu-list-item').on('click',function(){
	switch(this.id){
		case "setting-standard":
			if(gamemode != "standard"){
				$(`.menu-list-item`).removeClass('selected');
				$(this).addClass('selected');
				gamemode = "standard";
			}
			break;
		case "setting-phrases":
			if(gamemode != "phrases"){
				$(`.menu-list-item`).removeClass('selected');
				$(this).addClass('selected');
				gamemode = "phrases";
			}
			break;
	}
});

$(document).on('input change', '#setting-timer',function(){
	let updateText;
	let value = $(this).val();
	if(value <= 0){
		updateText = "No time limit";
		$('#timer-text').addClass('greytext');
	} else {
		$('#timer-text').removeClass('greytext');
		if(value < 60){
			updateText = `${value} seconds`;
		} else if(value == 60) { 
			updateText = `1 Minute`;
		} else if(value < 120){
			updateText = `1 Minute ${value-60} seconds`;
		} else if(value == 120){
			updateText = `2 Minutes`;
		} else if(value < 180){
			updateText = `2 Minutes ${value-120} seconds`;
		} else if(value == 180){
			updateText = `3 Minutes`;
		} else if(value < 240){
			updateText = `3 Minutes ${value-180} seconds`;
		} else if(value == 240){
			updateText = `4 Minutes`;
		} else if(value < 300){
			updateText = `4 Minutes ${value-240} seconds`;
		} else if(value == 300){
			updateText = `5 Minutes`;
		}
	}
	timelimit = value;
	$('#timer-text').html(updateText);
});

$('.card').on('click',function(){
	$('.card').removeClass('timeout');
	$('.timerbg').css("height", "0vh");
	currPercent = 0.1;

	if(timer_active){
		clearInterval(timer);
		clearInterval(tick_timer);
		timer_active = false;
	}

	switch(gamemode){
		case "standard":
			$(this).html(
				`<div class="card-top">
					<div class="score-1">1</div>
					<div class="cardvalue">${cards[currCard][1]}</div>
				</div>
				<div class="card-bottom">
					<div class="cardvalue">${cards[currCard][3]}</div>
					<div class="score-3">3</div>
				</div>`
			);
			currCard++;
			break;
		case "phrases":
			$(this).html(
				`<div class="cardvalue">${phrases[currCard]}</div>`
			);
			currCard++;
			break;
	}
	if(timelimit > 0){
		timer_active = true;
		timer = setInterval(increaseTimer,timelimit);
		tick_timer = setInterval(playTick, 1000);
	}
});

$('#menu-next').on('click',function(){
	$('.menu').hide();
	$('.main').show();
});

function increaseTimer(){
	if(currPercent >= 100){
		clearInterval(timer);
		clearInterval(tick_timer);
		$('.card').addClass('timeout');
		$('.card').html(`<span style="text-align:center;">${timeout_messages[randBetween(0,timeout_messages.length-1)]}</span>`);
		buzzer_audio.play();
		timer_active = false;
	}
	currPercent = Math.round(((currPercent + 0.1) + Number.EPSILON) * 100) / 100;
	$('.timerbg').css("height", `${currPercent}vh`);
}

function playTick() {
	if(timer_active){
		tick_audio.play();
	}
}

function updatePlayerCount(){
	console.log(playercount);
	$('#playercount-sum').html(playercount);
}

function preparePlayerList(){
	for(i=0; i<playercount; i++){
		$('#playernames-list').append(
			`<div class="playernames-item" id="player-${i}">
				<input type="text" id="input-player-${i}" placeholder="Player ${i+1} Name"></input>
			</div>`
		);
	}
}

function processPlayerNames(){
	let tempPlayer;
	for(i=0; i<playercount; i++){
		tempPlayer = document.getElementById(`input-player-${i}`).value;
		//console.log(tempPlayer);
		if(!tempPlayer){
			tempPlayer = `${firstNames[randBetween(0,firstNames.length-1)]} ${lastNames[randBetween(0, lastNames.length-1)]}`;
		}
		players.push(tempPlayer);
		console.log(tempPlayer);
	}
	console.log(players);
}


function randBetween(min, max) { // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffle(array) {
	let currentIndex = array.length;

	// While there remain elements to shuffle...
	while (currentIndex != 0) {

		// Pick a remaining element...
		let randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
		array[randomIndex], array[currentIndex]];
	}
}
  
