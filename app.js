var audio = new Audio("music.mp3");
var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var time_to_play;
var interval;
var monster_interval;
var magic_interval;
var down;
var up;
var left;
var right;
var num_of_monsters;
var up_line_index;
var down_line_index;
var right_col_index;
var left_col_index;
var monsters_locations;
var magic_location;
var canvas;
var monster_img;
var monster_color;
var life;
var current_balls_num;
var magic_img;
var magic_sound;
var magic_not_capture;
var balls_array_color;
var if_end_game;
var mushroom_sound;
var die_sound;
var candy_sound;
var board_row_size;
var board_col_size;
var total_balls;
var random_choose;
var random_ball_color;
var balls_array_amount;
var array_color_number;
var food_remain;
var i;
var j;
var pacman_direction;
var pacman_direction_index;
var pacman_img_up;
var pacman_img_down;
var pacman_img_left;
var pacman_img_right;
var mushroom;
var mushroom_not_captured;
var mushroom_img;
var candy_img;
var is_eat_candy;
var time_for_candy_impact;
var is_double_points;
var candy_location;
var win_sound;
var lose_sound;

$(document).ready(function () {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
});

function rematch_game() {
  audio.pause();
  clearInterval(interval);
  clearInterval(monster_interval);
  clearInterval(magic_interval);
  //clearInterval(slow_interval);
  //clearInterval(timer);
  interval = null;
  monster_interval = null;
  magic_interval = null;
  Start();
}

function Start() {
  audio.play();
  init_varibales();
  init_board(); //create 2d array initialize with 6
  set_walls(); //put walls initialize with 4
  set_pacman(); //put pacman not in corners initialize with 5
  set_balls(); //put food balls initialize with 0,1,2 according to colors
  initMonstersLocation(
    //put monsters in corners
    up_line_index,
    down_line_index,
    left_col_index,
    right_col_index
  );
  set_candy();
  set_mushroom();
  keysDown = {};
  addEventListener(
    "keydown",
    function (e) {
      console.log(e.keyCode);
      keysDown[e.keyCode] = true;
    },
    false
  );
  addEventListener(
    "keyup",
    function (e) {
      console.log(e.keyCode);
      keysDown[e.keyCode] = false;
    },
    false
  );
  interval = setInterval(UpdatePosition, 100);
  monster_interval = setInterval(update_monsters_locations, 550);
  magic_interval = setInterval(update_magic_location, 50);
}

function set_mushroom() {
  let flag = false;
  while (!flag) {
    let emptyCell = findRandomEmptyCell(board);
    if (
      !(emptyCell[0] == 0 && emptyCell[1] == 0) &&
      !(emptyCell[0] == 0 && emptyCell[1] == 9) &&
      !(emptyCell[0] == 9 && emptyCell[1] == 0) &&
      !(emptyCell[0] == 9 && emptyCell[1] == 9)
    ) {
      //!(emptyCell[0] == wizard_location[0] && emptyCell[1] == wizard_location[1]
      mushroom_location[0] = emptyCell[0];
      mushroom_location[1] = emptyCell[1];
      flag = true;
      return;
    }
  }
}

function set_candy() {
  let flag = false;
  while (!flag) {
    let emptyCell = findRandomEmptyCell(board);
    if (
      !(emptyCell[0] == 0 && emptyCell[1] == 0) &&
      !(emptyCell[0] == 0 && emptyCell[1] == 9) &&
      !(emptyCell[0] == 9 && emptyCell[1] == 0) &&
      !(emptyCell[0] == 9 && emptyCell[1] == 9)
    ) {
      candy_location[0] = emptyCell[0];
      candy_location[1] = emptyCell[1];
      flag = true;
      return;
    }
  }
}

