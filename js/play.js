const state = {
  money: 100,
  currentTool: null,
  currentSeed: null,
  plantedSeeds: [],
};

const gameBoard = document.getElementById("game-board");
const toolsBoard = document.getElementById("tools-board");
const seedsBoard = document.getElementById("seeds-board");

let obstacles = [];

function onStartGame() {
  createGameBoard();
}

function createGameBoard() {
  for (let i = 0; i < 144; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;

    const obstacle = createObstacles();
    if (obstacle) {
      cell.appendChild(obstacle);
    }

    gameBoard.appendChild(cell);
  }
}

function createObstacles() {
  const obstacleTypes = ["rock", "bush", "none"];
  const obstacleElement = document.createElement("div");
  const randomType =
    obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];

  if (randomType !== "none") {
    obstacleElement.classList.add("obstacle", randomType);
    return obstacleElement;
  } else {
    return null;
  }
}

document.addEventListener("DOMContentLoaded", onStartGame);
