var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern =[];

var gameStarted = false;
var level = 0;

// INIT game

$(document).keypress(function(){
  if (!gameStarted){
    gameStarted = true;
    $("#level-title").text("Level " + level);
    nextSequence();
  }
});

// User input click button

$(".btn").on("click", function(event){
  if(gameStarted){
    var userChosenColor = $(this).attr("id");  // clicked yellow
    userClickedPattern.push(userChosenColor);  // add to user list

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
  }
});

// Flow of game, go to next step

function nextSequence(){
  userClickedPattern = [];

  $("#level-title").text("Level " + level);
  level++;

  var randomChosenColor = randomColor();

  console.log(gamePattern);
  var buttonID = "#"+randomChosenColor;
  $(buttonID).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}

// Control

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if (gamePattern.length === userClickedPattern.length){
      setTimeout(function unpress(){   // Set timeout is an built-in function for implementing delays
        nextSequence();
      }, 1000);
    }
  }else{
    console.log("wrong");
    playSound("wrong");
    startOver();
  }
}

// Game animations

function playSound(name){
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(color){
  var pressedObj = $("#"+color);
  pressedObj.addClass("pressed");
  setTimeout(function unpress(){   // Set timeout is an built-in function for implementing delays
    pressedObj.removeClass("pressed");
  }, 100);
}

function randomColor(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  return randomChosenColor;
}

function startOver(){
  gamePattern = [];
  gameStarted = false;
  level = 0;
  $("#level-title").text("Game Over. Press any key to start.");
}
