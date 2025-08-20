import { Hoe, Pickaxe, WateringCan, Scythe } from "../entities/Tool.js";

const tools = [
  new Pickaxe(1, document.createElement("div")),
  new Hoe(2, document.createElement("div")),
  new WateringCan(3, document.createElement("div")),
  new Scythe(4, document.createElement("div")),
];

export function getTools() {
  return [...tools];
}

export function findToolById(id) {
  return tools.find((tool) => tool.id === id);
}
