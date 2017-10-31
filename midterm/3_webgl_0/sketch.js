"use strict";
var particles = [];
var resolution = 10;
function setup() {
  createCanvas(600, 600, WEBGL);
  noStroke();
  
  createParticles();
}

function draw() {
  //in webgl, y-axis for us is actually z-axis
  background(255);
  
  rotateX(-PI/6);
  translate(0,-50,100);
  //rotateY(frameCount * 0.01);
  
  for (var y = -height/2; y < height/2; y += resolution) {
    for (var x = -width/2; x < width/2; x += resolution) {
      
      var sinVal, freq1,freq2,amp;
      //play with change of freq的倍数and amp
      freq1 = (frameCount+x) * 0.02; //freq = (x+frameCount )* 0.01;//记得加上x，不然没有时间变化感
      freq2 = (frameCount+y) * 0.02;//frameCount for animation effect
      amp = -40;
      var noiseVal = noise(freq1,freq2) * amp;
      //var y = 200 + noiseVal;
      var z = noiseVal;
      var clr = map(noiseVal, -1, 1, 0, 255);
      drawSphere(x,y,z,2);
    }
  }
}

function drawSphere(x,y,z,s){//s for size
  push();
  translate(x,y,z);
  fill(0);
  sphere(s);
  pop();
}

function createParticles(){
  for (var y = -height/2; y < height/2; y += resolution) {
    for (var x = -width/2; x < width/2; x += resolution) {
      var p = new Particle().setPos(x,y,-40);
      particles.push(p);
    }
  }
}