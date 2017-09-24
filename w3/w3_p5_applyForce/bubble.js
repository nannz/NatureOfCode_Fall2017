"use strict";

class Bubble{
  constructor(_x,_y){
    this.position = createVector(_x,_y);
    this.speed = createVector(0, 0);
    this.acceleration = createVector(random(0.0,1.0),random(0.0,1.0));
    this.r = random(1,5);
    this.bubbleFill =  color(152,random(60,80),255);
    
    this.mass = 1;
  }
  
  update(){
    this.speed.add(this.acceleration);
    this.position.add(this.speed);
    this.acceleration.mult(0);
  }
  
  applyForce(force){
    force.div(this.mass);
    this.acceleration.add(force);
  }
  
  isOutLiquid(liquid){
    
  }
  
  display(){
    noStroke();
    fill(this.bubbleFill);
    ellipse(this.position.x,this.position.y,this.r,this.r);
  }
  
  
}