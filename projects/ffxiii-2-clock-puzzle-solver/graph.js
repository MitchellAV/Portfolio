class Graph {
  constructor(puzzle) {
    this.puzzle = puzzle;
    this.solutions = [];
    this.numNodes = puzzle.length;
    this.adjList = new Map();
  }

  addNode(v) {
    this.adjList.set(v, []);
  }

  removeNode(v) {
    for (var i = 0; i < this.adjList.size; i++) {
      this.removeEdge(v, i);
    }
    this.adjList.delete(v);
  }

  addEdge(v, w) {
    if (this.adjList.get(v).length == 0 || this.adjList.get(v).indexOf(w) == -1) {
      this.adjList.get(v).push(w);
    }
  }

  removeEdge(v, w) {
    let vArr = this.adjList.get(v);
    let wArr = this.adjList.get(w);
    let indexw = vArr.indexOf(w);
    let indexv = wArr.indexOf(v);
    if (indexw > -1) {
      vArr.splice(indexw, 1);
      wArr.splice(indexv, 1);
    }
  }

  initialize() {
    for (let i = 0; i < this.numNodes; i++) {
      this.addNode(i);
    }
    for (let i = 0; i < this.numNodes; i++) {
      let r = (i + this.puzzle[i]) % this.numNodes;
      let l = (i - this.puzzle[i]) % this.numNodes;
      if (l < 0) {
        l += this.numNodes;
      }
      this.addEdge(i, r);
      if (r != l) {
        this.addEdge(i, l);
      }
    }
  }

  printGraph() {
    let keys = this.adjList.keys();
    for (let i of keys) {
      let values = this.adjList.get(i);
      let conc = "";
      for (let j of values) {
        conc += j + " ";
      }
      console.log(i + " -> " + conc);
    }
  }

  bfs(start) {
    let queue = [start];
    let visited = [start];
    while (queue.length != 0) {
      let v = queue.shift();
      let current = this.adjList.get(v);
      for (let w of current) {
        if (visited.indexOf(w) === -1) {
          queue.push(w);
          visited.push(w);
        }
      }
    }
    if (visited.length === this.adjList.size)
      return visited;
    else
      return null;
  }

  dfs(start) {
    let visited = [];
    var stack = [];
    var s = [];
    for (var i = 0; i < this.numNodes; i++) {
      visited[i] = false;
    }
    s = this.dfsHelper(start, visited, stack, s);
    return s;
  }

  dfsHelper(v, visited, stack, s) {
    visited[v] = true;
    stack.push(v);
    if (stack.length == this.numNodes) {
      //this.solutions.push(stack.slice());
      s.push(stack.slice());
    }
    let neighbors = this.adjList.get(v);
    for (var w of neighbors) {
      if (!visited[w]) {
        s = this.dfsHelper(w, visited, stack, s);
      }
    }
    if (stack.length != this.numNodes) {}
    stack.pop();
    visited[v] = false;
    return s;
  }

  solve() {
    for (var i = 0; i < this.numNodes; i++) {
      let s = this.dfs(i);
      if (s.length != 0) {
        for (var j of s) {
          this.solutions.push(j);
        }
      }
    }
  }
}
