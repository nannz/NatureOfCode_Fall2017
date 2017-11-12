"use strict";
class Agent{
  constructor(_theta,_transX, _transY,_m){
    var scal = 2 / (3 - cos(2 * _theta)) * 150;
    var x = scal * cos(_theta) + _transX; //点移动到中间去
    var y = scal * sin(2 * _theta) / 2 + _transY; //点移动到中间去
    //this.transPoint = createVector(_transX, _transY);
    
    this.pos = createVector(width/2,height/2);//createVector(x,y);
    this.theta = _theta;//0.0;
    this.STEP = 1.2;
    
    this.mass = _m;
    this.rad = this.mass
    
  }
  
  //infinite loop
  /*
  update() {
    var scal = 2 / (3 - cos(2 * this.theta )) * 150;
    var x = scal * cos(this.theta ) + this.transPoint.x; //点移动到中间去
    var y = scal * sin(2 * this.theta ) / 2 + this.transPoint.y; //点移动到中间去
    this.pos.x = x;
    this.pos.y = y; 
    
    this.theta += this.STEP;
    if(this.theta  > 2 *PI){
      this.theta  = 0.0;
    }
  }
  */
  //flower
  update(){
    push();
    rotate((this.theta + frameCount)*0.01);
    this.theta += this.STEP ;
    pop();
  }
  display() {
    push();
    translate(width/2,height/2);
    rotate((this.theta + frameCount)*0.01);
    
    var freq, amp;
    freq = frameCount * 0.01;
    amp = 200;
    var sinVal = noise(freq) * amp;
    var freq = frameCount * 0.015;
    var amp = sinVal; //frameCount * 0.1;
    var distance = sin(freq) * amp; //100;

    //drawLine for the gradient fill of the shape.
    stroke(255, 10);
    fill(255,0,0,10);
    line(0, 0, distance, 0);
    ellipse(distance, 0, 1, 1);
    pop();
    
    this.theta += this.STEP ;
    if(this.theta  > 2 *PI){
      this.theta  = 0.0;
    }
  }
}