import { addPlant } from "../core/plants.js";
import { state } from "../play.js";
import { Carrot } from "./Plant.js";

export const seedTypes = {
  CARROT: "carrot",
  POTATO: "potato",
  TOMATO: "tomato",
};

class Seed {
  constructor(id, name, type, element) {
    element.classList.add("seed");
    this.id = id;
    this.name = name;
    this.type = type;
    this.element = element;
    this.handleClick = this.handleClick.bind(this);
    element.addEventListener("click", this.handleClick);
  }

  handleClick() {
    if (state.currentTool !== null) {
      state.currentTool.deselect();
      state.currentTool = null;
    }

    if (state.currentSeed === this) {
      this.deselect();
      state.currentSeed = null;
      return;
    }

    if (state.currentSeed === null) {
      this.select();
      state.currentSeed = this;
    } else {
      state.currentSeed.deselect();
      this.select();
      state.currentSeed = this;
    }
  }

  select() {
    this.element.classList.add("selected");
  }

  deselect() {
    this.element.classList.remove("selected");
  }
}

export class CarrotSeed extends Seed {
  constructor(id, element) {
    element.dataset.type = seedTypes.CARROT;
    super(id, "carrot", seedTypes.CARROT, element);
  }

  getPlant(parentElement) {
    const plantElement = document.createElement("div");
    parentElement.appendChild(plantElement);

    let newSeed = new Carrot(null, plantElement);
    newSeed = addPlant(newSeed);
    return newSeed;
  }
}

export class PotatoSeed extends Seed {
  constructor(id, element) {
    element.dataset.type = seedTypes.POTATO;
    super(id, "potato", seedTypes.POTATO, element);
  }
}

export class TomatoSeed extends Seed {
  constructor(id, element) {
    element.dataset.type = seedTypes.TOMATO;
    super(id, "tomato", seedTypes.TOMATO, element);
  }
}
