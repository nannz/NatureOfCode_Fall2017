var c1;
function setup() {
  createCanvas(500, 600);
  rectMode(CENTER);
  noStroke();
  
  c1 = color(random(0,255));
  c2 = color(random(0,255));
}

function draw() {
  background(100);
  flower(mouseX,mouseY, c1);
  flower(40,30,c2);
}

function flower(x,y,c){
  push();//before translate
  translate(x,y);
  fill(255, 0, 0);
  ellipse(0, 0, 5, 5);
  for (var angle = 0; angle < 360; angle += 72) {
    push();
    rotate(radians(angle));
    print
    rotate(frameCount * 0.02);
    fill(c);
    rect(150, 0, 200, 10);
    pop();
  }
  pop();
  
}