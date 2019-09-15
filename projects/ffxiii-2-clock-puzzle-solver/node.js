class Node {
  constructor() {
    this.index = null;
    this.value = null;
    this.neighbors = [];
    this.root = null;
    this.visited = false;
  }

  setIndex(value) {
    this.index = value;
  }

  addNeighbor(neighbor) {
    this.neighbors.push(neighbor);
  }

  removeNeighbor(neighbor){
    this.neighbors.spilce(neighbor,1);
  }

  visited() {
    this.visited = true;
  }

  setRoot() {
    this.root = true;
  }


}
