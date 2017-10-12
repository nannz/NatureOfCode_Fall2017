"use strict";
//noise(xoff, yoff)
//每个小方块是一个vector，有方向
var inc = 0.1;
var scl = 20; //scale
var cols, rows;

var zoff = 0; //the time
var fr;

var particles = [];

var flowfield = [];

function setup() {
  createCanvas(400, 400);
  cols = floor(width / scl);
  rows = floor(height / scl); //floor得最近整数
  fr = createP(''); //createParagraoh

  flowfield = new Array(cols * rows);
  
  for (var i = 0 ; i < 400; i++) {
    particles[i] = new Particle();
  }
  background(255);
}

function draw() {
  //background(255,5);
  // randomSeed(10);
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = (x + y * cols) ;
      var angle = noise(xoff, yoff, zoff) * TWO_PI;
      var v = p5.Vector.fromAngle(angle); //PI/2);
      
      //*** control the speed
      v.setMag(1);//不要太快
      
      
      flowfield[index] = v;
      
      //draw lines of vectors
      /*
      push();
      stroke(0,50);
      translate(x * scl, y * scl);
      rotate(v.heading());
      line(0, 0, scl, 0)
      pop();
      */
      //test grids
      /*test grids
      //noStroke();
      fill(r);
      rect(x * scl, y * scl, scl, scl); // test: we should have a grid of rects
      */
      xoff += inc;
    }
    yoff += inc;

    zoff += 0.0003;
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
    
  }
  fr.html(floor(frameRate()));
}