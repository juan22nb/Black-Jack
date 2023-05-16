var dealerSum = 0;
var yourSum = 0;
var dealerAceCount = 0;
var yourAceCount = 0; // A, 2 + K -> 1 + 2 + 10
var hidden;
var deck;
var CanHit = true;
var nombre;

window.onload = function () {
    buildDeck();
    barajar();
    iniciarjuego();
}
document.getElementById("jugar").addEventListener("click", jugar);

function jugar() {
    document.getElementById("encabezado").style.display = 'none';
}
function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "P", "T"];
     deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]);
        }
    }
    //console.log(deck);
}
function barajar() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}
function iniciarjuego() {
    hidden = deck.pop();
    dealerSum += obtenervalor(hidden);
    dealerAceCount += cheackAce(hidden);
    //console.log(hidden);
    //console.log(dealerSum);
    for (let i = 0; i < 1; i++) {//while (dealerSum <= 11)
        //<img src="./cartas/10-D.svg" alt="">
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cartas/" + card + ".svg";
        dealerSum += obtenervalor(card);
        dealerAceCount += cheackAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    console.log(dealerSum);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cartas/" + card + ".svg";
        yourSum += obtenervalor(card);
        yourAceCount += cheackAce(card);
        document.getElementById("your-cards").append(cardImg);
    }

    console.log(yourSum);

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
}
function hit() {
    if (!CanHit) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cartas/" + card + ".svg";
    yourSum += obtenervalor(card);
    yourAceCount += cheackAce(card);
    document.getElementById("your-cards").append(cardImg);

    if (reduceAce(yourSum, yourAceCount) > 21) {
        CanHit = false;
    }
}
function stay() {

    yourSum = reduceAce(yourSum, yourAceCount);
    CanHit = false;
    document.getElementById("hidden").src = "./cartas/" + hidden + ".svg";
    let message = "";

    if (yourSum < 21 && dealerSum < 21 && dealerSum < 17) {
        while (dealerSum < 17) {
            //<img src="./cartas/10-D.svg" alt="">
            let cardImg = document.createElement("img");
            let card = deck.pop();
            cardImg.src = "./cartas/" + card + ".svg";
            dealerSum += obtenervalor(card);
            dealerAceCount += cheackAce(card);
            document.getElementById("dealer-cards").append(cardImg);
            dealerSum = reduceAce(dealerSum, dealerAceCount);
        }
    }
    if (yourSum > 21) {
        message = "¡PERDISTE!";
    }
    else if (dealerSum > 21) {
        message = "¡GANASTE!";
    }
    else if (yourSum == dealerSum) {
        message = "EMPATE";
    }
    else if (yourSum > dealerSum) {
        message = "¡GANASTE!";
    }
    else if (yourSum < dealerSum) {
        message = "¡PERDISTE!";
    }
    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("results").innerText = message;
    setTimeout(function () {
        var message = document.getElementById("results");
        message.style.display = "none";
    }, 2000);
    var reset = document.getElementById("reset");
    reset.style.display = "inline-block";
}
function obtenervalor(card) {
    let data = card.split("-"); //dividimos los valores "4-C" -> ["4", "C"]
    let value = data[0];

    if (isNaN(value)) {
        if (value == "A") { // si sale una A equivale 11, y si sale otra diferente equivale a 10
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}
function cheackAce(card) { 
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}
function reduceAce(playerSum, playerAceCount) { //Si la cuenta es mayor a 21 y contiene A se resta -10
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}
function comenzar() {
    var x = document.getElementById("contenido");
    var y = document.getElementById("playgame");
    var z = document.getElementsByTagName("play")[0];
    if (x.style.display == "none") {
        x.style.display = "block";
        y.style.display = "none";
        z.innerHTML = "contenido";
    } else {
        x.style.display = "none";
        y.style.display = "block";
        z.innerHTML = "playgame";
    }
}
function reset() {
    location.reload();
}