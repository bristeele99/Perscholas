class Skater {
  constructor(skill) {
    // this.confidence = confidence
    this.skill = skill || Math.floor(Math.random() * 10);
    this.letters = "";
  }
  log(message) {
    const newMessage = document.createElement("p");
    newMessage.textContent = message;

    logContainer.insertBefore(newMessage, logContainer.firstChild);
  }
}

const tonyHawk = new Skater(5);
const estroJen = new Skater(6);
const opponent = new Skater(5);

const paragraph = document.createElement("p");
const startButton = document.getElementById("start");
const opponentSetsButton = document.getElementById("opponentSets-button");
const opponentFollowsButton = document.getElementById("opponentFollows-button")
const myTurnButton = document.getElementById("my-turn-button");
const mySetButton = document.getElementById("my-set-button");
const player1button = document.getElementById("player1");
const player2button = document.getElementById("player2");
const trickButton = document.getElementById("trick-button");
const restartButton = document.getElementById("restart");
const logContainer = document.getElementById("logContainer");
const statusParagraph = document.getElementById("playerStatus");
const statusParagraph1 = document.getElementById("opponentStatus");

let gameStarted = false;
let keysToCheck = [];

//////////////////////////////////////////////////
/////////////////////BUTTONS//////////////////////
//////////////////////////////////////////////////

function toggleButtons(...buttonIds) {
  // Loop through all provided button IDs
  buttonIds.forEach((buttonId) => {
    const button = document.getElementById(buttonId);

    // Toggle visibility of buttons using CSS classes
    if (button) {
      button.classList.toggle("hidden");
    }
  });
}
// Attach click event listeners to start and restart to toggle buttons to start game or restart game.
startButton.addEventListener("click", () =>
  toggleButtons("player1", "player2", "restart", "start")
);

restartButton.addEventListener("click", () => {
  restartWindow();
});

opponentSetsButton.addEventListener("click", () => {
  checkOpponentScore();
  toggleButtons( "opponentSets-button");
});

opponentFollowsButton.addEventListener("click", () => {
  opponentFollows();
  toggleButtons("trick-list", "trick-button", "opponentFollows-button")
})

myTurnButton.addEventListener("click", () => {
  tonyLoserCheck();
  toggleButtons('trick-list', 'trick-button', 'my-turn-button')
})

mySetButton.addEventListener("click", () => {
  toggleButtons('trick-list', 'trick-button', 'my-set-button')
})

//toggle for choosing player at the start
player1button.addEventListener("click", () => {
  toggleButtons(
    "player1",
    "player2",
    "trick-button",
    "trick-list",
    "opponentStatus",
    "playerStatus"
  );
  gameStarted = true;
});
player2button.addEventListener("click", () => {
  toggleButtons("player1", "player2", "restart");
  gameStarted = true;
});

trickButton.addEventListener("click", function (event) {
  const newTrickList = document.querySelector("#trick-list");
  // Choose a random group of tricks
  const randomGroup = tricks[Math.floor(Math.random() * tricks.length)];

  // Assign displayed tricks to keysToCheck
  keysToCheck = randomGroup.map((trick) =>
    trick.split("+").pop().trim().toLowerCase()
  );

  // Update the Trick List
  newTrickList.innerHTML = randomGroup
    .map((trick) => `"${trick}"<br>`)
    .join("");

  // Initialize event listeners
  initializeEventListeners(keysToCheck);
});

/////////////////////////////////////////////////
///////////Randomize and Display keys////////////
/////////////////////////////////////////////////

let tricks = [
  [`a`, `g`, `p`],
  [`e`, `b`, `Tab`],
  [`r`, `t`, `m`],
  [`q`, `w`, `l`],
  [`r`, `s`, `h`],
  [`k`, `b`, `Tab`],
  [`j`, `b`, `a`],
  [`v`, `b`, `l`],
  [`k`, `e`, `z`],
  [`k`, `b`, `Tab`],
];

