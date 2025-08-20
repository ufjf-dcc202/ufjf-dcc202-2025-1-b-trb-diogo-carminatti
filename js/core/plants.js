let plants = [];

export function addPlant(plant) {
  if (findPlantById(plant.id)) return;
  plant.id = plants.length + 1;
  plants.push(plant);
  return plant;
}

export function removePlant(plant) {
  plants = plants.filter((p) => p.id !== plant.id);
  plant.element.remove();
  plant.element = null;
}

export function getPlants() {
  return [...plants];
}

export function findPlantById(id) {
  return plants.find((plant) => plant.id === id);
}
