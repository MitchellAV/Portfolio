let canvas, ctx, grid, side, startNode, endNode;

let FRAMERATE = 1;
let perWalls = .3;
let ROWS = 50;
let COLS = 50;
let openColor = 'rgb(255,0,0)';
let closedColor = 'rgb(0,255,0)';
let pathColor = 'rgb(0,0,255)';
let wallColor = 'rgb(0,0,0)';
let startColor = 'rgb(0,0,255)';
let endColor = 'rgb(0,0,255)';

let closedSet = [];
let openSet = [];

let path = [];

let allWalls = new Array(ROWS);




document.oncontextmenu = function() {
    return false;
}

function combo() {
    init();
    addWalls();
    solve();
}

// Functions
function init() {

    let corner = getRadioVal(document.getElementById('cornerForm'), 'corner');
console.log(corner);

    canvas = document.getElementById('canvas');
    closedSet = [];
    openSet = [];
    path = [];
    grid = new Array(ROWS);
    
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        
        for(let i = 0; i < ROWS; i++) {
            grid[i] = new Array(COLS);
            for (let j = 0; j < COLS; j++) {
                grid[i][j] = new Cell(i, j);
            }
        }
        
        for(let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                grid[i][j].initNeighbors(grid, corner);
            }
        }
        startNode = grid[0][0];
        endNode = grid[COLS-1][COLS-1];
        startNode.start = true;
        endNode.end = true;
        startNode.wall = false;
        endNode.wall = false;
        resize();
        drawGrid();
        // Draw grid
    } 
    else {
        // canvas-unsupported code here
    }
}

function solve() {
    
    reset();
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {

            
            grid[i][j].g = Infinity;
            grid[i][j].h = Infinity;
            grid[i][j].f = Infinity;
        }
    }  
    let finished = astar();
    if(!finished) {
        drawGrid();
        // alert("No Path");
    }
    else {
        path.push(endNode);
        let currNode = endNode;
        while(currNode !== startNode) {
            path.push(currNode.parent);
            currNode = currNode.parent;
        }
        drawGrid();
    }
}

function addWalls(){
    init();
    for(let i = 0; i < grid.length; i++) {
        allWalls[i] = new Array(COLS);
        for (let j = 0; j < grid[i].length; j++) {
            let isWall = grid[i][j].addWalls(perWalls);
            allWalls[i][j] = isWall;
            if (isWall) {
                grid[i][j].removeNeighbor(grid, grid[i][j]);
            }
        }
    }
    reset();
    drawGrid();
}

function drawGrid() {  
    resize();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            
            if(grid[i][j].wall == true) {
                grid[i][j].draw(wallColor);
            }
            else{
                grid[i][j].draw();
            }
        }
    }

    for (var i = 0; i < closedSet.length; i++) {
        closedSet[i].draw(closedColor);
    }
    
    for (var i = 0; i < openSet.length; i++) {
        openSet[i].draw(openColor);
    }

    for (var i = 0; i < path.length; i++) {
        path[i].draw(pathColor);
    }
    startNode.draw(startColor);
    endNode.draw(endColor);

}

function resize() {
    let padding = 50;
    let size = Math.min(window.innerWidth -padding, window.innerHeight-padding);
    canvas.width = canvas.height = size;
    side = Math.min(size/COLS,size/ROWS);
}

function getRadioVal(form, name) {
    var val;
    // get list of radio buttons with specified name
    var radios = form.elements[name];

    // loop through list of radio buttons
    for (var i = 0, len = radios.length; i < len; i++) {
        if (radios[i].checked) { // radio checked?
            val = radios[i].value; // if so, hold its value in val
            break; // and break out of for loop
        }
    }
    return val; // return value of checked radio or undefined if none checked
}


