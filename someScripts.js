let isMmeber = false;

var users = ["p"];
var passwords = ["p"];
var fullNames = ["p"];
var emails = ["p@gmail.com"];
var birthDates = [Date.now];

function showUsers() {
  document.getElementById("demo").innerHTML = users;
}

$.validator.addMethod(
  "digitAndLetters",
  function (value, element) {
    if (isNaN(value)) {
      var mixNumberAndLetter = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
      if (!mixNumberAndLetter.test(value)) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  },
  "password doesnt contains letters and numebrs"
);

function usersAreFound(value) {
  for (i = 0; i < users.length; i++) {
    if (value == users[i]) {
      return false;
    }
  }
  return true;
}

function checkPassword(input) {
  let pass = document.getElementById("password").value;
  if (passwords[input] == pass) {
    return true;
  }
  return false;
}

function isFound(form) {
  let flag = false;
  for (i = 0; i < users.length; i++) {
    if (
      form.username.value == users[i] &&
      form.password.value == passwords[i] &&
      flag == false
    ) {
      flag = true;
      isMmeber = true;
      document.getElementById("placeForUser").innerHTML = "player " + users[i];
      document.getElementById("placeForUserInTheGame").innerHTML =
        "player " + users[i];

      $("#settingContent").show();
      $("#loginContent").hide();
      $("#registerContent").hide();
      $("#welcomeContent").hide();
      $("#game").hide();
      $("#canvas").hide();
      $("#time").hide();
      $("#score").hide();
    }
  }
  if (flag == false) {
    alert("Error Password or Username");
    $("#welcomeContent").hide();
    $("#loginContent").show();
    $("#settingContent").hide();
    $("#registerContent").hide();

    $("#game").hide();
    $("#canvas").hide();
    $("#time").hide();
    $("#score").hide();
  }
}

$.validator.addMethod(
  "usersAreFound",
  function (value, element) {
    return usersAreFound(value);
  },
  "the user is already register"
);

$.validator.addMethod(
  "usersAreFoundAndPasswordIsRight",
  function (value, element) {
    var length = users.length;

    for (i = 0; i < length; i++) {
      if (value == users[i]) {
        if (checkPassword(i) == true) {
          return true;
        }
        return false;
      }
    }
    return false;
  },
  "wrong inputs"
);

function containsDigitAndLetter() {
  var x, text;
  x = document.getElementById("password").value;
  if (isNaN(x)) {
    var mixNumberAndLetter = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
    if (!mixNumberAndLetter.test(x)) {
      text = "password doesnt contains letters and numebrs";
      document.getElementById("demo").innerHTML = text;
      return false;
    } else {
      return true;
    }
  } else {
    text = "password doesnt contains letters and numebrs";
    document.getElementById("demo").innerHTML = text;
    return false;
  }
}

function stop_game() {
  $("#game").hide();
  if_end_game = true;
  audio.pause();
  clearInterval(interval);
  clearInterval(monster_interval);
  clearInterval(magic_interval);
}

function showRegister() {
  if (!if_end_game) {
    stop_game();
  }
  $("#welcomeContent").hide();
  $("#registerContent").show();
  $("#loginContent").hide();
  $("#settingContent").hide();
  $("#contactUsContent").hide();
  $("#game").hide();
  $("#canvas").hide();
  $("#time").hide();
  $("#score").hide();
  $("#life").hide();
  $("#aboutUsContent").hide();
}

function showWelcome() {
  if (!if_end_game) {
    stop_game();
  }
  $("#welcomeContent").show();
  $("#registerContent").hide();
  $("#loginContent").hide();
  $("#settingContent").hide();
  $("#contactUsContent").hide();
  $("#game").hide();
  $("#canvas").hide();
  $("#time").hide();
  $("#score").hide();
  $("#life").hide();
  $("#aboutUsContent").hide();
}

function showLogin() {
  if (!if_end_game) {
    stop_game();
  }
  $("#welcomeContent").hide();
  $("#registerContent").hide();
  $("#loginContent").show();
  $("#settingContent").hide();
  $("#contactUsContent").hide();
  $("#game").hide();
  $("#canvas").hide();
  $("#time").hide();
  $("#score").hide();
  $("#life").hide();
  $("#aboutUsContent").hide();
}

function showSetting() {
  if (!if_end_game) {
    stop_game();
  }
  if (isMmeber == true) {
    $("#welcomeContent").hide();
    $("#registerContent").hide();
    $("#loginContent").hide();
    $("#settingContent").show();
    $("#contactUsContent").hide();
    $("#game").hide();
    $("#canvas").hide();
    $("#time").hide();
    $("#score").hide();
    $("#aboutUsContent").hide();
    $("#life").hide();
  } else {
    alert("you must login to the app");
  }
}

function showAboutUs() {
  if (!if_end_game) {
    stop_game();
  }
  $("#aboutUsContent").show();

  // Get the modal
  var modal = document.getElementById("myModal");
  modal.style.display = "block";

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Handle ESC key (key code 27)
  document.addEventListener("keyup", function (e) {
    if (e.keyCode == 27) {
      modal.style.display = "none";
    }
  });
}

function showContactUs() {
  if (!if_end_game) {
    stop_game();
  }
  $("#welcomeContent").hide();
  $("#registerContent").hide();
  $("#loginContent").hide();
  $("#settingContent").hide();
  $("#contactUsContent").show();
  $("#game").hide();
  $("#canvas").hide();
  $("#time").hide();
  $("#score").hide();
  $("#aboutUsContent").hide();
  $("#life").hide();
}

$().ready(function () {
  // validate signup form on keyup and submit

  $("#signupForm").validate({
    rules: {
      fullname: {
        number: false,
        required: true,

        //  type:Text
      },
      username: {
        required: true,
        usersAreFound: true,
      },
      password: {
        required: true,
        digitAndLetters: true,
        minlength: 6,
      },

      email: {
        required: true,
        email: true,
      },
      birthday: {
        required: true,
      },
    },

    submitHandler: function (form) {
      let userName = $("#username").val();
      let password = $("#password").val();
      let fullName = $("#fullname").val();
      let mail = $("#email").val();
      let date = $("#birthDate").val();
      users.push(userName);
      passwords.push(password);
      fullNames.push(fullName);
      emails.push(mail);
      birthDates.push(date);

      $("#loginContent").show();
      $("#registerContent").hide();
      $("#welcomeContent").hide();
      $("#settingContent").hide();
      $("#game").hide();
      $("#canvas").hide();
      $("#time").hide();
      $("#score").hide();
      $("#life").hide();
    },

    messages: {
      fullname: {
        required: "Please enter your name",
        number: "numbers are not allowd",

        //type:"dsadasd"
        //type:"numbers are not allowd"
      },
      username: {
        required: "Please enter a username",
        usersAreFound: "username is already taked, please select another",
      },
      password: {
        required: "Please provide a password",
        digitAndLetters: "enter password with at least 1 letters and 1 digit",
        minlength: "Your password must be at least 6 characters long",
      },
      email: "Please enter a valid email address",
      birthday: "Please enter a date",
    },
  });
});

function showPassword() {
  var x = document.getElementById("passwordInput");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
