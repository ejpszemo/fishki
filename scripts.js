var espDict;
var engDict;

var firstSelectionId = -1;
var lastButton = null;
var x = 0;
var positiveCounter = 0;

const buttonCount = 10;
const positiveList = ["Great job! 🌟", "Well done! 👍", "Fantastic work! 🎉", "You're on fire! 🔥", "Amazing! 💥", "Perfect! ✅", "Bravo! 👏", "Excellent! 🎉🎉", "You're a pro! 🏅", "Outstanding! 🌈", "¡Buen trabajo! 👏", "¡Increíble! 🌟", "¡Fantástico! 🎉"];
const negativeList = ["Almost there! Keep going! 💪", "Not quite, but you're close! 🔍", "You're on the right track! Try again. ✨", "So close! A little more effort! 💡", "Good try! Let’s keep working on it! 🌱", "Almost perfect! You can do it! 🌟", "Nice attempt! Don’t give up! 💪", "Almost, just a little tweak! 🔧", "Close, but not quite. Try again! 🔄", "Great effort, but it needs a little adjustment! 🛠️", "¡Casi! ¡Sigue intentándolo! 💪", "¡Muy cerca! Un poco más y lo consigues! 🔍", "¡Buen intento! ¡Ánimo! 🌱"];

function buttonClicked(button) {
    setSelected(button);
    validate(button);
}

function validate(button) {
    const text = button.textContent;
    const leftSide = (button.id % 2 != 0);
    var secondSelectionId = -1;

    if (leftSide && (lastButton && lastButton.id % 2 != 0)
        || !leftSide && (lastButton && lastButton.id % 2 == 0)) {
        // when user clicks one side two times, reset validation
        firstSelectionId = -1;
        lastButton = null;
    }

    // first selection
    if (firstSelectionId == -1) {
        lastButton = button;

        if (leftSide) {
            for (var i = 0; i < espDict.length; i++) {
                if (text.trim().localeCompare(espDict[i].trim()) == 0)
                    firstSelectionId = i;
            }
        }
        else {
            for (var i = 0; i < engDict.length; i++) {
                if (text.trim().localeCompare(engDict[i].trim()) == 0)
                    firstSelectionId = i;
            }
        }
        return;
    }

    // second selection
    if (leftSide) {
        for (var i = 0; i < espDict.length; i++) {
            if (text.trim().localeCompare(espDict[i].trim()) == 0)
                secondSelectionId = i;
        }
    }
    else {
        for (var i = 0; i < engDict.length; i++) {
            if (text.trim().localeCompare(engDict[i].trim()) == 0)
                secondSelectionId = i;
        }
    }

    unselectAll();

    if (firstSelectionId == secondSelectionId)
        positiveAnswer(button);
    else
        negativeAnswer();

    firstSelectionId = -1;
    lastButton = null;
}

function positiveAnswer(button) {
    const randomIndex = Math.floor(Math.random() * positiveList.length);
    const message = document.getElementById("message");

    message.textContent = positiveList[randomIndex];
    message.setAttribute("positive", true);

    button.disabled = true;
    lastButton.disabled = true;

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
    message.textContent = negativeList[randomIndex];
    message.setAttribute("positive", false);
}

function resetButtons() {
    for (var i = 1; i <= 10; i++) {
        const button = document.getElementById(i);
        button.disabled = false;
    }
}

function unselectAll() {
    for (var i = 1; i <= buttonCount; i++) {
        const button = document.getElementById(i);
        button.setAttribute("selected", false);
    }
}

function unselectOther(button) {
    const currentId = button.id;
    const leftSide = (currentId % 2 != 0);

    for (var i = (leftSide ? 1 : 2); i <= buttonCount; i += 2) {
        if (i == currentId)
            continue;

        const buttonToUnselect = document.getElementById(i);
        buttonToUnselect.setAttribute("selected", false);
    }
}

function setSelected(button) {
    const isSelected = button.getAttribute("selected");

    if (isSelected == "true") {
        button.setAttribute("selected", false);
    }
    else {
        button.setAttribute("selected", true);
    }

    unselectOther(button);
}

function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] =
            [array[randomIndex], array[currentIndex]];
    }
}
function shufflePairs(firstArray, secondArray) {
    // shuffles both arrays the same way to contain same 5 translates in one screen
    let currentIndex = firstArray.length;

    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [firstArray[currentIndex], firstArray[randomIndex]] = 
            [firstArray[randomIndex], firstArray[currentIndex]];
        [secondArray[currentIndex], secondArray[randomIndex]] =
            [secondArray[randomIndex], secondArray[currentIndex]];
    }
}

function setDictionaries(esp, eng) {
    espDict = esp;
    engDict = eng;
    shufflePairs(espDict, engDict); // make sure it is not same words every time
    prepareButtons();
}

function prepareButtons() {
    var espDictToShow = new Array();
    var engDictToShow = new Array();

    for (var i = x; i < x + 5; i++) {
        espDictToShow.push(espDict[i]);
        engDictToShow.push(engDict[i]);
    }

    let shuffledEsp = espDictToShow.slice();
    let shuffledEng = engDictToShow.slice();
    shuffle(shuffledEsp);
    shuffle(shuffledEng);

    var j = 0;
    for (var i = 1; i <= buttonCount; i++) {
        const leftSide = (i % 2 != 0);
        if (leftSide) {
            document.getElementById(i).innerText = shuffledEsp[j];
        }
        else {
            document.getElementById(i).innerText = shuffledEng[j];
            j++;
        }
    }
}