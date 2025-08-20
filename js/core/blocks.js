let blocks = [];

export function addBlock(block) {
  block.id = blocks.length + 1;
  block.element.dataset.id = block.id;
  blocks.push(block);
  return block;
}

export function getBlocks() {
  return [...blocks];
}

export function removeBlock(block) {
  blocks = blocks.filter((b) => b !== block);
  block.element.removeEventListener("click", block.handleClick);
  block.element = null;
}

export function findBlockById(id) {
  return blocks.find((block) => block.id === id);
}

export function findBlockByPosition(position) {
  return blocks.find((block) => block.position === position);
}
