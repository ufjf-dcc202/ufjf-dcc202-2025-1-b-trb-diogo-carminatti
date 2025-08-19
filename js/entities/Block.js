import { addBlock, removeBlock } from "../core/blocks.js";
import { state } from "../play.js";

export const blockTypes = {
  EMPTY: "empty",
  PLOWED: "plowed",
  DRY: "dry",
};

export class Block {
  constructor(id, position, element) {
    this.id = id;
    this.position = position;
    this.element = element;
    this.handleClick = this.handleClick.bind(this);
  }

  addChild(child) {
    this.element.appendChild(child);
  }

  removeChild() {
    this.element.innerHTML = "";
  }
}

export class EmptyField extends Block {
  constructor(id, position, element) {
    element.dataset.type = blockTypes.EMPTY;
    element.classList.add("block");

    super(id, position, element);
    this.element.addEventListener("click", this.handleClick);
  }

  handleClick() {
    if (state.currentTool.type === "hoe") {
      const newBlock = new PlowedField(this.id, this.position, this.element);

      removeBlock(this);
      addBlock(newBlock);
    }
  }
}

export class PlowedField extends Block {
  constructor(id, position, element) {
    element.dataset.type = blockTypes.PLOWED;
    element.classList.add("block");

    super(id, position, element);
    this.element.addEventListener("click", this.handleClick);
  }

  handleClick() {
    if (state.currentTool !== null && state.currentTool.type === "hoe") {
      this.element.innerHTML = "";
      return;
    }

    if (state.currentSeed !== null && state.currentSeed.type !== null) {
      const newPlant = state.currentSeed.getPlant(this.element);
      console.log("Plant added:", newPlant);
    }
  }
}

export class DryField extends Block {
  constructor(id, position, element) {
    super(id, position, element);
  }

  handleClick() {
    if (state.currentTool.type === "watering-can") {
      const newElement = this.element;
      newElement.dataset.type = blockTypes.PLOWED;
      const newBlock = new PlowedField(this.id, this.position, newElement);

      removeBlock(this);
      addBlock(newBlock);
    }
  }
}
