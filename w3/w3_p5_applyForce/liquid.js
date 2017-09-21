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
    noStroke();
    fill(175);
    rect(x,y,w,h);
  }
}