"use strict";

class Liquid{
  constructor(_x,_y,_w,_h,_c){
    this.x = _x;//left-top point
    this.y = _y;//left-top point
    this.w = _w;//width of the liquid
    this.h = _h;//height of the liquid
    this.c = _c;//摩擦系数
  }
  
  display() {
    push();
    translate(this.x,this.y);
    noStroke();
    fill(0);
    rectMode(CENTER);
    rect(0,0,this.w,this.h);
    pop();
  }
}