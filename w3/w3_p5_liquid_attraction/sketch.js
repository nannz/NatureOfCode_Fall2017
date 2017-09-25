/*
Nan
09/25/2017
Nature of Code Week3

Used:
1. ball
2. bubbles when in the liquid
3. Force: 
  gravity, 
  wind, 
  friction, 
  drag(force when in liquid), 
  attraction, mouseForce(another attraction)
4. color: HSB and noise
5. font use
6. mouse Interaction

Problem & Question:
1. I want the liquid to be look like real liquid. But I am struggling on how to make it move at the same time i can
easy check if the ball is in the liquid.
2. [Solved]Tricky part on for loop. When one of the bubbles of a ball is out of the liquid, the whole set of the 
bubbles was spliced from the bubbles array. I figured why later. It is because I didn't take a careful look on for loop setitng. 
*/




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

var myFont;
function preload() {
  myFont = loadFont('assets/AtikFont.ttf');
}

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

function mouseDragged(){
  var mouseVector = createVector(mouseX, mouseY);
  //print("dragging!");
  for(var i = 0; i < balls.length; i++){
    var ball = balls[i];
    
    var mouseForce = p5.Vector.sub(ball.position, mouseVector);
    var distance = mouseForce.mag();
    //print(i + " " + distance);
    distance = constrain(distance,ball.r,2000.0);
    mouseForce.normalize();
    
    var strength = (ATTRACTION_MAG * ball.mass * 1000)/(distance * distance);
    mouseForce.mult(strength * -1);
    
    ball.applyForce(mouseForce);
  }
}


function draw() {

  background(255);
  
  fill(0);
  textFont(myFont);
  text("Try clicking and dragging ", 10,20);
  
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
      var bubble = new Bubble(ball.position.x, ball.position.y);
      bubbles.push(bubble);
    } else {
      ballColor = 0;
      
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