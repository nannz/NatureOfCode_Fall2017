"use strict";
var colorOff = 0.0;
class Ball {
  constructor(_positionX, _positionY, _color) {
    this.position = createVector(_positionX, _positionY);
    this.speed = createVector(0, 0);
    //this.r = random(5.0, 10.0);
    this.acceleration = createVector(0, 0);
    this.ballFill =  color(_color,255,255);
    this.topSpeed = 15; //set the max value of speed
    this.mass = random(1.0,2.0);
    this.r = map(this.mass,1.0,2.0,5.0,10.0);
    
    this.isInL = false;
    this.wasInL = false;
    this.bubbles = [];
  }


  applyForce(force) {
    force.div(this.mass); //gravity/m
    this.acceleration.add(force);
  }

  updatePosition() {
    this.speed.add(this.acceleration);
    this.speed.limit(this.topSpeed);
    this.position.add(this.speed);
    this.acceleration.mult(0); //reset acce
  }

  checkEdges() {
    if(this.position.x < this.r || this.position.x > width - this.r){
      //this.updateFill();
      this.speed.x= - this.speed.x;
      this.speed.mult(CO_RESTITUTION);
    }
    if(this.position.y < this.r || this.position.y > height -this.r){
      //this.updateFill();
      this.speed.y = - this.speed.y;
      this.speed.mult(CO_RESTITUTION);
    }
    
    this.position.x = constrain(this.position.x, 0, width-this.r);
    this.position.y = constrain(this.position.y, 0, height-this.r);
  };

  display() {
    noStroke();
    fill(this.ballFill);
    ellipseMode(RADIUS);
    ellipse(this.position.x, this.position.y, this.r, this.r);
  };

  updateFill(ballColor) {
    colorOff += 0.01;
    var s = noise(colorOff)*255;
    var newColor = color(ballColor,s,255);
    this.ballFill = newColor;
  }

  getPosition() {
    return this.position.copy();
  }

  getSpeed() {
    return this.speed.copy();
  }

  getFriction(FRICTION_MAG, normal) { //摩擦阻力
    // var frictionMag = FRICTION_MAG * normal;
    // var friction = this.getSpeed();
    // friction.mult(-1);
    // friction.normalize(); //get the direction
    // friction.mult(frictionMag);
    // friction.limit(this.speed.mag());
    // return friction;
    
    var friction = p5.Vector.mult(this.speed,-1);
    friction.normalize();
    friction.mult(FRICTION_MAG);
    friction.limit(this.speed.mag());
    return friction;
  }
  
  applyDrag(liquid){ //流体里的阻力
    var speed = this.speed.mag();
    var dragMag = liquid.c * speed * speed;
    var drag = this.getSpeed();
    drag.mult(-1);
    drag.normalize();
    drag.mult(dragMag);
    
    this.applyForce(drag);
    //return drag;
  }
  
  isInLiquid(liquid){
    var l_LeftX = liquid.x-liquid.w * 0.5;
    var l_RightX = liquid.x + liquid.w * 0.5;
    var l_TopY = liquid.y - liquid.h * 0.5;
    var l_BottomY = liquid.y + liquid.h * 0.5;
    
    if((this.position.x - this.r )> l_LeftX && (this.position.x+this.r)<l_RightX && (this.position.y+this.r)>l_TopY && (this.position.y-this.r)<l_BottomY){
      this.isInL = true;
    }else{
      this.isInL = false;
    }
    return this.isInL;
  }
}