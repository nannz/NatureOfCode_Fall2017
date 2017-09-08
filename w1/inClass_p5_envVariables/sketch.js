var xC;
var yC; //var xC = width/2 would not work
// p5 only works in function setup() and draw(); it's javascript


function setup() {
  createCanvas(500,600);
  background(100);
  
  xC = width/2;
  yC = height/2;

  noStroke();
  ellipse(xC,yC,200,200);
}

function draw() {
  
}