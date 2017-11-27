function setup() {
  createCanvas(500, 600);
  background(0);
  noFill();
  stroke(255);
  drawCircle(width / 2, height / 2, 400);
}

function draw() {
  noLoop();
}

function drawCircle(x, y, dia) {
  ellipse(x, y, dia, dia);

  dia = dia * 2 / 3;
  //recursive function
  if (dia > 10) { // give it an end! or it never ends and crushes.
    drawCircle(x, y - 30, dia);
  }
}