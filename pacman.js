// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;
var ghostsEaten = 0;
var dots = 240;

// Define your ghosts here
var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};
var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};
var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};
var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};
// replace this comment with your four ghosts setup as objects
var ghosts = []
ghosts.push(inky);
ghosts.push(blinky);
ghosts.push(pinky);
ghosts.push(clyde);

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives);
  console.log('\n\nPower-pellets: ' + powerPellets + '     Ghosts eaten: ' + ghostsEaten + '     Dots: ' + dots);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');
  console.log('(d) Eat Dot'); // each \n creates a new line
  if (dots > 0) {
    console.log('(f) Eat Remaining Dots');
  }
  if (dots > 10) {
    console.log('(g) Eat 10 Dots');
  }
  if (dots > 100) {
    console.log('(h) Eat 100 Dots');
  }
  if (powerPellets > 0) {
    console.log('(p) Eat Power-pellet\n');
  }
  console.log('(1) Eat ' + ghosts[0].name + edibility(ghosts[0]));
  console.log('(2) Eat ' + ghosts[1].name + edibility(ghosts[1]));
  console.log('(3) Eat ' + ghosts[2].name + edibility(ghosts[2]));
  console.log('(4) Eat ' + ghosts[3].name + edibility(ghosts[3]));
  console.log('\n(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot(amount) {
  if (dots === 0) {
    console.log('\nNo more dots! You won!');
    process.exit();
  }
  switch(amount) {
    case 1:
      score += 10;
      dots--;
    break;
    case 'all':
      score += 10 * dots;
      dots = 0;
      break;
    case 10:
    if (dots < 10) {
      return console.log('\nNot enough dots!');
    }
      score += 100;
      dots -= 10;
      break;
    case 100:
    if (dots < 100) {
      return console.log('\nNot enough dots!');
    }
      score += 1000;
      dots -= 100;
      break;
  }

  console.log('\nChomp!');
}

function edibility(ghost) {
  if (ghost.edible === false) {
    return '  (inedible)';
  } else {
    return '  (edible)';
  }
}

function checkEdibility(ghost) {
  return ghost.edible === false;
}

function eatGhost(ghost) {
  if (ghost.edible === false) {
    console.log('\n' + ghost.name + ' the ' + ghost.colour + ' chomps Pac-Man. You didn\'t have immunity!');
    lifeLost();
  } else {
    console.log('\nYou ate ' + ghost.character + ' ' + ghost.name + '.');
    ghost.edible = false;
    score += (200 * Math.pow(2, ghostsEaten));
    ghostsEaten++;
  }
}

function lifeLost() {
   lives--;
   if (lives === 0) {
     process.exit();
   }
 }

 function eatPowerPellet() {
   if (powerPellets === 0) {
     return console.log('\nNo Power-Pellets left!');
   } else if (ghosts.every(checkEdibility) === false) {
     return console.log('\nThere are still edible ghosts!');
   }
   console.log('\nPower-Pellet Powers Activate!');
   score += 50;
   powerPellets--;
   for (var index = 0; index < ghosts.length; index++) {
     ghosts[index].edible = true;
   }
   setTimeout(pelletTimer, 10000);
 }

function pelletTimer() {
  for (var index = 0; index < ghosts.length; index++) {
    ghosts[index].edible = false;
  }
  drawScreen();
}
// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot(1);
      break;
    case 'f':
      eatDot('all');
    break;
    case 'g':
      eatDot(10);
    break;
    case 'h':
      eatDot(100);
    break;
    case 'p':
      eatPowerPellet();
      break;
    case '1':
      eatGhost(ghosts[0]);
      break;
    case '2':
      eatGhost(ghosts[1]);
      break;
    case '3':
      eatGhost(ghosts[2]);
      break;
    case '4':
      eatGhost(ghosts[3]);
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 500); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
