import { addBlock, findBlockById, removeBlock } from "../core/blocks.js";
import { removePlant } from "../core/plants.js";
import { state } from "../play.js";
import { DryField, EmptyField, PlowedField } from "./Block.js";

class Plant {
  constructor(id, name, maxGrowthStage, sellPrice, element) {
    element.classList.add("plant");
    this.id = id;
    this.name = name;
    this.growthStage = 1;
    this.maxGrowthStage = maxGrowthStage;
    this.growthInterval = null;
    this.needsWater = false;
    this.sellPrice = sellPrice;
    this.element = element;
    this.element.addEventListener("click", () => this.handleClick());
    this.startGrowthClock();
  }

  handleClick() {
    if (
      state.currentTool !== null &&
      state.currentTool.type === "watering-can"
    ) {
      const parentElement = this.element.parentElement;
      const blockId = Number(parentElement.dataset.id);
      const block = findBlockById(blockId);

      const newBlock = new PlowedField(null, block.position, parentElement);
      removeBlock(block);
      addBlock(newBlock);

      this.needsWater = false;
    }
  }

  startGrowthClock() {
    this.growthInterval = setInterval(() => {
      this.updateGrowthStage();
      if (this.growthStage > this.maxGrowthStage + 1 || this.needsWater) {
        this.removePlantElement();
        return;
      }

      if (!this.needsWater) {
        this.plantNeedsWater();
      }
      this.needsWater = !this.needsWater;
    }, 5000);
  }

  updateGrowthStage() {
    this.growthStage += 1;
    this.element.dataset.stage = this.growthStage;
  }

  removePlantElement() {
    clearInterval(this.growthInterval);
    const parentElement = this.element.parentElement;
    const blockId = Number(parentElement.dataset.id);
    const block = findBlockById(blockId);

    const newBlock = new EmptyField(null, block.position, parentElement);
    removeBlock(block);
    addBlock(newBlock);

    removePlant(this);
  }

  plantNeedsWater() {
    const parentElement = this.element.parentElement;
    const blockId = Number(parentElement.dataset.id);
    const block = findBlockById(blockId);

    const newBlock = new DryField(null, block.position, parentElement);
    removeBlock(block);
    addBlock(newBlock);
  }

  waterPlant() {
    const parentElement = this.element.parentElement;
    const blockId = Number(parentElement.dataset.id);
    const block = findBlockById(blockId);

    const newBlock = new PlowedField(null, block.position, parentElement);
    removeBlock(block);
    addBlock(newBlock);
  }
}

export class Carrot extends Plant {
  constructor(id, element) {
    element.dataset.type = "carrot";
    element.dataset.stage = 1;

    super(id, "Carrot", 3, 16, element);
  }
}

export class Tomato extends Plant {
  constructor(id, element) {
    element.dataset.type = "tomato";
    element.dataset.stage = this.growthStage;

    super(id, "Tomato", 5, 16, element);
  }
}

export class Potato extends Plant {
  constructor(id, element) {
    element.dataset.type = "potato";
    element.dataset.stage = 1;

    super(id, "Potato", 6, 20, element);
  }
}
