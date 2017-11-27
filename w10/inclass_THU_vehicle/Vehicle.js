"use strict";

class Vehicle{
  
  constructor(x,y){
    this.pos = createVector(x,y);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    
    this.angle = 0;
    this.maxDesireVel = 5;//maxSpeed in the book
    this.maxSteerForce = 0.2;//for steerForce, maxForce in the book
    
    this.brakeRad = 100;//sha che // the detective area
  }
  
  applyForce(force){
    //force.div(this.mass);
    this.acc.add(force);
  }
  seek(target){
    var desireVel = p5.Vector.sub(target,this.pos);
    var distance = desireVel.mag();
    if(distance > this.brakeRad){
      desireVel.mult(this.maxDesireVel);//maxSpeed in book
    }else{
      //slow down
      var mappedMag = map(distance, 0, this.brakeRad, 0, this.maxDesireVel);
      desireVel.mult(mappedMag);
    }
    // if taking out normalize(), the desireVel will respond to the distance. like ease in/out effect.
    // desireVel.normalize();//taking out normalize(), the desireVel will respond to the distance. like ease in/out effect.
    // desireVel.mult(this.maxDesireVel);//maxSpeed 
    
    var steerForce = p5.Vector.sub(desireVel, this.vel);
    //steerForce.normalize().mult(0.05);//maxForce in the book
    steerForce.limit(this.maxSteerForce);//maxForce
    this.applyForce(steerForce);
  }
  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    
    this.angle = this.vel.heading();
    
    //this.vel.mult(0.98);
  }
  
  display(){
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    
    //debugging mode to see the check area.
    noFill();
    stroke(255,0,0);
    ellipse(0,0,this.brakeRad,this.brakeRad);
    
    noStroke();
    fill(255);
    //draw the triangle
    triangle(0,0,-20, -8, -20, 8);
    pop();
  }
}