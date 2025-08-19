class Plant {
  constructor(id, name, growthTime, sellPrice, element) {
    this.id = id;
    this.name = name;
    this.growthTime = growthTime;
    this.sellPrice = sellPrice;
    this.element = element;
  }
}

export class Carrot extends Plant {
  constructor(id, element) {
    element.dataset.type = "carrot";
    element.dataset.stage = 1;
    element.classList.add("plant");

    super(id, "Carrot", 5, 16, element);
  }
}

export class Tomato extends Plant {
  constructor(id, element) {
    super(id, "Tomato", 6, 16, element);
  }
}

export class Potato extends Plant {
  constructor(id, element) {
    super(id, "Potato", 7, 20, element);
  }
}
