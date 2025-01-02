var espDict;
var engDict;
var selection = -1;
var lastButton;
var x = 0;
var positiveCounter = 0;
const buttonColor = "#2196F3";
const buttonDisabled = "#607D8B";
const buttonSelected = "#9C27B0";

const positiveList = ["Great job! 🌟", "Well done! 👍", "Fantastic work! 🎉", "You're on fire! 🔥", "Amazing! 💥", "Perfect! ✅", "Bravo! 👏", "Excellent! 🎉🎉", "You're a pro! 🏅", "Outstanding! 🌈", "¡Buen trabajo! 👏", "¡Increíble! 🌟", "¡Fantástico! 🎉"];
const negativeList = ["Almost there! Keep going! 💪", "Not quite, but you're close! 🔍", "You're on the right track! Try again. ✨", "So close! A little more effort! 💡", "Good try! Let’s keep working on it! 🌱", "Almost perfect! You can do it! 🌟", "Nice attempt! Don’t give up! 💪", "Almost, just a little tweak! 🔧", "Close, but not quite. Try again! 🔄", "Great effort, but it needs a little adjustment! 🛠️", "¡Casi! ¡Sigue intentándolo! 💪", "¡Muy cerca! Un poco más y lo consigues! 🔍", "¡Buen intento! ¡Ánimo! 🌱"];

function findOut(id) {
    setSelected(id);
    validate(id);
}

function validate(id) {
    const button = document.getElementById(id);
    const text = button.textContent;

    var translation = -1;

    if (selection == -1) {
        lastButton = button;
        for (var i = 0; i < espDict.length; i++) {
            if (text == espDict[i])
                selection = i;
        }
        return;
    }

    for (var i = 0; i < engDict.length; i++) {
        if (text.trim().localeCompare(engDict[i].trim()) == 0)
            translation = i;
    }
    unselectAll();

    if (selection == translation)
        positiveAnswer(button);
    else 
        negativeAnswer();


    selection = -1;
    lastButton = null;
}

function positiveAnswer(button) {
    const randomIndex = Math.floor(Math.random() * positiveList.length);
    const message = document.getElementById("message");

    message.textContent=positiveList[randomIndex];
    message.style.color='#4CAF50';

    button.disabled=true;
    button.style.background=buttonDisabled;
    button.style.opacity=0.5;
    lastButton.disabled=true;
    lastButton.style.background=buttonDisabled;
    lastButton.style.opacity=0.5;

    positiveCounter++;

    if (positiveCounter == 5) {
        positiveCounter = 0;
        x += 5;
        prepareButtons();
        resetButtons();
    }
}
function negativeAnswer() {
    const randomIndex = Math.floor(Math.random() * negativeList.length);

    message.textContent=negativeList[randomIndex];
    message.style.color='#F44336';
}

function resetButtons() {
    for (var i = 0; i < 5; i++) {
        const leftButton = document.getElementById("left" + i);
        const rightButton = document.getElementById("right" + i);
        
        leftButton.disabled=false;
        leftButton.style.background=buttonColor;
        leftButton.style.opacity=1;

        rightButton.disabled=false;
        rightButton.style.background=buttonColor;
        rightButton.style.opacity=1;
    }
}

function unselectAll() {
    for (var i = 0; i < 5; i++) {
        const leftButton = document.getElementById("left" + i);
        const rightButton = document.getElementById("right" + i);
        leftButton.setAttribute("selected", false);
        rightButton.setAttribute("selected", false);
        if (!leftButton.disabled)
            leftButton.style.background=buttonColor;
        if (!rightButton.disabled)
            rightButton.style.background=buttonColor;
    }
}

function unselectOther(id) {
    const side = id.slice(0, -1);
    const currentId = id.slice(-1);
    for (var i = 0; i < 5; i++) {
        if (i == currentId)
            continue;

        const button = document.getElementById(side + i);
        button.setAttribute("selected", "false");
        if (!button.disabled)
            button.style.background=buttonColor;
    }
}

function setSelected(id) {
    const button = document.getElementById(id);
    const selectedAttribute = button.getAttribute("selected");

    if (selectedAttribute == "true") { // bez mozliwosci odznaczania
        // button.setAttribute("selected", "false");
        // button.style.background=buttonColor;
    }
    else {
        button.setAttribute("selected", "true");
        button.style.background=buttonSelected;
    }

    unselectOther(id);
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

function setDictionaries(esp, eng) {
    espDict = esp;
    engDict = eng;
    prepareButtons();
}
  
function prepareButtons() {
    var espDictToShow = new Array();
    var engDictToShow = new Array();

    for (var i = x; i < x+5; i++) {
        espDictToShow.push(espDict[i]);
        engDictToShow.push(engDict[i]);
    }

    let shuffledEsp = espDictToShow.slice();
    let shuffledEng = engDictToShow.slice();
    shuffle(shuffledEsp);
    shuffle(shuffledEng);

    for (var i = 0; i < shuffledEsp.length; i++) {
        document.querySelector('#left' + i).innerText = shuffledEsp[i];
        document.querySelector('#right' + i).innerText = shuffledEng[i];
    }
}