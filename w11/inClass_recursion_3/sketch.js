var c = 0;

function setup() {
  createCanvas(500, 600);
  background(0);
  noFill();
  stroke(255);
  drawCircle(width / 2, height / 2, 400);

  print(c);
}

function draw() {
  noLoop();

}

function drawCircle(x, y, dia) {
  ellipse(x, y, dia, dia);

  dia = dia * 1 / 2; // play with the number
  //recursive function
  if (dia > 40) { // give it an end! or it never ends and crushes.
    drawCircle(x - dia / 2, y, dia);
    drawCircle(x + dia / 2, y, dia);
    drawCircle(x, y - dia / 2, dia);
    drawCircle(x, y + dia / 2, dia);
  }

  c += 1;
}