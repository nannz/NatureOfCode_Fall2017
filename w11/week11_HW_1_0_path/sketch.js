var angle = 0.0;
var STEP= 0.1;
function setup() {
  createCanvas(600,600);
  background(0);
  noStroke();
  fill(255);
}

function draw() {
  for (var theta = 0.0; thera <= TWO_PI; theta += STEP){
    
    
  }
  
  
  
  push();
  translate(width/2, height/2);
  var freq, amp;
  freq = frameCount * 0.01;
  amp = 200;
  var sinVal = sin(freq) * amp;
  var cosVal = cos(freq) * amp;
  
  ellipse(sinVal, cosVal, 1,1);
  pop();
}