"use strict";
var img;

var particles = [];
var resolution = 10;
var mousePos;
var DIST = 100;
var mouseCount = 0;
var isPressed = false;

function preload() {
  img = loadImage("assets/cruz_small.jpg");
}

function setup() {
  createCanvas(600, 765, WEBGL);
  pixelDensity(1);
  noStroke();
  createParticles();
}

function draw() {
  background(255);
  var mouseIndex = floor(mouseX / resolution) + floor(mouseY / resolution) * width / resolution;
  mousePos = createVector(mouseX - width / 2, mouseY - height / 2, 0); //z = 0 for now. 


  rotateX(-PI / 6);
  translate(0, -40, 100);
  //var amp = -60;

  for (var i = 0; i < particles.length; i++) {
    var p = particles[i];
    p.update();
    p.display();
  }


}

function drawSphere(x, y, z, s) { //s for size
  push();
  translate(x, y, z);
  fill(0);
  sphere(s);
  pop();
}

function createParticles() {
  img.loadPixels();
  for (var y = -height / 2; y < height / 2; y += resolution) {
    for (var x = -width / 2; x < width / 2; x += resolution) {
      var newX = x + width / 2;
      var newY = y + height / 2;

      var imgIndex = (newX + newY * width) * 4;
      var r = img.pixels[imgIndex + 0];
      var g = img.pixels[imgIndex + 1];
      var b = img.pixels[imgIndex + 2];
      var colour = color(r, g, b);
      var bright = (r + g + b) / 3;
      bright = 255 - bright;
      var pSize = map(bright, 0, 255, 0.2, 2.0);



      var index = newX / resolution + newY / resolution * width / resolution; //+ newY % resolution * floor(width/resolution) ;
      //print(index);
      var p = new Particle().setPos(x, y, 0).setSize(pSize);
      particles.push(p);
    }
  }
}

function mouseReleased() {
  mouseCount++;
  
  var amp = -60;
  mousePos = createVector(mouseX - width / 2, mouseY - height / 2, 0); //z = 0 for now. 
  for (var i = 0; i < particles.length; i++) {
    var p = particles[i];
    if (p.checkDist(mousePos)) {
      var distance = p.getDist(mousePos);
      var angle = map(distance, 0, DIST, -PI / 2, PI / 2);
      var sinVal = sin(angle) * amp; //amp = -60
      var noiseVal = map(noise(sinVal), 0, 1, 0.8, 1.2);
      var velZ = noiseVal * (sinVal - amp);
      var noiseForce = createVector(0, 0, velZ);
      p.explode(noiseForce);
    }
  }
}