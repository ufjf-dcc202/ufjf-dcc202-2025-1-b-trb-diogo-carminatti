const seeds = [
  {
    id: 1,
    name: "Carrot",
    price: 8,
    type: "carrot",
  },
  {
    id: 2,
    name: "Tomato",
    price: 12,
    type: "tomato",
  },
  {
    id: 3,
    name: "Potato",
    price: 10,
    type: "potato",
  },
];

export function getSeeds() {
  return [...seeds];
}

export function findSeedById(id) {
  return seeds.find((seed) => seed.id === id);
}
