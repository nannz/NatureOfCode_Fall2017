//we cannot use stroke, line in webgl


function setup() {
  createCanvas(500,600, WEBGL);
}

function draw() {
  background(0);
  stroke(255,0,0);
  strokeWeight(5);
  
  // rotateY(frameCount * 0.01);
  // rotateZ(frameCount * 0.01);
  
  /*see the function drawBox()
  push();
  translate(100,0,0);
  box(100); //cannot set position, but can translate
  pop();
  */
  pointLight(255,0,0,mouseX-width/2, mouseY-height/2, 100);//color + direction
  ambientLight(0,0,100);//the global light, can be really small
  drawBox(100,0,0,100);
  
  //alternative way to draw line
  beginShape();
  vertex(0,0);
  vertex(100,100);
  endShape();
  //way 2: plane()
}

function drawBox(x,y,z,s){
  push();
  translate(100,0,0);
  sphere(s);
  //box(100); //cannot set position, but can translate
  // line(0,0,100,100);
  pop();
}