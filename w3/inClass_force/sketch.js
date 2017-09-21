"use strict";


function setup() {
  createCanvas(600,600);
}

function draw() {
  background(0);
}

class Circle {
  constructor(){
    this.pos = createVector();
    this.vel = createVector();
    this.acc = createVector();
  }
  
  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
}