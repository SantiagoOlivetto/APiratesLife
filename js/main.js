// Display and Actions vars
const mightyActionDisplay = document.getElementById('mighty-action');
const userChoiceDisplay = document.getElementById('user-choice');
const computerChoiceDisplay = document.getElementById('computer-choice');
const mightyName = document.getElementById('mightyName')
const mightyAmmo = document.getElementById('mightyAmmo');
const mightyLife = document.getElementById('mightyLife');
// Action buttons
const shootButton = document.getElementById('shoot');
const coverButton = document.getElementById('cover');
const reloadButton = document.getElementById('reload');


// Player possible actions
const possibleChoices = [
  shootButton,
  reloadButton,
  coverButton
]
//gun empty var
let emptyGun = true;
let userChoice;

// Click and game
possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
  const aiChoice = randomIndex(SELECTION.length);
  userChoice = e.target.id;
  userChoiceDisplay.innerHTML = userChoice;
  computerChoiceDisplay.innerHTML = aiChoice;
  turn(aiChoice, userChoice);
  endGame(player, mightyPirate);
})) 

// Possible actions
const SELECTION = [
'cover',
'reload',
'shoot'
];

function turn(aiChoice, userChoice)  {
  if (aiChoice == "reload"){
    (mightyPirate.ammo)++;
    mightyAmmo.innerHTML = mightyPirate.ammo;
  }
  if(aiChoice == "shoot"){
    (mightyPirate.ammo)--;
    mightyAmmo.innerHTML = mightyPirate.ammo;
  }
  if (aiChoice != "cover" && userChoice == "shoot") {
    (mightyPirate.life)--;
    mightyLife.innerHTML = mightyPirate.life;
  }
  if (userChoice != "cover" && aiChoice == "shoot") {
    player.hit();
  }

  Swal.fire({
    title: 'You : ' + userChoice + '\nHim: '  + aiChoice,
    text: "",
    imageUrl: './assets/animations/Pirate.gif',
    imageWidth: 250,
    imageHeight: 250,
    imageAlt: 'Custom image',
    showConfirmButton: false,
    timer: 3000,
    background: "linear-gradient(76deg, rgba(184,79,11,1) 0%, rgba(233,193,106,1) 51%, rgba(100,162,173,1) 100%)"
  })
}

// Computer actions
function randomIndex(max) {
  let number;
  if (mightyPirate.ammo == 0) {
    number = Math.floor(Math.random() * (max-1)) ;
  }else if(mightyAmmo == 0 && player.ammo == 0) {
    number = 1;
  }
  else {
    number = Math.floor(Math.random() * max);
  };
  
  return SELECTION[number];
}
// Mighty Pirate
const mightyPirate = {
  name: 'The OG Kraken',
  life: 3,
  ammo: 0
};

// Character template
class Pirate {
  constructor (name, island, wins, bounty, life, ammo) {
    this.name = name;
    this.island = island;
    this.wins = wins;
    this.bounty = bounty;
    this.life = life;
    this.ammo = ammo;
  }

  reload () {
    this.ammo++; 
    emptyGun = false; 
    setDisabled(false);
    ammo.innerHTML = player.ammo;
  }

  shoot () {
    this.ammo > 0 && !emptyGun ? this.ammo-- : emptyGun = true;
    emptyGun === true ? setDisabled(true) : false
    ammo.innerHTML = player.ammo;
  }

  hit () {
    this.life--;
    life.innerHTML = player.life;
  }

}

// Shoot disable mode
function setDisabled(disabled) {
  const buttonShoot = document.getElementById('shoot');
  buttonShoot.disabled = disabled; 
}

// Player
let player;
let lastPlayer = JSON.parse(localStorage.getItem('playerReadData'));
if (lastPlayer) {
  player =  new Pirate (lastPlayer.name, lastPlayer.island, lastPlayer.wins, lastPlayer.bounty, lastPlayer.life, lastPlayer.ammo);
} else {
  // Creating pirate name
  const greeting = prompt('Well well well, we have another pirate... Please tell us your name mate');
  const pirateIsland = prompt('and from which island are you coming from?');
  player = new Pirate (greeting, pirateIsland, 0, 0, 3, 0);
}

// Game over
function endGame(player, mightyPirate) {
  if(player.life < 1) {
    Swal.fire({
      title: 'You Lose!',
      text: "Sorry mate, see ya in the seven seas!",
      showConfirmButton: false,
      timer: 5000
    }).then((result) => {
      if (result.dismiss) {
        resetGame();
      }
    });
  }else if (mightyPirate.life < 1) {
    Swal.fire({
      title: 'You Win!',
      text: 'Jo Ho! You are a worthy pirate my friend, here some coins and rum for yaaaa',
      showConfirmButton: false,
      timer: 5000
    })
    // Winning price
    player.wins++;
    wins.innerHTML = player.wins; 
    player.bounty += 5;
    bounty.innerHTML = player.bounty;

    // Reset nasty pirate
    mightyPirate.life = 3;
    mightyLife.innerHTML = mightyPirate.life;
    mightyPirate.ammo = 0;
    mightyAmmo.innerHTML = mightyPirate.ammo;
    player.life++;
    life.innerHTML = player.life;

  }
}

// Reset game
function resetGame() {
  player.name = prompt('Well well well, we have another pirate... Please tell us your name mate');
  pirateName.innerHTML = player.name;
  player.island = prompt('and from which island are you coming from?');
  player.ammo = 0;
  ammo.innerHTML = player.ammo;
  player.wins = 0;
  wins.innerHTML = player.wins;
  player.bounty = 0;
  bounty.innerHTML = player.bounty; 
  player.life = 3;
  pirateLife.innerHTML = player.life;

// Print new com name 
  let printName = fetch(piratesURL)
  .then ( res => res.json())
  .then ( data => {mightyName.innerText = data[randomName()].name});
  printName;
};

// Status 
const pirateName = document.getElementById('name');
pirateName.innerHTML = player.name;

const pirateLife = document.getElementById('life');
pirateLife.innerHTML = player.life;

const ammo = document.getElementById('ammo');
ammo.innerHTML = player.ammo;

const wins = document.getElementById('wins');
wins.innerHTML = player.wins;

const bounty = document.getElementById('bounty');
bounty.innerHTML = player.bounty; 

// Com name
// Pirates API
const randomName = () => Math.floor(Math.random() *3);
const piratesURL = "js/pirates.JSON";
let printName = fetch(piratesURL)
  .then ( res => res.json())
  .then ( data => {mightyName.innerText = data[randomName()].name});
printName;
// Player functions

shootButton.onclick = () => player.shoot();
reloadButton.onclick = () => player.reload();

// Save game

const collection = document.getElementsByTagName("button");
for (let i=0; i< collection.length; i++) {
  const button = collection [i];
  button.addEventListener('click', () => {
    let readingPlayerStats =  JSON.stringify(player);
    localStorage.setItem('playerReadData', readingPlayerStats);
  })
};

// Reset stats
const resetButtom = document.getElementById('reset');
resetButtom.addEventListener('click', () => {
  localStorage.clear();
  resetGame();
});


