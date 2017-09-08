function setup() {
  createCanvas(500,600);
  frameRate(5);//set the frameRate
}

function draw() {
  background(0);
  
  textAlign(CENTER);
  fill(255);
  text("frameCount: "+frameCount, width/2, height/2);
  text("frameRate(): "+frameRate(), width/2, height/2 + 20);
  print(frameCount);
}