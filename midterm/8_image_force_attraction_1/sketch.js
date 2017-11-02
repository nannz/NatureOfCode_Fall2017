"use strict";
var img;

var particles = [];
var resolution = 8;
var mousePos;
var DIST = 100;
var mouseCount = 0;
var isPressed = false;

var wind;

function preload() {
  img = loadImage("assets/cruz_small.jpg");
}

function setup() {
  //createCanvas(1200, 1530, WEBGL);
  createCanvas(600, 765, WEBGL);
  // /canvas.parent('sketch-holder');
  
  pixelDensity(1);
  //noStroke();
  createParticles();
  wind = createVector(random(-2, 2), random(-2, 2), random(-10, 10));
  background(255);
}

function draw() {
  background(255);

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
      noiseAmp = -40;
      var noiseVal = noise(freq1, freq2) * noiseAmp;
      var z = noiseVal;
      p.pos.z = z;
    }

    if (p.isAttracted) {
      // var wind = createVector(random(-2, 2), random(-2, 2), random(-2, 2));
      wind.mult(p.mass);
      p.applyForce(wind);
      p.applyAttraction(createVector(0, 0, 0));
      //drawSphere(0,0,0,5);
    }

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
      var pSize = map(bright, 0, 255, 0.1, 2.0);

      var zPos = map(bright, 0, 255, 1, 10);

      var index = newX / resolution + newY / resolution * width / resolution; //+ newY % resolution * floor(width/resolution) ;
      //print(index);
      var p = new Particle().setPos(x, y, zPos).setSize(pSize);
      particles.push(p);
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
  
  if(key == 's'){
    //save the canvas
    saveCanvas('try','jpg');
  }
}