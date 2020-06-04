let prevMouse = {
    x: null,
    y: null
};
let down = false;

// Event Listeners
addEventListener('resize', function() {
    drawGrid();      
});

addEventListener('click', function(evt){
    mouse = getMousePos(canvas, evt);
    if (mouse.x != null && mouse.y != null) {
        if (evt.ctrlKey) {
            endNode.end = false;
            endNode = grid[mouse.x][mouse.y];
            endNode.end = true;
        }
        else {
            startNode.start = false;
            startNode = grid[mouse.x][mouse.y];
            startNode.start = true;
        }
        reset();
    }
    
});


function reset() {
    closedSet = [];
    openSet = [];
    path = [];

          
    
    drawGrid();
}

addEventListener('mousemove', function(evt){
  
    
    try {
        mouse = getMousePos(canvas, evt);    
        
        if (mouse.x != null && mouse.y != null) {
            
                if (down) {
                    
                    if (evt.ctrlKey && evt.buttons == 2) {
                        if (grid[mouse.x][mouse.y].wall === true) {
                            grid[mouse.x][mouse.y].wall = false;
                            grid[mouse.x][mouse.y].addNeighbor(grid, grid[mouse.x][mouse.y]);
                        }
                        
                        reset();
                        
                    }
                    else if(evt.buttons == 2) {
                        if (grid[mouse.x][mouse.y].wall === false) {
                            grid[mouse.x][mouse.y].wall = true;
                            grid[mouse.x][mouse.y].removeNeighbor(grid, grid[mouse.x][mouse.y]);
                        }
                        
                       
                        reset();
                    }
                    
                }
                if ((evt.altKey && grid[mouse.x][mouse.y].wall == false) && (mouse.x != prevMouse.x || mouse.y != prevMouse.y)) {
                    endNode.end = false;
                    endNode = grid[mouse.x][mouse.y];
                    endNode.end = true;
                    solve();
                }
        }
        
    } catch (error) {
        
    }
    prevMouse = mouse;
});


addEventListener('mousedown', function(evt){ 
    down = true;
    mouse = getMousePos(canvas, evt);
    if (mouse.x != null && mouse.y != null) {
        if (evt.buttons == 2 && (!grid[mouse.x][mouse.y].start || !grid[mouse.x][mouse.y].end)) {
            if (evt.ctrlKey) {
                if (grid[mouse.x][mouse.y].wall === true) {
                    grid[mouse.x][mouse.y].wall = false;
                    grid[mouse.x][mouse.y].addNeighbor(grid, grid[mouse.x][mouse.y]);
                }
                
                
            }
            else {
                if (grid[mouse.x][mouse.y].wall === false) {
                    grid[mouse.x][mouse.y].wall = true;
                    grid[mouse.x][mouse.y].removeNeighbor(grid, grid[mouse.x][mouse.y]);
                }
            }
        }
        // else {
        //     if (grid[mouse.x][mouse.y].wall === true) {
        //         grid[mouse.x][mouse.y].wall = false;
        //         grid[mouse.x][mouse.y].addNeighbor(grid, grid[mouse.x][mouse.y]);
        //     }
        // }
        reset();
                
    }

    
});

addEventListener('mouseup', function(evt){
    down = false;
    
    
    
});


function bound(low, high, value) {
    if (value < 0 || value > high - 1) {
        return null;
    }
    else{
        return Math.max(low, Math.min(high - 1, value));
    }
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();   
    return {
      x: bound(0, COLS, Math.floor((evt.clientX - rect.left)/side)),
      y: bound(0, ROWS, Math.floor((evt.clientY - rect.top)/side))
    };
}
