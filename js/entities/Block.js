import { addBlock, removeBlock } from "../core/blocks.js";
import { state } from "../play.js";

export const blockTypes = {
  EMPTY: "empty",
  PLOWED: "plowed",
  DRY: "dry",
};

export class Block {
  constructor(id, position, element) {
    element.classList.add("block");
    element.dataset.id = id;

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
  constructor(id, position, element, active = true) {
    super(id, position, element);
    this.element.addEventListener("click", this.handleClick);
    this.element.dataset.type = blockTypes.EMPTY;
    this.active = active;
  }

  handleClick() {
    if (
      state.currentTool !== null &&
      state.currentTool.type === "hoe" &&
      this.element.innerHTML === ""
    ) {
      if (this.active) {
        const newBlock = new PlowedField(this.id, this.position, this.element);
        removeBlock(this);
        addBlock(newBlock);
      } else {
        this.active = true;
      }
    }
  }
}

export class PlowedField extends Block {
  constructor(id, position, element) {
    super(id, position, element);
    this.element.addEventListener("click", this.handleClick);
    this.element.dataset.type = blockTypes.PLOWED;
  }

  handleClick() {
    if (state.currentSeed !== null && state.currentSeed.type !== null) {
      if (state.money < state.currentSeed.seedPrice) {
        alert("Sem dinheiro suficiente");
        return;
      }

      state.money -= state.currentSeed.seedPrice;
      const newPlant = state.currentSeed.getPlant(this.element);
      this.element.appendChild(newPlant.element);
      const moneyAmount = document.querySelector("#money-amount");
      moneyAmount.textContent = `$${state.money}`;
    }
  }
}

export class DryField extends Block {
  constructor(id, position, element) {
    super(id, position, element);
    this.element.dataset.type = blockTypes.DRY;
  }

  handleClick() {
    return;
  }
}
