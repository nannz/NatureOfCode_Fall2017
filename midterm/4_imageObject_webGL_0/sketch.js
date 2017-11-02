"use strict";
var img;
var particles = [];
var resolution = 10;
function preload(){
  img = loadImage("assets/cruz_small.jpg");
}
function setup() {
  createCanvas(600, 765, WEBGL);
  //img = loadImage("assets/cruz_small.jpg");
  print(img.width + ", " + img.height);
  pixelDensity(1);
  noStroke();
  createParticles();
}

function draw() {

  background(255);
  
  rotateX(-PI/8);
  translate(0,-50,100);
  //rotateY(frameCount * 0.01);
  
  for (var y = -height/2; y < height/2; y += resolution) {
    for (var x = -width/2; x < width/2; x += resolution) {
      
      var newX = x + width/2;
      var newY = y + height/2;
      var index = newX / resolution + newY/resolution * width/resolution;
       
      var sinVal, freq1,freq2,amp;
      //play with change of freq的倍数and amp
      freq1 = (frameCount+x) * 0.02; //freq = (x+frameCount )* 0.01;//记得加上x，不然没有时间变化感
      freq2 = (frameCount+y) * 0.02;//frameCount for animation effect
      amp = -40;
      var noiseVal = noise(freq1,freq2) * amp;
      //var y = 200 + noiseVal;
      var z = noiseVal;
      //var clr = map(noiseVal, -1, 1, 0, 255);
      particles[index].setPos(x,y,z);
      particles[index].display();
    }
  }
}

function createParticles(){
  img.loadPixels();
  for (var y = -height/2; y < height/2; y += resolution) {
    for (var x = -width/2; x < width/2; x += resolution) {
      var newX = x + width/2;
      var newY = y + height/2;
      
      var imgIndex = (newX + newY * width) * 4;
      var r = img.pixels[imgIndex + 0];
      var g = img.pixels[imgIndex + 1];
      var b = img.pixels[imgIndex + 2];
      var colour = color(r, g, b);
      var bright = (r + g + b) / 3;
      bright = 255-bright;
      var pSize = map(bright, 0, 255,0.2,2.0);
      
      
      // var newX = x + width/2;
      // var newY = y + height/2;
      var index = newX / resolution + newY/resolution * width/resolution;//+ newY % resolution * floor(width/resolution) ;
      var p = new Particle().setPos(x,y,-40).setSize(pSize);
      particles.push(p);
    }
  }
}