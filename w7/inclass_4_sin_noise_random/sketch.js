function setup() {
  createCanvas(500,600);
  noStroke();
}

function draw() {
  background(255,10);
  
  //sin and cos
  var amp = 50;
  var freq = frameCount * 0.05;
  var sinVal = sin(freq) * amp;
  fill(0);
  ellipse(frameCount % width, height*0.2 + sinVal, 5,5);
  
  //random
  var amp = 50;
  var freq = frameCount * 0.015;
  var randomVal = random(-1,1) * amp;
  fill(0);
  ellipse(frameCount % width, height*0.5 + randomVal, 5,5);
  
  //noise
  var amp = 50;
  var freq = frameCount * 0.015;
  var noiseVal = map(noise(freq), 0,1,-1,1) * amp; //noise range is from 0 - 1
  fill(0);
  ellipse(frameCount % width, height*0.8 + noiseVal, 5,5);
}