function init_varibales() {
  is_double_points = false;
  is_eat_candy = false;
  candy_location = [];
  mushroom_location = [];
  mushroom_not_captured = true;
  mushroom_img = new Image();
  mushroom_img.src = "mushroom-png-8.png";
  pacman_img_up = new Image();
  pacman_img_down = new Image();
  pacman_img_left = new Image();
  pacman_img_right = new Image();
  candy_img = new Image();
  candy_img.src = "candy-yellow-quotnimm-2quot.png";
  pacman_img_up.src = "pacman up.png";
  pacman_img_down.src = "pacman down.png";
  pacman_img_left.src = "pacman left.png";
  pacman_img_right.src = "pacman right.png";
  pacman_direction = [
    pacman_img_up,
    pacman_img_down,
    pacman_img_left,
    pacman_img_right,
  ];
  pacman_direction_index = 3;
  board_row_size = 10;
  board_col_size = 10;
  // wizard_not_captured = true;
  // wizard_location = [];
  // wizard_img = new Image();
  // wizard_img.src = "wizard-penguin-2.png";
  monster_color = [
    "redMonster.png",
    "yellowMonster.png",
    "blueMonster.png",
    "greenMonster.png",
  ];
  die_sound = new Audio("pacman_death.wav");
  magic_sound = new Audio("pacman_eatfruit.wav");
  candy_sound = new Audio("pacman_eatghost.wav");
  win_sound = new Audio("win.mpeg");
  lose_sound = new Audio("lose.mp3");
  //mushroom_sound = new Audio("")
  if_end_game = false;
  balls_array_color = new Array(3);
  balls_array_color[0] = $("#ballOneColor").val();
  balls_array_color[1] = $("#ballSecondColor").val();
  balls_array_color[2] = $("#ballThirdColor").val();
  magic_not_capture = true;
  magic_location = [];
  magic_location.push([0, 0]);
  life = 5;
  magic_img = new Image();
  magic_img.src = "wizard-penguin-2.png";
  up_line_index = 0;
  down_line_index = 9;
  right_col_index = 9;
  left_col_index = 0;
  num_of_monsters = $("#monsterNum").val();
  time_to_play = $("#timeGame").val();
  current_balls_num = $("#ballsNum").val();
  total_balls = $("#ballsNum").val();
  random_ball_color = 3;
  balls_array_amount = new Array(3);
  array_color_number = new Array(3);
  array_color_number[0] = 0;
  array_color_number[1] = 1;
  array_color_number[2] = 2;
  balls_array_amount[0] = Math.floor(total_balls * 0.6);
  balls_array_amount[1] = Math.floor(total_balls * 0.3);
  balls_array_amount[2] =
    total_balls - balls_array_amount[0] - balls_array_amount[1];
  board = new Array();
  score = 0;
  pac_color = "yellow";
  start_time = new Date();
}

function init_board() {
  for (let i = 0; i < board_row_size; i++) {
    board[i] = new Array(10);
    for (let j = 0; j < board_col_size; j++) {
      board[i][j] = 6;
    }
  }
}

function set_balls() {
  food_remain = total_balls;
  while (food_remain > 0) {
    let emptyCell = findRandomEmptyCell(board);
    food_remain--;
    if (balls_array_amount.length == 1) {
      random_choose = 0;
    } else {
      random_choose = Math.floor(Math.random() * random_ball_color);
    }
    board[emptyCell[0]][emptyCell[1]] = array_color_number[random_choose]; //food
    balls_array_amount[random_choose]--;
    if (
      balls_array_amount.length > 1 &&
      balls_array_amount[random_choose] == 0
    ) {
      let index = 0;
      random_ball_color--;
      let copy_amount_array = balls_array_amount;
      let copy_array_color_number = array_color_number;
      balls_array_amount = new Array(random_ball_color);
      array_color_number = new Array(random_ball_color);
      let i;
      for (i = 0; i < copy_amount_array.length; i++) {
        if (copy_amount_array[i] != 0) {
          balls_array_amount[index] = copy_amount_array[i];
          array_color_number[index] = copy_array_color_number[i];
          index++;
        }
      }
    }
  }
}

