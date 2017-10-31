"use strict";

class Particle{
  constructor(){
    this.pos = createVector();
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.dia = 2;
    
    this.colour = 255; //white first
    //this.mass = map(this.colour, 0, 256, 2,5)；//颜色越黑，质量越重
  }
  
  setPos(x,y){
    this.pos = createVector(x,y);
    return this;
  }
  setColour(colour){//set color and mass
    this.colour = colour;
    //this.mass = map(colour, 0, 255, 5，2)； //update the mass
    return this;
  }
  
  update(){
  }
  
  display(){
    push();
    translate(this.pos.x, this.pos.y);
    fill(this.colour);
    ellipse(0,0,this.dia, this.dia);
    pop();
    
  }
  
}