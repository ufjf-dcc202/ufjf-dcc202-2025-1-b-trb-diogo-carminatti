let blocks = [];

export function addBlock(block) {
  if (blocks.some((b) => b.position === block.position)) return;
  block.id = blocks.length + 1;
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
