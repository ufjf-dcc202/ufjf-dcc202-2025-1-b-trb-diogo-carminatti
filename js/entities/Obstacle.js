import { removeObstacle } from "../core/obstacles.js";
import { state } from "../play.js";

export const obstaclesTypes = {
  ROCK: "rock",
  BUSH: "bush",
};

class Obstacle {
  constructor(id, name, position, element) {
    element.dataset.position = position;
    this.id = id;
    this.name = name;
    this.position = position;
    this.element = element;
    this.handleClick = this.handleClick.bind(this);
    this.element.addEventListener("click", this.handleClick);
  }
}

export class Rock extends Obstacle {
  constructor(id, position, element) {
    element.dataset.type = obstaclesTypes.ROCK;
    element.classList.add("obstacle");
    super(id, "rock", position, element);
  }

  handleClick() {
    if (state.currentTool.type === "pickaxe") {
      removeObstacle(this);
      this.element.remove();
    }
  }
}

export class Bush extends Obstacle {
  constructor(id, position, element) {
    element.dataset.type = obstaclesTypes.BUSH;
    element.classList.add("obstacle");
    super(id, "bush", position, element);
  }

  handleClick() {
    if (state.currentTool.type === "hoe") {
      removeObstacle(this);
      this.element.remove();
    }
  }
}
