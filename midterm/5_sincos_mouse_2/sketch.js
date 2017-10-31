"use strict";
var particles = [];
var resolution = 10;

function setup() {
  createCanvas(600, 600, WEBGL);
  noStroke();
  createParticles();
}

function draw() {
  background(255);

  rotateX(-PI / 6);
  translate(0, -40, 100);

  for (var y = -height / 2; y < height / 2; y += resolution) {
    for (var x = -width / 2; x < width / 2; x += resolution) {
      var newX = x + width/2;
      var newY = y + height/2;
      var index = newX / resolution + newY/resolution * width/resolution;

      particles[index].setPos(x,y,0);
      particles[index].display();


      if (y == 0) {
        //from x -> width, the z value changes
        //freq, amp, sinVal
        var angle = map(x, -width / 2, width / 2, -PI / 2, 3 * PI / 2);
        var amp = 60;
        var sinVal = sin(angle) * amp;
        var z = sinVal + amp;
        //drawSphere(x, y, z, 2);
        
        // var freq = (frameCount+x) * 0.01;
        // var amp = -60;
        // var sinVal = sin(freq) * amp;
        // var z = sinVal;
        // drawSphere(x,y,z,2);
      } else {
        var z = 0; //noiseVal;
        //drawSphere(x, y, z, 2);
      }
  
      //mouse
      push();
      translate(mouseX - width/2, mouseY - height/2, 0);
      fill(255,0,0);
      sphere(2);
      pop();

    }
  }
}

function drawSphere(x, y, z, s) { //s for size
  push();
  translate(x, y, z);
  fill(0);
  sphere(s);
  pop();
}

function createParticles(){
  for (var y = -height/2; y < height/2; y += resolution) {
    for (var x = -width/2; x < width/2; x += resolution) {
      var newX = x + width/2;
      var newY = y + height/2;
      var index = newX / resolution + newY/resolution * width/resolution;//+ newY % resolution * floor(width/resolution) ;
      //print(index);
      var p = new Particle().setPos(x,y,-40);
      particles.push(p);
    }
  }
}