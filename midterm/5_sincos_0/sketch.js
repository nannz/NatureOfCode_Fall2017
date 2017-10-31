"use strict";
var particles = [];
var resolution = 10;
function setup() {
  createCanvas(600, 600, WEBGL);
  noStroke();
}

function draw() {
  //in webgl, y-axis for us is actually z-axis
  background(255);
  
  rotateX(-PI/6);
  translate(0,-40,100);
  
  for (var y = -height/2; y < height/2; y += resolution) {
    for (var x = -width/2; x < width/2; x += resolution) {
      
      //var sinVal, freq1,freq2,amp;
      //play with change of freq的倍数and amp
      /*
      freq1 = (frameCount+x) * 0.02; //freq = (x+frameCount )* 0.01;//记得加上x，不然没有时间变化感
      freq2 = (frameCount+y) * 0.02;//frameCount for animation effect
      amp = -40;
      var noiseVal = noise(freq1,freq2) * amp;
      */
      
      // if(y is in the middle){
      //   this line goes in sin - the z value
      // }
      
      if(y == 0){
        //from x -> width, the z value changes
        //freq, amp, sinVal
        var freq = (frameCount+x) * 0.01;
        var amp = -60;
        var sinVal = sin(freq) * amp;
        var z = sinVal;
        drawSphere(x,y,z,2);
      }else{
        var z = 0;//noiseVal;
        drawSphere(x,y,z,2);
      }
      
    }
  }
}

function drawSphere(x,y,z,s){//s for size
  push();
  translate(x,y,z);
  fill(0);
  sphere(s);
  pop();
}

