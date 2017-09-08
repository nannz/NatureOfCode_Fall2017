function setup() {
  createCanvas(500, 600);
  rectMode(CENTER);
}

function draw() {
  background(100);
  
  push();
  translate(width/2,height/2);
  rotate(radians(frameCount)); //make use of radians() to make it smmooth; if contained by push/pop, not work for objects outside push/pop
  var millisecond = millis();
  //rotate(radians(millisecond)); //太快了
  //rect(width/2, height/2, 30, 30); 
  //does not work in push/pop and translate case, 
  //just copy the x,y position to the translate() --> translate ( xRect, yRect); and rect(0,0, width, height)
  fill(0);//black
  rect(0,0,30,30);
  fill(255,0,0);//red
  rect(100,100,50,50);
  pop();
  
  fill(0,255,0);//green
  rect(150,150, 40,40);
  
}