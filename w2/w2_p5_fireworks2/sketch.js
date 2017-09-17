"use strict";


var circles = [];
var numOfFire = 200;
var mode;

function setup() {
  createCanvas(600, 600);
  background(0);
  colorMode(HSB, 255);
  mode = 0;

  for (var i = 0; i < numOfFire; i++) {
    circles[i] = new Circle(width / 2, height, -10);
  }

}

function draw() {
  background(0,10);
  for (var i = 0; i < circles.length; i++) {
    var c = circles[i];
    c.update(mode);
    c.check();
    c.display(mode);
    
    if(c.isDead){
      circles.splice(i,1);
    }
  }
}

function keyPressed() {
  for (var i = 0; i < circles.length; i++) {
    var c = circles[i];
    c.explode();
  }
}

function mouseDragged() {
  mode = 1;
  for (var i = 0; i < circles.length; i++) {
    var c = circles[i];
    c.isExploded = false;
  }
}

function mouseReleased() {
  mode = 0;
   for (var i = 0; i < circles.length; i++) {
    var c = circles[i];
    c.count = 0;
    c.isExploded = true;
    c.explode();
  }
}
function mousePressed(){
  var newColor = color(random(255),random(0,100),255); 
  for (var i = 0; i < circles.length; i++) {
    var c = circles[i];
    c.circleFill = newColor;
  }
}


class Circle {

  constructor(_x, _y, _velY) {
    this.position = createVector(_x, _y);
    this.acc = createVector(0, 0);
    this.vel = createVector(0, _velY);

    this.isExploded = false;
    this.isDead = false;
    
    this.angle = random(PI * 2);
    this.angleVel = random(0.05, 0.01);
    this.count = 0;

    this.dia = random(5.0, 10.0);
    this.circleFill = color(0,0,255); //hsb
    this.trans = 255;
  }
  update(mode) {
    
    this.updateAcc(mode);
    this.vel.add(this.acc);
    this.position.add(this.vel);

    if (this.isExploded) {
      this.vel.mult(0.9);
      this.dia = this.dia - 0.01;
      this.count++;
    }
    // if (this.isExploded && mode == 1){
    //   this.dia = this.dia - 0.01;
    // }
    //this.trans = this.trans -1;
  }
  
  updateAcc(mode) {
    if (mode == 0) {
      this.acc = createVector(0, 0.1);
    } else if (mode == 1) {
      //mouse
      var mouseVector = createVector(mouseX, mouseY);
      var dir = mouseVector.sub(this.position);
      dir.normalize();
      dir.mult(0.5);
      this.acc = dir;
    }
  }
  explode() {
    this.isExploded = true;
    this.vel.x = random(-10, 10);
    this.vel.y = random(-10, 10);
  }
  check(){
    if(this.trans == 0){
      this.isDead = true;
    }
    if(this.dia == 0.1){
      this.isDead = true; 
      print("dia = 0.1");
      this.dia = 0.1;
    }
    
  }
  display(mode) {
    if (mode == 0) {
      push();
      translate(this.position.x, this.position.y);
      rotate(frameCount * this.angleVel + this.angle);
      noStroke();
      fill(this.circleFill);
       ellipse(this.count, 0, this.dia, this.dia);
      //ellipse(this.count, 0, -10,-10);
      pop();
    } else if (mode == 1) {
      noStroke();
      fill(this.circleFill);
      ellipse(this.position.x, this.position.y, this.dia, this.dia);
    }
  }
}