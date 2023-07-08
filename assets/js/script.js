var timerElement = $('#timer');
var timer;
var timerCount = 60;
var startGame = $('#start-game');
var currentTextContent = 0; // Equating each text state/question to a number to determine what gets displayed on the screen.
var contentSections = document.getElementsByClassName('section');
var answers = document.getElementsByClassName('button-answer'); // Getting all answers to add event listener that checks valid answer and goes to next question.
var highScores = []; // Currently empty array, will contain high scores to display on leaderboard.

// Function to remove whichever section is active. Will then make new section active after.
function removeAllSections() {
    for (content of contentSections) {
        content.classList.remove('active');
    }
}

// Function that occurs when timer reaches 0.
function loseQuiz() {
    removeAllSections();
    $('#game-lost').addClass('active');
}

function checkLoss() {
    if (timerCount === 0) {
        clearInterval(timer);
        loseQuiz();
    }
}

// Function for timer.
function startTimer() {
    timer = setInterval(function() {
        checkLoss();
        timerCount--;
        timerElement.text(timerCount);
    }, 1000);
}

// Changes the currently displayed content based on earlier initialized variable. 
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
        clearInterval(timer);
        removeAllSections();
        $('#game-won').addClass('active');
        $('#score').text(timerCount);
    }
}

// Adding event listeners that check for data attribute to determine if answer is correct.
for (answer of answers) {
    if (answer.getAttribute('data')==='incorrect') {
        answer.addEventListener('click', function() {
            timerCount = timerCount - 5;
            timerElement.text(timerCount);
            checkLoss();
            currentTextContent++;
            changeContent();
        })
    } else {
        answer.addEventListener('click', function() {
        checkLoss();
        currentTextContent++;
        changeContent();
    })
    }
};

$('#win-form').on('submit', function(event) { // Append user score and initials to leaderboard on form submission.
    event.preventDefault(); // Prevent page reload.
    removeAllSections();
    var userScore = $('#win-input').val() + ': ' + $('#score').text();
    var userScoreContainer = $('<p>').text(userScore);
    $('#leaderboard-div').addClass('active');
    $('#leaderboard').append(userScoreContainer);
});

$('#view-leaderboard').on('click', function() { // Event listener to view leaderboard at any time.
    removeAllSections();
    $('#leaderboard-div').addClass('active');
})

$('#back').on('click', function() {
    removeAllSections();
    $('#start-game').addClass('active');
    timerCount = 60; // Reset timer.
    timerElement.text(timerCount);
})


function gameStart() {
    currentTextContent = 1;
    changeContent();
    startTimer();
}

startGame.on('click', gameStart);

