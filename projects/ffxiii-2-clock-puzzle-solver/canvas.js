function line(ctx, x0, y0, x1, y1) {
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
}

class ClockCircle {
  constructor(ctx, i, value,x, y, r, spaceColor,ringColor,numColor) {
    this.ctx = ctx;
    this.index = i;
    this.value = value;
    this.x = x;
    this.y = y;
    this.r = r;
    this.spaceColor = spaceColor;
    this.ringColor = ringColor;
    this.numColor = numColor;
  }

  onClick(mouse){
    if (this.x + this.r > mouse.x &&
        this.x - this.r < mouse.x &&
        this.y + this.r > mouse.y &&
        this.y - this.r < mouse.y) {
          return true;
    }
  }

  draw(){
    circle(this.ctx, this.x, this.y, this.r, this.spaceColor,this.ringColor,this.numColor);
    text(this.ctx, this.x, this.y, this.value, this.r, this.numColor);
  }
}

function circle(ctx, x, y, r, color,ringColor) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = ringColor;
  ctx.stroke();
}


function text(ctx, x, y, text, size, color) {
  ctx.font = size + "px Georgia";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}
