var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var index = 0;

$(document).keypress(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  $("#mainText").text("Level " + ++level);
  var currentColor = buttonColours[generateRandom()];
  var currentBoxId = "#" + currentColor;
  $(currentBoxId).fadeOut(150).fadeIn(150);
  playSound(currentColor);
  gamePattern.push(currentColor);
}

$(".colorBox").click(function () {
  var userChosenColour = $(this).attr("id");
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  //Here
  if (userChosenColour === gamePattern[index]) {
    index++;
    if (userClickedPattern.length === gamePattern.length) {
      userClickedPattern = [];
      setTimeout(() => {
        nextSequence();
        index = 0;
      }, 1000);
    }
  } else {
    $("#mainText").text("Game over! Push any button to retry");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    index = 0;
    started = false;
  }
});

function generateRandom() {
  return Math.floor(Math.random() * 4);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

