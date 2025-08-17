const plants = [
  {
    id: 1,
    name: "Carrot",
    growthTime: 3,
    sellPrice: 16,
  },
  {
    id: 2,
    name: "Tomato",
    growthTime: 5,
    sellPrice: 16,
  },
  {
    id: 3,
    name: "Potato",
    growthTime: 5,
    sellPrice: 14,
  },
];

export function getPlants() {
  return [...plants];
}

export function findPlantById(id) {
  return plants.find((plant) => plant.id === id);
}