function listenForKeys(keys, callback) {
  const pressedKeys = new Set();

  function keydownHandler(event) {
    const key = event.key.toLowerCase();

    if (keys.includes(key)) {
      pressedKeys.add(key);
      checkKeys();
      event.preventDefault();
    }
  }

  function keyupHandler(event) {
    const key = event.key.toLowerCase();

    if (keys.includes(key)) {
      pressedKeys.delete(key);
    }
  }

  function checkKeys() {
    if (keys.every((key) => pressedKeys.has(key))) {
      callback();
    }
  }

  // Add event listeners
  document.addEventListener("keydown", keydownHandler);
  document.addEventListener("keyup", keyupHandler);

  // Return a function to remove the event listeners when needed
  return function removeListeners() {
    document.removeEventListener("keydown", keydownHandler);
    document.removeEventListener("keyup", keyupHandler);
  };
}

function initializeEventListeners(keys) {
  // Listen for keys in keysToCheck
  listenForKeys(keys, () => {
    // When all keys are pressed >>>
    checkTonySkill();
  });
}

//////////////////////////////////////////////////
////////////////Score Check///////////////////////
/////////////////////////////////////////////////
function updateScore() {
  statusParagraph.textContent = `Tony's Letters: ${tonyHawk.letters}`;
  statusParagraph1.textContent = `Opponent's Letters: ${opponent.letters}`;
}

function restartWindow() {
  location.reload();
}

function checkLetters(player) {
  if (gameStarted) {
    if (!player.letters.includes("S")) {
      player.letters += "S";
    } else if (!player.letters.includes("K")) {
      player.letters += "K";
    } else if (!player.letters.includes("A")) {
      player.letters += "A";
    } else if (!player.letters.includes("T")) {
      player.letters += "T";
    } else if (!player.letters.includes("E")) {
      player.letters += "E";
    } else if (!player.letters.includes("R")) {
      player.letters += "R";
    }
    updateScore(player);
    if (tonyHawk.letters.includes("SKATER")) {
      updateScore(player);
      tonyHawk.log(`You got "SKATER". You Lost...Try Again!`);
      toggleButtons("trick-button", "trick-list");
      removeListeners();
    }
  } else if (opponent.letters.includes("SKATER")) {
    updateScore(player);
    toggleButtons("trick-button", "trick-list");
    removeListeners();
  }
}

/////////////////////////////////////////////////
///////////LOGIC To Determine Game Letters///////
////////////////////////////////////////////////

function checkTonySkill() {
  const setRandomNum = Math.floor(Math.random() * 10);

  if (gameStarted) {
    if (tonyHawk.skill > setRandomNum) {
      tonyHawk.log(`Tony: Trick Set!`);
      toggleButtons("trick-list", "trick-button", "opponentFollows-button");
    } else {
      tonyHawk.log(`Tony: Trick not set.`);
      toggleButtons("trick-list", "trick-button", "opponentSets-button");
    }
  }
}

function opponentFollows() {
  const setRandomNum1 = Math.floor(Math.random() * 10);
  if (opponent.skill < setRandomNum1) {
    opponent.log("Opponent: Wiped out! LETTER added!");
    checkLetters(opponent);
    toggleButtons("my-turn-button", "trick-list", "trick-button");
  } else {
    opponent.log("Opponent: Trick Executed! No LETTER.");
    toggleButtons("opponent-button", "trick-list", "trick-button");
  }
}

function checkOpponentScore() {
  const setRandomNum1 = Math.floor(Math.random() * 10);
  if (gameStarted) {
    if (opponent.skill > setRandomNum1) {
      opponent.log(`Opponent: Trick Set! You're turn!`);
      toggleButtons('my-turn-button')
    } else if (opponent.skill < setRandomNum1) {
      opponent.log(`Opponent: Trick not set. You're turn`);
      toggleButtons('my-set-button')
    }
  }
}

function tonyLoserCheck() {
  const setRandomNum = Math.floor(Math.random() * 10);
  if (tonyHawk.skill > setRandomNum) {
    tonyHawk.log(`Tony: You Nailed It.`);
    toggleButtons("opponentFollows-button");
  } else {
    tonyHawk.log(`Tony: You missed. Check Your Letters`);
    checkLetters(tonyHawk);
    toggleButtons('opponentSets-button')
  }
}
