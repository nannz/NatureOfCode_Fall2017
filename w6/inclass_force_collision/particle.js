"use strict";

class Particle{
  constructor(x,y,m){
    this.pos = createVector(x,y);
    this.vel = createVector();
    this.acc = createVector();
    
    this.mass = m;
    this.rad = this.mass * 5;
    
    this.clr = color(255);
  }
  
  
  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    
    //this.vel.limit(5);
  }
  applyAttraction(otherP){
    var distance = this.pos.dist(otherP.pos);
    var magnitude =(C_GRAVITY * this.mass * otherP.mass)/ (distance * distance); //the formula: (G * a.m * b.m) / (distance * distance);
    var force = p5.Vector.sub(otherP.pos, this.pos); //get the attraction force direction and mad. p1-->p2
    force.normalize();
    force.mult(magnitude);
    force.mult(-1);//相斥了
    this.applyForce(force);
  }
  
  applyForce(force){
    force.div(this.mass);
    this.acc.add(force);
  }
  checkEdges(){
    //x
     if(this.pos.x<0 ||this.pos.x > width ){
       this.vel.x = -this.vel.x;
     }
     //y
     if(this.pos.y<0 ||this.pos.y > height ){
       this.vel.y = -this.vel.y;
     }
     this.pos.x = constrain(this.pos.x, 0, width);
     this.pos.y = constrain(this.pos.y, 0, height);
    
    /*
    //x 可以用constrain啊
    if(this.pos.x<0){
      this.pos.x = width;
    }
    if(this.pos.x > width){
      this.pos.x = 0;
    }
    //y 可以用constrain啊
    if(this.pos.y<0){
      this.pos.y = height;
    }
    if(this.pos.y > height){
      this.pos.y = 0;
    }
    */
  }
  checkCollision(otherP){
    var distance = this.pos.dist(otherP.pos);
    if(distance < this.rad + otherP.rad){
      //collided
      this.clr = color(random(255),random(255),random(255));
      //this
      var force = p5.Vector.sub(otherP.pos, this.pos);
      force.normalize();
      force.mult( this.vel.mag());
      otherP.applyForce(force);
      otherP.vel.mult(0.97);
      //other
      force.mult(-1);
      force.normalize();
      force.mult( otherP.vel.mag());
      this.applyForce(force);
      this.vel.mult(0.97);
    }else{
      //not collided
    }
  }
  display(){
    push();
    translate(this.pos.x, this.pos.y);
    fill(this.clr);
    ellipse(0,0,this.rad * 2, this.rad * 2);
    pop();
  }
}