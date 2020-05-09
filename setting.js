let upKeyCode;
let downKeyCode;
let rightKeyCode;
let leftKeyCode;

function showGameSetting() {}

document.addEventListener("DOMContentLoaded", init);
function init() {
  let up = document.getElementById("upKey");
  up.addEventListener("keydown", updateUpKey);
  let down = document.getElementById("downKey");
  down.addEventListener("keydown", updateDownKey);
  let right = document.getElementById("rightKey");
  right.addEventListener("keydown", updateRightKey);
  let left = document.getElementById("leftKey");
  left.addEventListener("keydown", updateLeftKey);
}

function updateUpKey(event) {
  let char = event.char || event.fromCharCode || event.which;
  if (char != 9 && char != 11) {
    if (char == 40) {
      $("#upKey").val("Arrow Down");
    } else if (char == 39) {
      $("#upKey").val("Arrow Right");
    } else if (char == 38) {
      $("#upKey").val("Arrow Up");
    } else if (char == 37) {
      $("#upKey").val("Arrow Left");
    } else {
      document.getElementById("upKey").value = char;
      upKeyCode = char;
      let up = document.getElementById("upKey");
      up.value = "";
    }
    upKeyCode = char;
  }
}

function updateDownKey(event) {
  let char = event.char || event.fromCharCode || event.which;
  if (char != 9 && char != 11) {
    if (char == 40) {
      $("#downKey").val("Arrow Down");
    } else if (char == 39) {
      $("#downKey").val("Arrow Right");
    } else if (char == 38) {
      $("#downKey").val("Arrow Up");
    } else if (char == 37) {
      $("#downKey").val("Arrow Left");
    } else {
      console.log(event.keycode);
      console.log(char);
      document.getElementById("downKey").value = event.keycode;
      let down = document.getElementById("downKey");
      down.value = "";
    }
    downKeyCode = char;
  }
}

function updateRightKey(event) {
  let char = event.char || event.fromCharCode || event.which;
  if (char != 9 && char != 11) {
    if (char == 40) {
      $("#rightKey").val("Arrow Down");
    } else if (char == 39) {
      $("#rightKey").val("Arrow Right");
    } else if (char == 38) {
      $("#rightKey").val("Arrow Up");
    } else if (char == 37) {
      $("#rightKey").val("Arrow Left");
    } else {
      document.getElementById("rightKey").value = char;
      let right = document.getElementById("rightKey");
      right.value = "";
    }
    rightKeyCode = char;
  }
}

function updateLeftKey(event) {
  let char = event.char || event.fromCharCode || event.which;
  if (char != 9 && char != 11) {
    if (char == 40) {
      $("#leftKey").val("Arrow Down");
    } else if (char == 39) {
      $("#leftKey").val("Arrow Right");
    } else if (char == 38) {
      $("#leftKey").val("Arrow Up");
    } else if (char == 37) {
      $("#leftKey").val("Arrow Left");
    } else {
      document.getElementById("leftKey").value = char;
      let left = document.getElementById("leftKey");
      left.value = "";
    }
    leftKeyCode = char;
  }
}
// function updateUpKey(event) {
//   let char = event.char || event.fromCharCode || event.which;
//   if (char == 40) {
//     $(".move key").val("Arrow Down");
//   } else if (char == 39) {
//     $(".move key").val("Arrow Right");
//   } else if (char == 38) {
//     $(".move key").val("Arrow Up");
//   } else if (char == 37) {
//     $(".move key").val("Arrow Left");
//   } else {
//     let s = String.fromCharCode(char);
//     //$(".move key").val(char);
//     //$(".move key").val(char);
//     document.getElementsByClassName("move key").value = char;
//     let up = document.getElementsByClassName("move key");
//     up.value = "";
//   }
// }

// $.validator.setDefaults({
//     submitHandler: function() {
//         alert("submitted!");
//     }
// });

$(document).ready(function () {
  $("#random").click(function () {
    let ballsNum = Math.floor(Math.random() * 41) + 50;
    let ballOneColor = getRandomColor();
    let ballSecondColor = getRandomColor();
    let ballThirdColor = getRandomColor();
    let time = Math.floor(Math.random() * 601) + 60;
    let monstersNum = Math.floor(Math.random() * 4) + 1;
    let up = "Arrow Up";
    let down = "Arrow Down";
    let right = "Arrow RIGHT";
    let left = "Arrow Left";
    upKeyCode = 38;
    downKeyCode = 40;
    rightKeyCode = 39;
    leftKeyCode = 37;
    $("#ballsNum").val(ballsNum);
    $("#ballOneColor").val(ballOneColor);
    $("#ballSecondColor").val(ballSecondColor);
    $("#ballThirdColor").val(ballThirdColor);
    $("#timeGame").val(time);
    $("#monsterNum").val(monstersNum);
    $("#upKey").val(up);
    $("#downKey").val(down);
    $("#rightKey").val(right);
    $("#leftKey").val(left);
  });
});

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

$(document).ready(function () {
  // validate the comment form when it is submitted
  $("#settingForm").validate({
    rules: {
      upKey: {
        required: true,
      },
      downKey: {
        required: true,
      },
      leftKey: {
        required: true,
      },
      rightKey: {
        required: true,
      },
      ballsNum: {
        required: true,
        min: 50,
        max: 90,
      },
      ballOneColor: {
        required: true,
      },

      ballSecondColor: {
        required: true,
      },

      ballThirdColor: {
        required: true,
      },

      timeGame: {
        required: true,
        min: 60,
      },

      monsterNum: {
        required: true,
        min: 1,
        max: 4,
      },
    },
    submitHandler: function (form) {
      let ballsNum = $("#ballsNum").val();
      let ballOneColor = $("#ballOneColor").val();
      let ballSecondColor = $("#ballSecondColor").val();
      let ballThirdColor = $("#ballThirdColor").val();
      let time = $("#time").val();
      let monstersNum = $("#monsterNum").val();
      $("#settingContent").hide();
      $("#game").show();
      $("#canvas").show();
      $("#time").show();
      $("#score").show();
      $("#life").show();
      updateGameKeys(upKeyCode, downKeyCode, rightKeyCode, leftKeyCode);
      Start();
    },
    messages: {
      upKey: "Please enter up key",
      downKey: "Please enter down key",
      rightKey: "Please enter right key",
      leftKey: "Please enter left key",
      ballsNum: {
        required: "Please enter amount of balls",
        min: "error! please 50 or more balls",
        max: "error! please insert 90 or less balls",
      },
      ballOneColor: "Please provide color",
      ballSecondColor: "Please provide color",
      ballThirdColor: "Please provide color",
      timeGame: {
        required: "Please provide time",
        min: "error! please insert 60 or more seconds",
      },
      monsterNum: {
        required: "Please provide number of monsters",
        min: "error! please insert 1 or more monsters",
        max: "error! please insert 4 or less monsters",
      },
    },
  });
});
