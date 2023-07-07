var timerElement = $('#timer');
var timer;
var timerCount = 60;
var startGame = $('#start-game');
var hasWon = false;
var currentTextContent = 0; // Equating each text state/question to a number to determine what gets displayed on the screen.
var contentSections = document.getElementsByClassName('section');

// Function to remove whichever section is active. Will then make new section active after.
function removeAllSections() {
    for (content of contentSections) {
        content.classList.remove('active');
    }
}

// Function that occurs when timer reaches 0.
function loseQuiz() {
    removeAllSections();
    $('game-lost').addClass('active');
}

function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.text(timerCount);
        if (timerCount >= 0) {
            if (hasWon && timerCount > 0) {
            clearInterval(timer);
            }
        }
        if (timerCount === 0) {
            clearInterval(timer);
            loseQuiz();
        }
    }, 1000);
}

function changeContent() {
    if (currentTextContent === 1) {
        removeAllSections();
        $('#question-1').addClass('active');
    } else if (currentTextContent === 2) {
        removeAllSections();
        $('#question-2').addClass('active');
    } else if (currentTextContent === 3) {
        removeAllSections();
        $('#question-3').addClass('active');
    } else if (currentTextContent === 4) {

    } else if (currentTextContent === 5) {

    } 
}

function gameStart() {
    currentTextContent = 1;
    changeContent();
    startTimer();
}

startGame.on('click', gameStart);

