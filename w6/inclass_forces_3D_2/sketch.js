"use strict";

var FLOOR_SIZE = 400;
var FLOOR_LEVEL = -200;
var CO_FRICTION = 1;
var CO_COLLISION = 0.7;
var particles = [];
//var p;

function setup() {
  createCanvas(1000, 600, WEBGL);

  for (var i = 0; i < 50; i++) {
    particles[i] = new Particle()
      .setPosition(random(-100, 100), random(200, 300), random(-100, 100))
      //.setPosition(0, 200, 0)
      .setVelocity(random(-3, 3), random(-3, 3), random(-3, 3));
    //.setVelocity(0, -1, 0);
  }
  // p = new Particle()
  //   .setPosition(0,200,0)
  //   .setVelocity(0,-1,0)
  //   .setColor(255,0,0,100);
}

function draw() {
  scale(1, -1, 1); //to flip y axis,因为p5很奇怪，y轴朝下的
  background(0);

  //Camer-point of view
  var rotY = map(mouseX, 0, width, -PI / 2, PI / 2);
  rotateY(rotY);
  var rotX = map(mouseY, 0, height, -PI / 6, PI / 6);
  rotateX(rotX);


  //floor //先地板，再放灯光
  push();
  translate(0, FLOOR_LEVEL, 0);
  //in webgl, rotate FIRST
  rotateX(PI / 2); // + frameCount * 0.01);  // use frameCount to test the rotation
  fill(50);
  plane(FLOOR_SIZE, FLOOR_SIZE); //200,200);
  pop();

  //light?
  ambientLight(0,0,30);//rgba
  pointLight(255,255,255,0,300,0);//rgbxyz
  
  //particles
  for (var a = 0; a < particles.length; a++) {
    var p = particles[a];

    //another loop for check collisions
    for (var b = 0; b < particles.length; b++) {
      if (a != b) {
        p.checkCollision(particles[b]);
      }
    }
    var gravity = createVector(0, -1, 0);
    gravity.mult(p.mass); //别忘了重力和质量有关系
    p.applyForce(gravity);

    if (p.pos.y < FLOOR_LEVEL + p.rad + 0.1) { //1. 别忘了level是负的，2. 加一点margin，否则反应速度太快了
      var friction = p.vel.copy(); //不要change原来的速度，所以用copy 
      friction.mult(-1);
      friction.normalize();
      friction.mult(CO_FRICTION);
      p.applyForce(friction);
    }


    p.update();
    //p.checkCollision()
    //p.checkFloor();
    p.checkFloorWall()
    p.display();
  }

}