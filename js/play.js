import { getTools } from "./tools.js";
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
  const obstacles = getObstacles();
  const obstacleElement = document.createElement("div");
  const randomNumber = Math.floor(Math.random() * (obstacles.length + 1));

  if (randomNumber < obstacles.length) {
    obstacleElement.dataset.id = obstacles[randomNumber].id;
    obstacleElement.classList.add("obstacle", obstacles[randomNumber].class);
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
    obstacleType.interactToolId === Number(state.currentTool)
  ) {
    obstacle.remove();
  }
}

function createGameTools() {
  const tools = getTools();
  tools.forEach((tool) => {
    const toolElement = document.createElement("div");
    toolElement.classList.add("tool", tool.class);
    toolElement.dataset.id = tool.id;
    toolElement.addEventListener("click", handleToolClick);
    toolsBoard.appendChild(toolElement);
  });
}

function handleToolClick(event) {
  const tool = event.target;
  const toolId = tool.dataset.id;

  state.currentSeed = null;
  seedsBoard.querySelectorAll(".seed.selected").forEach((selectedSeed) => {
    selectedSeed.classList.remove("selected");
  });

  if (toolId === state.currentTool) {
    state.currentTool = null;
    tool.classList.remove("selected");
    return;
  }

  state.currentTool = toolId;
  toolsBoard.querySelectorAll(".tool.selected").forEach((selectedTool) => {
    selectedTool.classList.remove("selected");
  });
  tool.classList.add("selected");
}

function createGameSeeds() {
  const seeds = getSeeds();
  seeds.forEach((seed) => {
    const seedElement = document.createElement("div");
    seedElement.classList.add("seed", seed.class);
    seedElement.dataset.id = seed.id;
    seedElement.addEventListener("click", handleSeedClick);
    seedsBoard.appendChild(seedElement);
  });
}

function handleSeedClick(event) {
  const seed = event.target;
  const seedId = seed.dataset.id;

  state.currentTool = null;
  toolsBoard.querySelectorAll(".tool.selected").forEach((selectedTool) => {
    selectedTool.classList.remove("selected");
  });

  if (seedId === state.currentSeed) {
    state.currentSeed = null;
    seed.classList.remove("selected");
    return;
  }

  state.currentSeed = seedId;
  seedsBoard.querySelectorAll(".seed.selected").forEach((selectedSeed) => {
    selectedSeed.classList.remove("selected");
  });
  seed.classList.add("selected");
}

document.addEventListener("DOMContentLoaded", onStartGame);
