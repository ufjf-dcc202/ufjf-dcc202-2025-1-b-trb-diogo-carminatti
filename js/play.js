import { EmptyField } from "./entities/Block.js";
import { Bush, Rock } from "./entities/Obstacle.js";
import { addObstacle } from "./core/obstacles.js";
import { addBlock } from "./core/blocks.js";
import { getTools } from "./core/tools.js";
import { getSeeds } from "./core/seeds.js";

export const state = {
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
    const blockElement = document.createElement("div");
    const block = new EmptyField(i, i, blockElement);

    const obstacle = createObstacle(i);
    if (obstacle) {
      block.addChild(obstacle.element);
      addObstacle(obstacle);
    }

    gameBoard.appendChild(blockElement);
    addBlock(block);
  }
}

function createObstacle(index) {
  const obstacleElement = document.createElement("div");
  const randomNumber = Math.floor(Math.random() * 3 + 1);

  let obstacle;
  switch (randomNumber) {
    case 1:
      obstacle = new Rock(null, index, obstacleElement);
      obstacle = addObstacle(obstacle);
      break;
    case 2:
      obstacle = new Bush(null, index, obstacleElement);
      obstacle = addObstacle(obstacle);
      break;
    case 3:
      obstacle = null;
      break;
  }

  return obstacle;
}

function createGameTools() {
  const tools = getTools();
  tools.forEach((tool) => {
    toolsBoard.appendChild(tool.element);
  });
}

function createGameSeeds() {
  const seeds = getSeeds();
  seeds.forEach((seed) => {
    seedsBoard.appendChild(seed.element);
  });
}

document.addEventListener("DOMContentLoaded", onStartGame);
