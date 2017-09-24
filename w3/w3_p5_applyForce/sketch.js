
"use strict";

var liquid;

var balls = [];
var numOfBall = 1;
var gravity;
var wind;
var mode;

var CO_RESTITUTION = 0.98; //摩擦系数
var normal = 1; //垂直抗力
var GRAVITY_MAG = 0.3;
var FRICTION_MAG = 0.01;
var ballColor;

var bubbles = [];
var UPTHRUST_MAG = 0.1;

function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 255);
  ballColor = 0; //black ball
  //gravity = createVector(0, 0.1);
  wind = createVector(200,0);
  for (var i = 0; i < numOfBall; i++) {
    var myBall = new Ball(50, 50,ballColor);
    balls[i] = myBall;
  }
  
  liquid = new Liquid(width/2, height/2, 200, 200, 0.1);

}


function draw() {

  background(255);
  liquid.display();
  
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
    
    if(ball.isInLiquid(liquid)){
      ballColor = random(0,255);
      ball.applyDrag(liquid);
      
      var bubble = new Bubble(ball.position.x, ball.position.y);
      bubbles.push(bubble);
      //print("bubble!");
    }else{
      ballColor = 0;
    }
    ball.updateFill(ballColor);
    
    //start bubble
    if(bubbles.length >0){
      for(var i = 0; i < bubbles.length; i++){
        var bubble = bubbles[i];
        
        var upthrust = createVector(0,-1);
        upthrust.mult(UPTHRUST_MAG);
        upthrust.limit(ball.speed.mag());
        bubble.applyForce(upthrust);
        
        bubble.update();
        bubble.display();
        //print("displayed!");
      }
    }
  }
  
  
  
}

