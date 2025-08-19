let plants = [];

export function addPlant(plant) {
  if (findPlantById(plant.id)) {
    throw new Error("Plant with this ID already exists");
  }
  plant.id = plants.length + 1;
  plants.push(plant);
  return plant;
}

export function getPlants() {
  return [...plants];
}

export function findPlantById(id) {
  return plants.find((plant) => plant.id === id);
}
