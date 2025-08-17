const obstacles = [
  { id: 1, type: "rock", interactToolId: 3 },
  { id: 2, type: "bush", interactToolId: 2 },
];

export function getObstacles() {
  return [...obstacles];
}

export function findObstacleById(id) {
  return obstacles.find((obstacle) => obstacle.id === id);
}
