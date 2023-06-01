var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

function checkAnswer (currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length) {    
            setTimeout(function () {
                nextSequence()
                userClickedPattern = [];
            }, 1000);    
        }
    }else {
        playSound(name="wrong");
        console.log("fail!");
        $("body").addClass("game-over");
    
        setTimeout(function () {
        $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over! Press Any Key to Restart");
        startOver();
    }
}


function startOver () {
    level = 0;
    gamePattern = [];
    started = false;
}


function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    var buttonSelected = '#' + randomChosenColour;
    $(buttonSelected).fadeOut(100).fadeIn(100);
    playSound (name = randomChosenColour);
    console.log(gamePattern);

}


$(".btn").on("click", function() {
    // var userChosenColour = $(this).attr("id");
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound (name = userChosenColour);
    console.log(userClickedPattern);
    var userSelected = '#' + userChosenColour;
    animatePress(currentColour = userSelected);
    checkAnswer (currentLevel = userClickedPattern.length - 1);
});

function playSound (name) {
    var soundName = "./sounds/" + name + ".mp3";
    var newSound = new Audio(soundName);
    newSound.play();
}

function animatePress(currentColour) {
    $(currentColour).addClass("pressed");
    
    setTimeout(function () {
        $(currentColour).removeClass("pressed");
    }, 100);
}


$(document).on('keydown', function(event) { 
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        userClickedPattern = [];
    } 
    started = true;
});



    








