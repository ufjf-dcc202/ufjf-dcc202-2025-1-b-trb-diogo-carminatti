import { findToolById, getTools } from "./tools.js";
import { getSeeds } from "./seeds.js";
import { findObstacleById, getObstacles } from "./obstacles.js";

const state = {
  money: 100,
  currentTool: null,
  currentSeed: null,
  plantedSeeds: [],
};

const gameBoard = document.getElementById("game-board");
const toolsBoard = document.getElementById("tools-board");
const seedsBoard = document.getElementById("seeds-board");

function onStartGame() {
  createGameBoard();
  createGameTools();
  createGameSeeds();
}

function createGameBoard() {
  for (let i = 0; i < 144; i++) {
    const cell = document.createElement("div");
    cell.dataset.index = i;
    cell.dataset.type = "empty";
    cell.classList.add("cell");
    cell.addEventListener("click", handleCellClick);

    const obstacle = createObstacles();
    if (obstacle) {
      cell.appendChild(obstacle);
    }
    gameBoard.appendChild(cell);
  }
}

function handleCellClick(event) {
  const cell = event.target;
  if (cell.innerHTML !== "") return;

  if (state.currentTool !== null && state.currentTool.type === "hoe") {
    cell.dataset.type = "plowed";
    return;
  }

  if (state.currentSeed !== null) {
  }
}

function createObstacles() {
  const obstacles = getObstacles();
  const obstacleElement = document.createElement("div");
  const randomNumber = Math.floor(Math.random() * (obstacles.length + 1));

  if (randomNumber < obstacles.length) {
    obstacleElement.dataset.id = obstacles[randomNumber].id;
    obstacleElement.dataset.type = obstacles[randomNumber].type;
    obstacleElement.classList.add("obstacle");
    obstacleElement.addEventListener("click", handleObstacleClick);
    return obstacleElement;
  } else {
    return null;
  }
}

function handleObstacleClick(event) {
  const obstacle = event.target;
  const obstacleId = Number(obstacle.dataset.id);
  const obstacleType = findObstacleById(obstacleId);

  if (
    obstacleType &&
    obstacleType.interactToolId === Number(state.currentTool.id)
  ) {
    obstacle.remove();
  }
}

function createGameTools() {
  const tools = getTools();
  tools.forEach((tool) => {
    const toolElement = document.createElement("div");
    toolElement.dataset.id = tool.id;
    toolElement.dataset.type = tool.type;
    toolElement.classList.add("tool");
    toolElement.addEventListener("click", handleToolClick);
    toolsBoard.appendChild(toolElement);
  });
}

function handleToolClick(event) {
  const tool = event.target;
  const toolId = Number(tool.dataset.id);
  const toolType = findToolById(toolId);

  state.currentSeed = null;
  seedsBoard.querySelectorAll(".seed.selected").forEach((selectedSeed) => {
    selectedSeed.classList.remove("selected");
  });

  if (state.currentTool !== null && toolId === state.currentTool.id) {
    state.currentTool = null;
    tool.classList.remove("selected");
    return;
  }

  state.currentTool = toolType;
  toolsBoard.querySelectorAll(".tool.selected").forEach((selectedTool) => {
    selectedTool.classList.remove("selected");
  });
  tool.classList.add("selected");
}

function createGameSeeds() {
  const seeds = getSeeds();
  seeds.forEach((seed) => {
    const seedElement = document.createElement("div");
    seedElement.dataset.id = seed.id;
    seedElement.dataset.type = seed.type;
    seedElement.classList.add("seed");
    seedElement.addEventListener("click", handleSeedClick);
    seedsBoard.appendChild(seedElement);
  });
}

function handleSeedClick(event) {
  const seed = event.target;
  const seedId = Number(seed.dataset.id);
  const seedType = findSeedById(seedId);

  state.currentTool = null;
  toolsBoard.querySelectorAll(".tool.selected").forEach((selectedTool) => {
    selectedTool.classList.remove("selected");
  });

  if (state.currentSeed !== null && seedId === state.currentSeed) {
    state.currentSeed = null;
    seed.classList.remove("selected");
    return;
  }

  state.currentSeed = seedType;
  seedsBoard.querySelectorAll(".seed.selected").forEach((selectedSeed) => {
    selectedSeed.classList.remove("selected");
  });
  seed.classList.add("selected");
}

document.addEventListener("DOMContentLoaded", onStartGame);
