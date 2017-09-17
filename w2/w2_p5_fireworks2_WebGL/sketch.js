"use strict";
var mode;
var s;
function setup() {
  createCanvas(600, 600, WEBGL);
  background(0);
  mode = 0;
  ambientMaterial(250);
  s = new Sphere(0, 0, 0, -10);
}

function draw() {
  background(0);
  ambientLight(100, 80, 80);
  pointLight(200, 200, 200, -0.3, 0.3, 0);

  s.display(mode);
}

class Sphere {
  constructor(_x,_y, _z, _velY) {
    this.position = createVector(_x, _y, _z);
    this.rad = random(5, 10);
  }

  update(mode) {

  }

  display(mode) {
    push();
    translate(this.position.x,this.position.y,this.position.z);
    push();
    rotateZ(frameCount * 0.01);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    sphere(this.rad);
    pop();
    pop();
  }


}