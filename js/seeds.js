const seeds = [
  {
    id: 1,
    name: "Carrot",
    price: 8,
    class: "carrot",
  },
  {
    id: 2,
    name: "Tomato",
    price: 12,
    class: "tomato",
  },
  {
    id: 3,
    name: "Potato",
    price: 10,
    class: "potato",
  },
];

export function getSeeds() {
  return [...seeds];
}
