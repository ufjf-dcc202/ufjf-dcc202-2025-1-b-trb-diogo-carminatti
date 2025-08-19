let obstacles = [];

export function addObstacle(obstacle) {
  if (obstacles.some((obs) => obs.position === obstacle.position)) return;
  obstacle.id = obstacles.length + 1;
  obstacles.push(obstacle);
  return obstacle;
}

export function getObstacles() {
  return [...obstacles];
}

export function removeObstacle(obstacle) {
  obstacles = obstacles.filter((obs) => obs !== obstacle);
}

export function findObstacleByPosition(position) {
  return obstacles.find((obs) => obs.position === position);
}
