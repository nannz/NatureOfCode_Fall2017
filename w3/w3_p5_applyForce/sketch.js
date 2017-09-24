
"use strict";


var balls = [];
var numOfBall = 10;
var gravity;
var wind;
var mode;

var liquid;

var CO_RESTITUTION = 0.98; //摩擦系数
var normal = 1; //垂直抗力
var GRAVITY_MAG = 0.3;
var FRICTION_MAG = 0.01;

function setup() {
  createCanvas(500, 600);
  //gravity = createVector(0, 0.1);
  wind = createVector(100,0);
  for (var i = 0; i < numOfBall; i++) {
    var myBall = new Ball(50, 50);
    balls[i] = myBall;
  }
  
  liquid = new Liquid(width/2, height/2, 100, 100, 0.1);
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
  
  liquid.display();
}

