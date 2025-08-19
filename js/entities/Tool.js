import { state } from "../play.js";

export const toolsTypes = {
  PICKAXE: "pickaxe",
  HOE: "hoe",
  WATERING_CAN: "watering-can",
};

class Tool {
  constructor(id, name, type, element) {
    element.classList.add("tool");
    this.id = id;
    this.name = name;
    this.type = type;
    this.element = element;
    this.handleClick = this.handleClick.bind(this);
    element.addEventListener("click", this.handleClick);
  }

  handleClick() {
    if (state.currentSeed !== null) {
      state.currentSeed.deselect();
      state.currentSeed = null;
    }

    if (state.currentTool === this) {
      this.deselect();
      state.currentTool = null;
      return;
    }

    if (state.currentTool === null) {
      this.select();
      state.currentTool = this;
    } else {
      state.currentTool.deselect();
      this.select();
      state.currentTool = this;
    }
  }

  select() {
    this.element.classList.add("selected");
  }

  deselect() {
    this.element.classList.remove("selected");
  }
}

export class Pickaxe extends Tool {
  constructor(id, element) {
    element.dataset.type = toolsTypes.PICKAXE;
    super(id, "Pickaxe", toolsTypes.PICKAXE, element);
  }
}

export class Hoe extends Tool {
  constructor(id, element) {
    element.dataset.type = toolsTypes.HOE;
    super(id, "Hoe", toolsTypes.HOE, element);
  }
}

export class WateringCan extends Tool {
  constructor(id, element) {
    element.dataset.type = toolsTypes.WATERING_CAN;
    super(id, "Watering Can", toolsTypes.WATERING_CAN, element);
  }
}
