//他很卡！！！
"use strict";


var balls = [];
var numOfBall = 1;
var gravity;
var wind;
var mode;

var c = 0.01; //摩擦系数
var normal = 1; //垂直抗力

function setup() {
  createCanvas(500, 600);
  gravity = createVector(0, 0.1);
  wind = createVector(0.1,0);
  for (var i = 0; i < numOfBall; i++) {
    var myBall = new Ball(random(0, width), height / 2);
    balls[i] = myBall;
  }
}


function draw() {

  background(255);
  
  for (var i = 0; i < balls.length; i++) {
    //为什么这么这么卡!!!
    
    var friction = balls[i].getFriction(c, normal);
    //print(friction.toString());

    balls[i].applyForce(friction);
    balls[i].applyForce(wind);
    balls[i].applyForce(gravity);
    balls[i].updatePosition();
    balls[i].checkEdges();
    balls[i].display();
  }

}

