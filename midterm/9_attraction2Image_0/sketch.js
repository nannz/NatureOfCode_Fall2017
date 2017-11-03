//img2 load and createVectors don't wrk


"use strict";
var img1, img2;

var particles = [];
var nextImg = []; //pos & size

var resolution = 8;
var mousePos;
var DIST = 100;
var mouseCount = 0;
var isPressed = false;

var wind;

function preload() {
  img1 = loadImage("assets/cruz_small.jpg");
  img2 = loadImage("assets/edward.jpg");
}

function setup() {
  createCanvas(600, 765, WEBGL);

  pixelDensity(1);
  createParticles(); //for this one and the next one
  wind = createVector(random(-2, 2), random(-2, 2), random(9, 10));
  background(255);

  //print(nextImg[0].pos.x);
}

function draw() {

  //rotateX(-PI / 8);
  translate(0, 0, -100);
  var rotY = map(mouseX, 0, width, -PI / 2, PI / 2);
  rotateY(rotY);
  var rotX = map(mouseY, 0, height, -PI / 6, PI / 6);
  rotateX(rotX);

  for (var i = 0; i < particles.length; i++) {
    var p = particles[i];
    if (p.isExploded == false) {
      //if(p.vel.x <= 0.01 && p.vel.y <= 0.01 &&p.vel.z<= 0.01){
      var noiseSinVal, freq1, freq2, noiseAmp;
      freq1 = (frameCount + p.pos.x) * 0.02; //freq = (x+frameCount )* 0.01;//记得加上x，不然没有时间变化感
      freq2 = (frameCount + p.pos.y) * 0.02; //frameCount for animation effect
      noiseAmp = -100;
      var noiseVal = noise(freq1, freq2) * noiseAmp;
      var z = noiseVal;
      p.pos.z = z;
    }

    if (p.isAttracted) {
      wind.mult(p.mass);
      p.applyForce(wind);
      p.applyAttraction(createVector(0, 0, 0));
    }

    if (p.nextImg) {
      //p.vel.mult(0);
      p.size = nextImg[i].size;
      var force = p5.Vector.sub(nextImg[i].pos, p.pos);
      force.mult(0.2);
      p.applyForce(force);
    }
    //checkNextFinished -> isExploded = false;

    p.update();
    p.display();
  }


}

function drawSphere(x, y, z, s) { //s for size
  push();
  translate(x, y, z);
  fill(255, 0, 0);
  sphere(s);
  pop();
}

function createParticles() {
  img1.loadPixels();

  var bright1;
  var r1, g1, b1;
  for (var y = -height / 2; y < height / 2; y += resolution) {
    for (var x = -width / 2; x < width / 2; x += resolution) {
      var newX = x + width / 2;
      var newY = y + height / 2;
      var imgIndex1 = (newX + newY * width) * 4;

      r1 = img1.pixels[imgIndex1 + 0];
      g1 = img1.pixels[imgIndex1 + 1];
      b1 = img1.pixels[imgIndex1 + 2];
      bright1 = (r1 + g1 + b1) / 3;
      bright1 = 255 - bright1;
      var pSize1 = map(bright1, 0, 255, 0.1, 2.0);
      var zPos1 = map(bright1, 0, 255, 1, 10);
      var p = new Particle().setPos(x, y, zPos1).setSize(pSize1);
      particles.push(p);
    }
  }

  img2.loadPixels();
  var bright2;
  var r2, g2, b2;
  for (var y = -height / 2; y < height / 2; y += resolution) {
    for (var x = -width / 2; x < width / 2; x += resolution) {
      var newX = x + width / 2;
      var newY = y + height / 2;
      var imgIndex2 = (newX + newY * width) * 4;

      r2 = img2.pixels[imgIndex2 + 0];
      g2 = img2.pixels[imgIndex2 + 1];
      b2 = img2.pixels[imgIndex2 + 2];
      bright2 = (r2 + g2 + b2) / 3;
      bright2 = 255 - bright2;
      var pSize2 = map(bright2, 0, 255, 0.1, 2.0);
      var zPos2 = map(bright2, 0, 255, 1, 10);
      var imgObject = new NextImage().setPos(x, y, zPos2).setSize(pSize2);
      nextImg.push(imgObject);
    }
  }
}

function mouseReleased() {
  mouseCount++;
  isPressed = true;
  var amp = -60;
  mousePos = createVector(random(-width / 2, width / 2), random(-height / 2, height / 2), 0);
  //mousePos = createVector(mouseX - width / 2, mouseY - height / 2, 0); //z = 0 for now. 
  for (var i = 0; i < particles.length; i++) {
    var p = particles[i];
    if (p.checkDist(mousePos)) {
      var distance = p.getDist(mousePos);
      var angle = map(distance.mag(), 0, DIST, -PI / 2, PI / 2);
      var sinVal = sin(angle) * amp; //amp = -60
      var noiseVal = map(noise(sinVal), 0, 1, 0.8, 1.2);
      var velZ = noiseVal * (sinVal - amp);
      var noiseForce = createVector(0, 0, velZ);
      p.explode(noiseForce);
      p.applyForce(distance.mult(0.15));
    }
  }
}


function keyTyped() {
  //all the p are added a wind force
  //all the p are attracted by a point. 
  if (key == ' ') {
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.isExploded = false;
      p.isAttracted = true;
    }
  }

  if (key == 's') {
    //save the canvas
    saveCanvas('try', 'jpg');
  }

  if (key == 'a') {
    //stop the attraction to center
    //for each particle, attract to the next img particles' pos, 
    //for each particle, size go to the next img particles' size
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.isExploded = true;//false;
      p.isAttracted = false;
      p.nextImg = true;
    }
  }
}