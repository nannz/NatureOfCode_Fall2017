"use strict";

class Bubble{
  constructor(_x,_y){
    this.position = createVector(_x,_y);
    this.speed = createVector(0, 0);
    this.acceleration = createVector(random(0.0,1.0),random(0.0,1.0));
    this.r = random(1,5);
    this.bubbleFill =  color(152,10,255);
    
    this.mass = 1;
    this.isOutL = false;
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
    var l_LeftX = liquid.x-liquid.w * 0.5;
    var l_RightX = liquid.x + liquid.w * 0.5;
    var l_TopY = liquid.y - liquid.h * 0.5;
    var l_BottomY = liquid.y + liquid.h * 0.5;
    
    if( (this.position.y-this.r) < l_TopY){
      this.isOutL = true;
    }else{
      this.isOutL = false;
    }
    
    
    // if((this.position.x - this.r )> l_LeftX && (this.position.x+this.r)<l_RightX && (this.position.y-this.r)>l_TopY && (this.position.y+this.r)<l_BottomY){
    //   this.isOutL = false;
    // }else{
    //   this.isOutL = true;
    // }
    return this.isOutL;
  }
  
  display(){
    noStroke();
    fill(this.bubbleFill);
    ellipse(this.position.x,this.position.y,this.r,this.r);
  }
  
  
}