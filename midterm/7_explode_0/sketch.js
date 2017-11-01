"use strict";
var particles = [];
var resolution = 10;
var mousePos;
var DIST = 100;
var mouseStatus = false;
var mouseCount = 0;
function setup() {
  createCanvas(600, 600, WEBGL);
  noStroke();
  createParticles();
}

function draw() {
  background(255);
  var mouseIndex = floor(mouseX / resolution) + floor(mouseY / resolution) * width / resolution;
  mousePos = createVector(mouseX - width / 2, mouseY - height / 2, 0); //z = 0 for now. 

  
  rotateX(-PI / 6);
  //translate(0, -40, 100);
  var amp = -60;

  for(var i = 0; i < particles.length; i++){
    var p = particles[i];
    if(mouseStatus == true){
      if(p.checkDist(mousePos)){
        var distance = p.getDist(mousePos);
        var angle = map(distance, 0, DIST, -PI / 2, PI / 2);
        var sinVal = sin(angle) * amp; //amp = -60
        var noiseVal = map(noise(sinVal), 0, 1, 0.8, 1.5);
        var velZ = noiseVal * (sinVal - amp);
        var noiseForce = createVector(0,0,velZ);
        p.explode(noiseForce);
        
      }
    }
    //mouseStatus = false;
    
    p.update();
    p.display();
  }
  print(mouseStatus);
}

function drawSphere(x, y, z, s) { //s for size
  push();
  translate(x, y, z);
  fill(0);
  sphere(s);
  pop();
}

function createParticles() {
  for (var y = -height / 2; y < height / 2; y += resolution) {
    for (var x = -width / 2; x < width / 2; x += resolution) {
      var newX = x + width / 2;
      var newY = y + height / 2;
      var index = newX / resolution + newY / resolution * width / resolution; //+ newY % resolution * floor(width/resolution) ;
      //print(index);
      var p = new Particle().setPos(x, y, -40);
      particles.push(p);
    }
  }
}

function mouseReleased() {
  mouseCount ++;
  mouseStatus = true; //now canot go back to false only detact the first mouse release
  
}