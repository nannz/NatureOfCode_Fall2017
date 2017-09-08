var countPressed;

function setup() {
  createCanvas(500, 600);
  background(0);
  countPressed = false;
}

function draw() {
  if (mouseIsPressed) {
    background(random(255), random(255), random(255));
    countPressed = true;
    fill(255);
    text(countPressed, width / 2, height / 2);
  }else{
    countPressed = false;
    fill(255);
    text(countPressed, width / 2, height / 2);
  }
}

function mousePressed() {

  background(random(255), random(255), random(255));
}