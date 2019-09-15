let clockPos = [];
let g;
let allCircles = [];
let validIndex = [];
$(document).ready(function() {
  $("#next").hide();
  $("#previous").hide();

  let puzzle = [];
  let colors = ["#a0ccf1", "#fd666e", "#f9e595", "#9dff73", "#a9f9fc", "#927cfa", "#e080e2", "#de4747"];
  let n = 0;
  let index = 0;
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext("2d");
  let side;
  let canvasPos = {
    x: $("#canvas").offset().left,
    y: $("#canvas").offset().top
  };
  resizeCanvas();
  ctx.translate(side / 2, side / 2);

  drawClock(g, n);

  addEventListener('resize', function() {
    resizeCanvas();
    ctx.translate(side / 2, side / 2);
    drawClock(g, n);
  });

  $("#canvas").on('click', function(e) {
    let mouse = {
      x: e.pageX - canvasPos.x - $("#canvas").width()/2,
      y: e.pageY - canvasPos.y - $("#canvas").height()/2
    };
    if (allCircles.length != 0) {
      if (allCircles.length == n) {
        for (var i = 0; i < n; i++) {
          validIndex.push(i);
        }
      }
      let currentCircle;
      let index;
      for (var i = 0; i < allCircles.length;i++) {
        if (allCircles[i].onClick(mouse)) {
          currentCircle = allCircles[i];
          break;
        }
      }
      index = currentCircle.index;
      value = currentCircle.value;
      let r = (index + value) % n;
      let l = (index - value) % n;
      if (l < 0) {
        l += n;
      }
      let failed = false;
      for (var c of allCircles) {
        let bool = validIndex.includes(index);
        console.log(validIndex,c.index);
        if (bool) {
          validIndex=[l,r];
          console.log(currentCircle.index);
          for (var i=0;i<allCircles.length;i++) {
            if (allCircles[i].index == currentCircle.index) {
              allCircles.splice(currentCircle.index,1);
              break;
            }
          }
           // remove circle with index not at index
          console.log(validIndex,allCircles);
          drawGameClock(n);
          failed = false;
          break;
        }else {
          failed = true;
        }
      }
      if (failed) {
        alert("failed");
      }
    }else {
      console.log("game won");
    }
  });

  function drawGameClock(n) {
    clearCanvas();
    ctx.strokeStyle = "black";
    circle(ctx, 0, 0, side / 2, "white");
    let start = -Math.PI / 2;
    if (allCircles.length > 0) {
      let cirConst = 2 * Math.PI / n;
      for (var i of allCircles) {
        i.draw();
      }
    }else {
      console.log("game finished");
    }
  }


  $("button").click(function() {
    g = undefined;
    puzzle.push(parseInt(($(this).attr("name"))));
    n = puzzle.length;
    $("#puzzle").text(puzzle);
    $("#solNum").empty();
    $("#next").hide();
    $("#previous").hide();
    index = 0;
    drawClock(g, n);
  });

  $("#create").click(function() {
    reset();
    let pSize = 5 + Math.ceil(Math.random() * 8);
    genPuzzle(pSize);
  });

  function genPuzzle(size) {
    allCircles = [];
    g = undefined;
    n = size;
    let maxNum = Math.floor(n / 2);
    puzzle = [];
    while (puzzle.length < n) {
      let r = Math.ceil(Math.random() * maxNum);
      puzzle.push(r);
    }
    drawClock(g, n);
    g = new Graph(puzzle);
    g.initialize();
    g.solve();
    if (g.solutions.length == 0) {
      genPuzzle(size);
    }
  }

  $("#solve").click(function() {
    $("#solution").empty();
    if (checkPuzzle()) {
      g = new Graph(puzzle);
      g.initialize();
      g.solve();


      if (g.solutions.length != 0) {
        drawClock(g, n);
        if (g.solutions.length > 0) {
          $("#previous").show();
          $("#next").show();
          $("#solNum").text((index + 1) + "/" + g.solutions.length);
        }
      } else {
        $("#solution").append("No Solutions Exist");
      }
    } else {

    }
  });

  function checkPuzzle() {
    let maxNum = Math.floor(n / 2);
    if (n > 13) {
      $("#solution").append("More than 13 puzzle too difficult");
      return false
    }
    for (let i of puzzle) {
      if (i > maxNum) {
        $("#solution").append("Not a valid puzzle");
        return false;
      }
    }
    return true;
  }

  $("#next").click(function() {
    $("#solNum").empty();
    if (index < g.solutions.length - 1) {
      index += 1;
      $("#previous").show();
    }
    if (index == g.solutions.length - 1) {
      //$("#next").hide();
    }
    drawClock(g, n);
    $("#solNum").text((index + 1) + "/" + g.solutions.length);
  });
  $("#previous").click(function() {
    $("#solNum").empty();
    if (index > 0) {
      index -= 1;
      $("#next").show();
    }
    if (index == 0) {
      //$("#previous").hide();
    }
    drawClock(g, n);
    $("#solNum").append((index + 1) + "/" + g.solutions.length);
  });

  $("#clear").click(function() {
    reset();
  });

  $("#undo").click(function() {
    g = undefined;
    puzzle.pop();
    n = puzzle.length;
    $("#puzzle").text(puzzle);
    drawClock(g, n);
  });

  function reset() {
    $("#solution").empty();
    $("#puzzle").empty();
    $("#next").hide();
    $("#previous").hide();
    $("#solNum").empty();
    g = undefined;
    puzzle = [];
    n = 0;
    index = 0;
    drawClock(g, n);
  }

  function clearCanvas() {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }

  function drawClock(g, n) {
    clearCanvas();
    clockPos = [];
    validIndex = [];
    ctx.strokeStyle = "black";
    circle(ctx, 0, 0, side / 2, "white");
    //circle(ctx, 0, 0, side / 3.4, "white");
    let start = -Math.PI / 2;
    if (n != 0) {
      let s;
      let startx;
      let starty;

      let cirConst = 2 * Math.PI / n;
      for (var i = 0; i < n; i++) {
        let x = parseInt(side * .4 * Math.cos(start + cirConst * i));
        let y = parseInt(side * .4 * Math.sin(start + cirConst * i));
        clockPos.push([x, y]);
      }
      if (g != undefined) {
        drawSolution(g, index);
        s = g.solutions;
        startx = clockPos[s[index][0]][0] + side * .05;
        starty = clockPos[s[index][0]][1] + side * .05;

      }
      for (var i = 0; i < n; i++) {
        let c = new ClockCircle(ctx, i , puzzle[i],clockPos[i][0], clockPos[i][1], circleSize(), "white", "black",colors[puzzle[i]]);
        allCircles.push(c);
        c.draw();
        text(ctx, clockPos[i][0], clockPos[i][1], puzzle[i], circleSize(), colors[puzzle[i]]);
      }
      circle(ctx, startx, starty, side * .03, "lightgreen", "black");
      //text(ctx, startx, starty, "start", 20, "lightgreen");


    }
  }

  function drawSolution(g, index) {
    s = g.solutions;
    for (var i = 0; i < s[index].length - 1; i++) {
      let x0 = clockPos[s[index][i]][0];
      let x1 = clockPos[s[index][i + 1]][0];
      let y0 = clockPos[s[index][i]][1];
      let y1 = clockPos[s[index][i + 1]][1];
      line(ctx, x0, y0, x1, y1);
    }
  }

  function circleSize() {
    let max = side / 12;
    let size = side / n;
    if (size > max) {
      size = max;
    }
    return size;
  }

  function resizeCanvas() {
    if (window.innerWidth <= window.innerHeight) {
      side = window.innerWidth;
    } else {
      side = window.innerHeight;
    }
    canvas.width = side;
    canvas.height = side;
    canvasPos = {
      x: canvas.offsetLeft,
      y: canvas.offsetTop
    };
  }

});
