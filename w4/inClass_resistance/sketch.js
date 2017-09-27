"use strict";
var balls = [];
var numOfBalls = 3;
var FRICTION_MAG = 2;
var WATER_LEVEL;
var CO_AIR = 0.02;
var CO_WATER = 0.2;

function setup() {
  createCanvas(500,600);
  WATER_LEVEL  = height/2;
  noStroke();
  for(var i = 0; i< numOfBalls; i++){
    balls[i] = new Ball(width/2 + random(-150, 150), 0);
  }
  
}

function draw() {
  background(0);
  
  for(var i = 0; i < balls.length; i++){
    var b = balls[i];
    
    //gravity
    var gravity = createVector(0,1 * b.mass);
    b.applyForce(gravity);
    
    //resistance
    var resistance = p5.Vector.mult(b.vel,-1);
    resistance.normalize();
    var speed = b.vel.mag();
    if(b.pos.y < WATER_LEVEL){
      var magnitude = CO_AIR * speed * speed;
      resistance.mult(magnitude);
    }else{
      //in water
      var magnitude = CO_WATER * speed * speed;
      resistance.mult(magnitude);
      
      /*//上下浮动
      var buo = createVector(0,-10);
      b.applyForce(buo);*/
    }
    
    b.applyForce(resistance);
    
    
    b.update();
    b.display();
  }
  
  fill(0,0,255,100);
  rect(0,WATER_LEVEL, width,height-WATER_LEVEL);
}