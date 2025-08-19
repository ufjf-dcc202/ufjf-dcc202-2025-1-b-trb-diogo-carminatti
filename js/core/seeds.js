import { CarrotSeed, PotatoSeed, TomatoSeed } from "../entities/Seed.js";

const seeds = [
  new CarrotSeed(1, document.createElement("div")),
  new PotatoSeed(2, document.createElement("div")),
  new TomatoSeed(3, document.createElement("div")),
];

export function getSeeds() {
  return [...seeds];
}

export function findSeedById(id) {
  return seeds.find((seed) => seed.id === id);
}