function set_walls() {
  //let ballsNum = Math.floor(Math.random() * 41) + 50;
  let num_of_walls = (board_row_size - 2) / 2;
  while (num_of_walls > 0) {
    let wall_row = Math.floor(Math.random() * (board_row_size - 3)) + 1;
    let wall_col = Math.floor(Math.random() * (board_col_size - 3)) + 1;
    if (board[wall_row][wall_col] != 4) {
      board[wall_row][wall_col] = 4;
      let array = get_legal_move(wall_row, wall_col);
      let random_wall = Math.floor(Math.random() * array.length);
      board[array[random_wall][0]][array[random_wall][1]] = 4;
      num_of_walls--;
    }
  }
}

function set_pacman() {
  let flag_pacman = false;
  while (!flag_pacman) {
    i = Math.floor(Math.random() * (board_row_size - 4)) + 2;
    j = Math.floor(Math.random() * (board_col_size - 4)) + 2;
    if (board[i][j] == 6) {
      shape.i = i;
      shape.j = j;
      board[i][j] = 5;
      flag_pacman = true;
      //pacman_remain--;
      return;
    }
  }
}

function initMonstersLocation(up_line, down_line, left_col, right_col) {
  monsters_locations = [];
  monsters_locations.push([up_line, left_col]);
  if (num_of_monsters == 4) {
    monsters_locations.push([up_line, right_col]);
    monsters_locations.push([down_line, left_col]);
    monsters_locations.push([down_line, right_col]);
  } else if (num_of_monsters == 3) {
    monsters_locations.push([up_line_index, right_col_index]);
    monsters_locations.push([down_line, left_col]);
  } else if (num_of_monsters == 2) {
    monsters_locations.push([down_line, right_col]);
  }
}

function findRandomEmptyCell(board) {
  let row = Math.floor(Math.random() * 10);
  let col = Math.floor(Math.random() * 10);
  while (board[row][col] != 6) {
    row = Math.floor(Math.random() * 10);
    col = Math.floor(Math.random() * 10);
  }
  return [row, col];
}
function updateGameKeys(upKeyCode, downKeyCode, rightKeyCode, leftKeyCode) {
  up = upKeyCode;
  console.log("upKey in app is:" + up);
  down = downKeyCode;
  left = leftKeyCode;
  right = rightKeyCode;
}

function GetKeyPressed() {
  if (keysDown[up]) {
    return 1;
  }
  if (keysDown[down]) {
    return 2;
  }
  if (keysDown[left]) {
    return 3;
  }
  if (keysDown[right]) {
    return 4;
  }
}

function Draw() {
  canvas.width = canvas.width; //clean board
  lblScore.value = score;
  lblTime.value = time_elapsed;
  lblLife.value = life;
  lblNumOfBalls.value = total_balls;
  lblFirstColor.value = balls_array_color[0];
  lblSecondColor.value = balls_array_color[1];
  lblThirdColor.value = balls_array_color[2];
  lblNumOfMonsters.value = num_of_monsters;
  lblUP.value = up;
  lblDOWN.value = down;
  lblRIGHT.value = right;
  lblLEFT.value = left;

  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      var center = new Object();
      center.x = i * 60 + 30;
      center.y = j * 60 + 30;
      // context.fillStyle = "black";
      // context.(center.x - 30, center.y - 30, 60, 60);
      if (board[i][j] == 5) {
        //pacman_img = new Image();
        //pacman_img.src = pacman_direction[pacman_direction_index];
        context.drawImage(
          pacman_direction[pacman_direction_index],
          shape.i * 60,
          shape.j * 60,
          50,
          50
        );
      } else if (board[i][j] == 0 || board[i][j] == 1 || board[i][j] == 2) {
        //food
        context.beginPath();
        context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
        context.fillStyle = balls_array_color[board[i][j]];
        //context.fillStyle = "black"; //color
        context.fill();
      } else if (board[i][j] == 4) {
        context.beginPath();
        context.rect(center.x - 30, center.y - 30, 60, 60);
        context.fillStyle = "grey"; //color
        context.fill();
      }
    }
  }
  if (!if_end_game) {
    draw_monsters();
  }
  if (magic_not_capture) {
    draw_magic();
  }
  if (!is_eat_candy) {
    draw_candy();
  }
  if (mushroom_not_captured) {
    draw_mushroom();
  }
}

