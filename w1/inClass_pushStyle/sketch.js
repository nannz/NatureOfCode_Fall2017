var x,y,w,h;


function setup() {
  createCanvas(600,600);
  background(100);
  
  x = 100;
  y = 100;
  w = 200;
  h = 100;
  
  noStroke();
  fill(255);
  
  push(); // here in processing, is pushStyle(), in p5, push is for both position and style
  stroke(255,0,0);
  strokeWeight(10);
  fill(0);
  rect(x,y,w,h);
  pop();
  

  rect(x+200, y+200, w,h);
}

function draw() {
  
}