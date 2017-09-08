var x;
var y;

function setup() {
  createCanvas(500, 600);
  x = width / 2;
  y = height / 2;
}

function draw() {
  background(100, 10); // G, Alpha

  if (mouseX <= 0 || mouseY >= width) {
    x = width / 2;
    y = height / 2;
  } else {
    x = mouseX;
    y = mouseY;
  }

  noStroke();
  fill(255, 255, 0);

  ellipse(x, y, 20, 20);
  text(frameRate(), width / 2, height / 2);

  console.log(mouseX);

}