function draw_mushroom() {
  context.drawImage(
    mushroom_img,
    mushroom_location[0] * 60,
    mushroom_location[1] * 60,
    50,
    50
  );
}

function draw_candy() {
  context.drawImage(
    candy_img,
    candy_location[0] * 60,
    candy_location[1] * 60,
    50,
    50
  );
}

function draw_magic() {
  //context.fillStyle("yellow");
  context.drawImage(
    magic_img,
    magic_location[0][0] * 60,
    magic_location[0][1] * 60,
    50,
    50
  );
}

function draw_monsters() {
  let counter = 0;
  for (let i = 0; i < monsters_locations.length; i++) {
    monster_img = new Image();
    monster_img.src = monster_color[i];
    context.drawImage(
      monster_img,
      monsters_locations[i][0] * 60,
      monsters_locations[i][1] * 60,
      50,
      50
    );
    // context.globalAlpha = 1;
  }
}

// function move_monster(i,j){
//   return 3;
// }

function update_magic_location() {
  let legal_moves = get_legal_move(magic_location[0][0], magic_location[0][1]);
  let chocie = Math.floor(Math.random() * legal_moves.length);
  magic_location[0][0] = legal_moves[chocie][0];
  magic_location[0][1] = legal_moves[chocie][1];
  if (magic_location[0][0] == shape.i && magic_location[0][1] == shape.j) {
    magic_sound.play();
    magic_not_capture = false;
    score += 50;
    //board[shape.i][shape.j] = clearInterval(magic_interval);
    clearInterval(magic_interval);
  }
}

function update_monsters_locations() {
  for (let s = 0; s < monsters_locations.length; s++) {
    let legal_moves = get_legal_move(
      monsters_locations[s][0],
      monsters_locations[s][1]
    );
    choose_best_move(s, legal_moves);
    if (
      monsters_locations[s][0] == shape.i &&
      monsters_locations[s][1] == shape.j
    ) {
      handle_eat_by_monster();
      return;
    }
    setTimeout(300, choose_best_move(s, legal_moves));
  }
}

function handle_eat_by_monster() {
  die_sound.play();
  score = score - 10;
  life--;
  if (life <= 0) {
    lose_game();
  }
  initMonstersLocation(
    up_line_index,
    down_line_index,
    left_col_index,
    right_col_index
  );
  draw_monsters();
  set_pacman();
  //setTimeout((interval = setInterval(120)), 5000);
}

function get_legal_move(row, col) {
  let legal_moves = [];
  if (row < 9 && board[row + 1][col] != 4) {
    legal_moves.push([row + 1, col]);
  }
  if (col < 9 && board[row][col + 1] != 4) {
    legal_moves.push([row, col + 1]);
  }
  if (row > 0 && board[row - 1][col] != 4) {
    legal_moves.push([row - 1, col]);
  }
  if (col > 0 && board[row][col - 1] != 4) {
    legal_moves.push([row, col - 1]);
  }
  return legal_moves;
}

function choose_best_move(monster_index, moves) {
  let min_distance =
    Math.abs(moves[0][0] - shape.i) + Math.abs(moves[0][1] - shape.j);
  let min_index = 0;
  let distance;
  for (let m = 1; m < moves.length; m++) {
    distance =
      Math.abs(moves[m][0] - shape.i) + Math.abs(moves[m][1] - shape.j);
    if (min_distance > distance) {
      min_distance = distance;
      min_index = m;
    }
  }
  monsters_locations[monster_index] = moves[min_index];
}

