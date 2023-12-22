var displaydealerCards = document.getElementById("dealercards");
var displayplayerCards = document.getElementById("playercards");
var hitMessage = document.getElementById('hitMessage');
var dealersCards = '';
var playersCards = '';
var values = [2, 3, 4, 5, 6, 7, 8, 9, 10,'A', 'K', 'Q', 'J'];
var types = ['S', 'H', 'D', 'C'];
var deck = [];

var dealerSum = 0;
var playerSum = 0;

var dealerAceCount = 0;
var playerAceCount = 0;

var hidden;
var card;

let canHit = true;


// deck of cards - 52 (13*4)
// shuffle decks
// select a card (random)
// deal hands to dealer and player
// give the options to hit or stand
// - if hit add card
// - if stand let dealer play
// determine the winner

window.onload = function () {
  createDeck();
  shuffleDeck();
  startGame();
}

function createDeck () {
  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push(values[j] + "-" + types[i]);
    }
  }
}

function shuffleDeck () {
  for (let i = 0; i < deck.length ; i++) {
    let j = Math.floor(Math.random() * deck.length);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  console.log(deck);
}

function startGame () {
  for (let i = 0; i < 2; i++) {
    hidden = deck.pop();
    dealersCards += `${hidden} ,`;
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);

    let card = deck.pop();
    playersCards += `${card} ,`;
    playerSum += getValue(card);
    playerAceCount += checkAce(card); 
  }
  document.getElementById('hit').addEventListener('click', hit);
  document.getElementById('stand').addEventListener('click', stand);
  displaydealerCards.innerText = dealersCards;
  displayplayerCards.innerText = playersCards;
}

function hit () {
  if(!canHit) {
    hitMessage.innerHTML = "You can not Hit anymore. Choose Stand."
    return;
  }
  let card = deck.pop();
  playersCards += ` ${card} `;
  displayplayerCards.innerText = playersCards;
  playerSum += getValue(card);
  playerAceCount += checkAce(card);

  if (reduceAce (playerSum, playerAceCount) > 21) {
    canHit = false;
  }
}

function stand () {
  while (dealerSum < 17) {
    let card = deck.pop();
    dealersCards += `${card} ,`;
    displaydealerCards.innerText = dealersCards;
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
  }

  dealerSum = reduceAce(dealerSum, dealerAceCount);
  playerSum = reduceAce(playerSum, playerAceCount);

  canHit = false;
  document.getElementById("hidden");

  let message = "";
  if (playerSum > 21) {
      message = "You Lose!";
  }
  else if (dealerSum > 21) {
      message = "You win!";
  }
 
  else if (playerSum == dealerSum) {
      message = "Tie!";
  }
  else if (playerSum > dealerSum) {
      message = "You Win!";
  }
  else if (playerSum < dealerSum) {
      message = "You Lose!";
  }
  document.getElementById("message").innerText = message;
}

function getValue (card) {
  let data = card.split("-");
  let value = data[0];

  if (isNaN(value)) {
    if (value === 'A') {
      return 11;
    }
    return 10;
  }
  return parseInt(value);
}

function checkAce(card) {
  if (card[0] == "A") {
      return 1;
  }
  return 0;
}

function reduceAce(playerSum, playerAceCount) {
  while (playerSum > 21 && playerAceCount > 0) {
      playerSum -= 10;
      playerAceCount -= 1;
  }
  return playerSum;
}
  