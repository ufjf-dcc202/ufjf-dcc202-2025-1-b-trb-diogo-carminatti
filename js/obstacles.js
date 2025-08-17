const obstacles = [
  { id: 1, class: "rock", interactToolId: 3 },
  { id: 2, class: "bush", interactToolId: 2 },
];

export function getObstacles() {
  return [...obstacles];
}

export function findObstacleById(id) {
  return obstacles.find((obstacle) => obstacle.id === id);
}
