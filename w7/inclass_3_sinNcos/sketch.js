//sin and cos 
//amplitude = v.mag()
//x = cos(angle) * amplitude
//y = sin(angle) * ampllitude
//time matters!
"use strict";

var amplitude = 100; //distance
function setup() {
  createCanvas(500, 600);
  noStroke();
}

function draw() {
  background(255,50);
  translate(width / 2, height / 2);
  var sinFreq = frameCount * 0.05; //can be angle, can play with freq
  var cosFreq = frameCount * 0.15; //两个freq可以不一样的
  var sinVal = sin(sinFreq) * amplitude;
  var cosVal = cos(cosFreq) * amplitude;
  
  fill(0,255,0);
  ellipse(cosVal,0,10,10);
  text("cosVal", cosVal,0);
  fill(255,0,0);
  ellipse(0,sinVal,10,10);
  text("sinVal", 0, sinVal);
  
  fill(0);
  ellipse(cosVal,sinVal, 30,30);
}