function setup() {
  createCanvas(500,600);
}

function draw() {
  background(0);
  translate(width/2, height/2);
  
  var center = createVector(width/2, height/2);
  var mouse = createVector(mouseX, mouseY);
  var vector = p5.Vector.sub(mouse,center);
  
  //the two methods to calculate angle towards the mouse are the same.
  var angle = atan2(vector.y,vector.x);
  var angle = vector.heading();
  
  push()
  rotate(angle);
  
  //triangle
  fill(255,0,0);
  noStroke();
  triangle(0,0,-50,20,-50,-20);
  pop();
  
  
  stroke(255);
  line(0,0,vector.x,vector.y);
  
}