class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.g = Infinity;
        this.h = Infinity;
        this.f = Infinity;

        this.start = false;
        this.end = false;
        this.neighbors = [];
        this.parent = undefined;

        this.wall = false;
    }


    initNeighbors(grid, method) {
        // console.log(this.x, this.y);
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                try {
                    let outOfBounds = (grid[this.x + i][this.y + j] == undefined);
                    let isSelf = (i == 0 && j == 0);
                    let isNeighborWall = (grid[this.x + i][this.y + j].wall == true);
                    let isSelfWall = (grid[this.x][this.y].wall == true);
                    let noDia;
                    if (method == 'corners') {
                        noDia = true;
                    } else if(method == 'nocorners'){
                        noDia = (i == 0 || j == 0);
                    }

                    // console.log(this.x+i, this.y+j, outOfBounds, isSelf, isNeighborWall, isSelfWall);
                    
                    if ( !outOfBounds && !isSelf && !isNeighborWall && !isSelfWall && noDia) { 
                        this.neighbors.push(grid[this.x + i][this.y + j]);
                        
                        
                    }
                } 
                catch(error) {
        
                }
            }
        }
        // console.log(grid[ROWS-2][COLS-1].neighbors);
        // console.log(grid[ROWS-2][COLS-2].neighbors);
        // console.log(grid[ROWS-1][COLS-2].neighbors);
        // console.log(grid[ROWS-1][COLS-1].neighbors);
    }

    addNeighbor(grid, node) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                try {
                    let outOfBounds = (grid[this.x + i][this.y + j] == undefined);
                    let isSelf = (i == 0 && j == 0);
                    let isNeighborWall = (grid[this.x + i][this.y + j].wall == true);
                    let isSelfWall = (grid[this.x][this.y].wall == true);
                    if ( !outOfBounds && !isSelf && !isNeighborWall && !isSelfWall) { 
                        grid[node.x + i][node.y + j].neighbors.push(node);
                        this.neighbors.push(grid[node.x + i][node.y + j]);
                    }
                } 
                catch(error) {
        
                }
            }         
        }
        
    }

    removeNeighbor(grid, node) {
        node.neighbors = [];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                try {
                    let outOfBounds = (grid[this.x + i][this.y + j] == undefined);
                    let isSelf = (i == 0 && j == 0);
                    let isNeighborWall = (grid[this.x + i][this.y + j].wall == true);
                    let isSelfWall = (grid[this.x][this.y].wall == true);
                    if ( !outOfBounds && !isSelf && !isNeighborWall ) {
                        removeNode(grid[node.x + i][node.y + j].neighbors, node);
                    }
                } 
                catch(error) {
        
                }
            }         
        }
    }

    addWalls(percent) {
        if (!(this.start || this.end)) {
            let value = Math.random();
            let percentOfWalls = percent;
            let state = true;
            if (value >= percentOfWalls) {
                state = false;
            } 
            this.wall = state;
        }
       
        
        return this.wall;
    }

    draw(color) {
        if(color) { 
            ctx.fillStyle = color;
            ctx.fillRect(this.x * side, this.y * side, side, side);

           
        }
        else {
            ctx.beginPath();
            ctx.rect(this.x * side, this.y * side, side, side);
            ctx.stroke();

           
        }
        if (COLS < 11) {
            let g = 'G: ' + String(this.g);
            let h = 'H: ' + String(this.h);
            let f = 'F: ' + String(this.f);
            
            
            if(this.wall) {
                ctx.fillStyle = 'rgb(255,255,255)';
            }
            else {
                ctx.fillStyle ='rgb(0,0,0)';
            }
            
            ctx.font = "10px Arial";
            ctx.fillText(g, this.x * side + side*.05, this.y * side + side*.1);    
            ctx.fillText(h, this.x * side + side*.5, this.y * side + side*.1);  
            ctx.fillText(f, this.x * side + side*.25, this.y * side + side*.5);  
            ctx.fillText('Neighbors: '+ String(this.neighbors.length), this.x * side + side*.25, this.y * side + side*.7);  
            ctx.fillText('Wall: '+ String(this.wall), this.x * side + side*.25, this.y * side + side*.8);  
        }

    }
}