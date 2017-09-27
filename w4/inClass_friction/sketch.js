"use strict";
var balls = [];
var numOfBalls = 3;
var FRICTION_MAG = 2;
var WATER_LEVEL;
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
    var gravity = createVector(0,1);
    gravity.mult(b.mass);
    b.applyForce(gravity);
    
    //friction
    //option 2 to have friction
    //if friction is timed with a number smaller than vel.mag(<1), then we don't need normalize()&nult()
    var friction = p5.Vector.mult(b.vel, -1);//<-cheap & clean codes for mult(b.vel, -1 * 0.2);
    
    if(b.pos.y < WATER_LEVEL){
      //air
      friction.mult(0.2);
    }else{
      //water
      friction.mult(0.95);
      
      var buo = createVector(0,-10);
      b.applyForce(buo);//上下浮动
    }
    
    b.applyForce(friction);
    
    b.update();
    b.display();
  }
  
  fill(0,0,255,100);
  rect(0,WATER_LEVEL, width,height-WATER_LEVEL);
}