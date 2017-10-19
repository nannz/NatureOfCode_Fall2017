//1017 Tuesday - Oscillation
//repetitive 
//sin, cos
//cartesian coordinate system
//vs polar coordinate system


function setup() {
  createCanvas(500,600);
  noStroke();
}

function draw() {
  background(0);
  translate(width/2, height/2);
  
  drawCircle(frameCount * 0.02, 200);
}

function drawCircle(angle, distance){
  //give angle and distance
  var vector = p5.Vector.fromAngle(angle);
  vector.mult(distance);
  // var x = cos(angle) * distance;
  // var y = sin(angle) * distance;
  ellipse(vector.x,vector.y,50,50);
}