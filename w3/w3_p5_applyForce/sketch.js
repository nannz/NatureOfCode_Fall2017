//他很卡！！！
"use strict";


var balls = [];
var numOfBall = 1;
var gravity;
var wind;
var mode;

var liquid;

var CO_RESTITUTION = 0.9; //摩擦系数
var normal = 1; //垂直抗力
var GRAVITY_MAG = 1;
var FRICTION_MAG = 2;

function setup() {
  createCanvas(500, 600);
  //gravity = createVector(0, 0.1);
  wind = createVector(0.5,0);
  for (var i = 0; i < numOfBall; i++) {
    var myBall = new Ball(random(0, width), height / 2);
    balls[i] = myBall;
  }
  
  liquid = new Liquid(0, height/2, width, height/2, 0.1);
}


function draw() {

  background(255);
  
  for (var i = 0; i < balls.length; i++) {
    var ball = balls[i];
    
    var friction = ball.getFriction(FRICTION_MAG, normal);
    ball.applyForce(friction);
    
    ball.applyForce(wind);
    
    var gravity = createVector(0,GRAVITY_MAG);
    gravity.mult(ball.mass)
    ball.applyForce(gravity);
    
    ball.updatePosition();
    ball.checkEdges();
    ball.display();
  }

}

