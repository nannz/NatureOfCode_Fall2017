"use strict";

class NextImage{
  
  constructor(){
    this.pos = createVector(0,0,0);
    this.size = 0;
    this.mass = 0;
  }
  setPos(x,y,z){
    this.pos = createVector(x, y, z);
    return this;
  }
  setSize(size){
    this.size = size;// var pSize = map(bright, 0, 255, 0.1, 2.0);
    this.mass = map(size, 0, 2, 2.0, 0.0);
    return this;
  }
}