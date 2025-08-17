import { getTools } from "./tools.js";

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
  createGameTools();
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
    obstacleElement.addEventListener("click", handleObstacleClick);
    return obstacleElement;
  } else {
    return null;
  }
}

function handleObstacleClick(event) {
  const obstacle = event.target;
  if (obstacle.classList.contains("obstacle")) {
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

document.addEventListener("DOMContentLoaded", onStartGame);
