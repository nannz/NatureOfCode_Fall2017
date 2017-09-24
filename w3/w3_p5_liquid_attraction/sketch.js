"use strict";

var liquid;

var balls = [];
var numOfBall = 5;
var gravity;
var wind;
var mode;

var CO_RESTITUTION = 0.98; //摩擦系数
var normal = 1; //垂直抗力
var GRAVITY_MAG = 0.3;
var FRICTION_MAG = 0.01;
var ballColor;

var bubbles = [];
var UPTHRUST_MAG = 0.01;

var BUBBLE_MAX = 15;
var ATTRACTION_MAG = 0.6;

function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 255);
  ballColor = 0; //black ball
  //gravity = createVector(0, 0.1);
  wind = createVector(50, 0);
  for (var i = 0; i < numOfBall; i++) {
    var myBall = new Ball(50, 50, ballColor);
    balls[i] = myBall;
  }

  liquid = new Liquid(width / 2, height / 2, 200, 300, 0.1);

}

function mouseClicked(){
  print("clicked!");
  for(var i = 0; i < balls.length; i++){
    var ball = balls[i];
    
    var upForce = createVector(0,-10);
    ball.applyForce(upForce);
  }
}


function draw() {

  background(255);
  liquid.display();

  for (var i = 0; i < balls.length; i++) {
    var ball = balls[i];
    
    var friction = ball.getFriction(FRICTION_MAG, normal);
    ball.applyForce(friction);

    ball.applyForce(wind);

    var gravity = createVector(0, GRAVITY_MAG);
    gravity.mult(ball.mass)
    ball.applyForce(gravity);

    if (ball.isInLiquid(liquid)) {
      ballColor = random(0, 255);
      ball.applyDrag(liquid);
      
      //add bubble
      //limit the number of bubbles
      //if (bubbles.length <= BUBBLE_MAX) {
        // var bubble = new Bubble(ball.position.x, ball.position.y);
        // bubbles.push(bubble);
      //}
      var bubble = new Bubble(ball.position.x, ball.position.y);
      bubbles.push(bubble);
    } else {
      ballColor = 0;
      
      fill(0);
      text("Attraction!",width-100,10);
      //applyAttraction when not in liquid
      for (var j = 0; j < balls.length; j++) {
        if (i != j) {
          var otherBall = balls[j];
          var attractionF = otherBall.getAttraction(ball);
          ball.applyForce(attractionF);
        }
      }
    }

    ball.updatePosition();
    ball.updateFill(ballColor);
    ball.checkEdges();
    ball.display();
  }

  //start bubble
  if (bubbles.length > 0) {
    //print("1");
    for (var i = 0; i < bubbles.length; i++) {
      var bubble = bubbles[i];

      var upthrust = createVector(0, -1);
      upthrust.mult(UPTHRUST_MAG);
      upthrust.limit(ball.speed.mag());
      bubble.applyForce(upthrust);

      bubble.update();
      
      if (bubble.isOutLiquid(liquid)) {
        //print(i);
        //bubbles.splice(bubble);
        bubbles.splice(i,1);
      }
      bubble.display();
    }
  }else if(bubbles.length == 0){
    //print("0");
  }
  
  // print(bubbles.length);

}