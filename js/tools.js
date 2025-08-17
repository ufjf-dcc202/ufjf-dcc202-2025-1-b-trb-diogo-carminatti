const tools = [
  {
    id: 1,
    name: "Watering Can",
    type: "watering-can",
  },
  {
    id: 2,
    name: "Hoe",
    type: "hoe",
  },
  {
    id: 3,
    name: "Pickaxe",
    type: "pickaxe",
  },
];

export function getTools() {
  return [...tools];
}

export function findToolById(id) {
  return tools.find((tool) => tool.id === Number(id));
}