function check_if_eat_by_moster() {
  for (let s = 0; s < monsters_locations.length; s++) {
    if (
      monsters_locations[s][0] == shape.i &&
      monsters_locations[s][1] == shape.j
    ) {
      return true;
    }
  }
  return false;
}

function UpdatePosition() {
  board[shape.i][shape.j] = 6;
  let x = GetKeyPressed();
  if (x == 1) {
    //up
    if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
      shape.j--;
      pacman_direction_index = x - 1;
    }
  } else if (x == 2) {
    //down
    if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
      shape.j++;
      pacman_direction_index = x - 1;
    }
  } else if (x == 3) {
    //left
    if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
      shape.i--;
      pacman_direction_index = x - 1;
    }
  } else if (x == 4) {
    //right
    if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
      shape.i++;
      pacman_direction_index = x - 1;
    }
  }

  if (check_if_eat_by_moster()) {
    handle_eat_by_monster();
    if (score == 0) {
      return;
    }
  } else if (
    mushroom_not_captured &&
    shape.i == mushroom_location[0] &&
    shape.j == mushroom_location[1]
  ) {
    die_sound.play();
    life--;
    mushroom_not_captured = false;
    if (life <= 0) {
      lose_game();
    }
  } else if (board[shape.i][shape.j] == 0) {
    if (is_double_points) {
      score += 10;
    } else {
      score += 5;
    }
    current_balls_num--;
  } else if (board[shape.i][shape.j] == 1) {
    if (is_double_points) {
      score += 30;
    } else {
      score += 15;
    }
    current_balls_num--;
  } else if (board[shape.i][shape.j] == 2) {
    if (is_double_points) {
      score += 50;
    } else {
      score += 25;
    }
    current_balls_num--;
  }
  if (
    magic_not_capture &&
    magic_location[0][0] == shape.i &&
    magic_location[0][1] == shape.j
  ) {
    magic_sound.play();
    magic_not_capture = false;
    score += 50;
    //board[shape.i][shape.j] = clearInterval(magic_interval);
    clearInterval(magic_interval);
  }
  board[shape.i][shape.j] = 5;
  let currentTime = new Date();
  time_elapsed = (currentTime - start_time) / 1000;
  // time_elapsed = (time_to_play - (currentTime - start_time) / 1000).toFixed(3);
  if (
    !is_eat_candy &&
    shape.i == candy_location[0] &&
    shape.j == candy_location[1]
  ) {
    time_for_candy_impact = time_elapsed + 5;
    candy_sound.play();
    is_eat_candy = true;
    is_double_points = true;
  } else if (is_double_points && time_for_candy_impact < time_elapsed) {
    is_double_points = false;
    //candy_sound.play();
  }
  if (is_double_points) {
    candy_sound.play();
  }
  if (time_elapsed > time_to_play) {
    if_end_game = true;
    audio.pause();
    if (score < 100) {
      lose_sound.play();
      window.alert("You are better than " + score + " points!");
    } else {
      win_sound.play();
      window.alert("Winner!!!");
    }
    clearInterval(interval);
    clearInterval(monster_interval);
    clearInterval(magic_interval);
    return;
  }
  if (current_balls_num == 0) {
    if_end_game = true;
    audio.pause();
    win_sound.play();
    clearInterval(interval);
    clearInterval(monster_interval);
    clearInterval(magic_interval);
    window.alert("Well Done!! You finish eating all the food");
  } else {
    Draw();
  }
}

function lose_game() {
  if_end_game = true;
  audio.pause();
  lose_sound.play();
  clearInterval(interval);
  clearInterval(monster_interval);
  clearInterval(magic_interval);
  window.alert("Loser!");
}
