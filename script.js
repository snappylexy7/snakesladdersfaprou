// Define the game board structure
const boardSize = 100;
const ladderPositions = { 4: 25, 18: 46, 38: 49, 42: 63, 50: 69, 62: 81, 77: 99 };
const snakePositions = { 27: 5, 31: 3, 43: 13, 57: 40, 66: 45, 75: 53, 89: 58, 92: 41 };

// Load the tasks from the JSON file
let tasks;
fetch("tasks.json")
  .then(response => response.json())
  .then(data => {
    tasks = data;
  })
  .catch(error => {
    console.log("Error loading tasks:", error);
  });

// Generate the game board dynamically
const gameBoard = document.getElementById("game-board");
for (let i = 1; i <= boardSize; i++) {
  const square = document.createElement("div");
  square.innerText = i;
  // Add any additional styling or classes to the squares

  gameBoard.appendChild(square);
}

// Function to update the console log area
function updateConsoleLog(message) {
  const consoleLog = document.getElementById("console-log");
  consoleLog.innerText = message + "\n" + consoleLog.innerText;
}

// Function to update the console log area
function updateTaskLog(message) {
  const taskLog = document.getElementById("task-log");
  // taskLog.innerText = message + "\n" + taskLog.innerText;
  taskLog.innerText = message
}


// Add ladders to the game board
for (const [start, end] of Object.entries(ladderPositions)) {
  // Find the corresponding squares and add appropriate styling
}

// Add snakes to the game board
for (const [start, end] of Object.entries(snakePositions)) {
  // Find the corresponding squares and add appropriate styling
}

// Roll dice functionality
const rollDiceButton = document.getElementById("roll-dice");
rollDiceButton.addEventListener("click", () => {
  const diceRoll = Math.floor(Math.random() * 6) + 1; // Generate a random number between 1 and 6

  const newPosition = playerPosition + diceRoll;
  const logMessage = `Player rolled a ${diceRoll}. Moving to position ${newPosition}`;
  updateConsoleLog(logMessage);

  // Move the player to the new position
  movePlayer(newPosition);
});


// Game logic
let playerPosition = 1;

function movePlayer(position) {
  // Update the player's position on the game board
  const currentSquare = document.querySelector(`#game-board div:nth-child(${playerPosition})`);
  currentSquare.classList.remove("player");

  const newSquare = document.querySelector(`#game-board div:nth-child(${position})`);
  newSquare.classList.add("player");

  // Check if the new position corresponds to a task
  const task = tasks[position];
  if (task) {
    console.log(`You landed on position ${position}. TASK: ${task}`);
    const taskLogMessage = `${task}`;
    updateTaskLog(taskLogMessage);
  }

  // Check if the new position encounters a ladder
  if (ladderPositions[position]) {
    const ladderEndPosition = ladderPositions[position];
    const logMessage = `Encountered a ladder! Climbing up from ${position} to ${ladderEndPosition}`;
    updateConsoleLog(logMessage);
    movePlayer(ladderEndPosition);
    return;
  }

  // Check if the new position encounters a snake
  if (snakePositions[position]) {
    const snakeTailPosition = snakePositions[position];
    const logMessage = `Encountered a snake! Sliding down from ${position} to ${snakeTailPosition}`;
    updateConsoleLog(logMessage);
    movePlayer(snakeTailPosition);
    return;
  }

  // Update the player's position
  playerPosition = position;

  // Check if the player has reached the winning position
  if (playerPosition === boardSize) {
    const logMessage = "Congratulations! You won the game!";
    updateConsoleLog(logMessage);
    // You can display a message or perform any other action here
  }
}

// Add ladders to the game board
for (const [start, end] of Object.entries(ladderPositions)) {
  const ladderStartSquare = document.querySelector(`#game-board div:nth-child(${start})`);
  const ladderEndSquare = document.querySelector(`#game-board div:nth-child(${end})`);

  ladderStartSquare.classList.add("ladder-start");
  ladderEndSquare.classList.add("ladder-end");
}

// Add snakes to the game board
for (const [start, end] of Object.entries(snakePositions)) {
  const snakeStartSquare = document.querySelector(`#game-board div:nth-child(${start})`);
  const snakeEndSquare = document.querySelector(`#game-board div:nth-child(${end})`);

  snakeStartSquare.classList.add("snake-start");
  snakeEndSquare.classList.add("snake-end");
}
