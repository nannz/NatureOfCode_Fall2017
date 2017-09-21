"use strict";

//vector using for better arrangement: velocity, position, accelerometer
//high saturation color change while triggering dragging (HSB colormode)
//lifeSpan setting and thank you message.
//different modes of fireworks. 1.explode, rotate, and die 2.stop dying and follow the mouse
//instruction & fading effect.

//problem met
//1. the dia can be negative. Solved it by adding check() after update() & add isDead boolean
//2. set a mode to check which mode/state the fireworks are in
//3. had spent some time on figuring out what data needs to be updated whenever mouseDragged/Pressed/Clicked/Released

//also tried:WEBGL, read some examples on presenting it on mobile. See my github link w2 with all the inclass practices and personal tries
//https://github.com/nannz/NatureOfCode_Fall2017/tree/master/w2

//next:
//1.presenting it on mobile with acceleration, maybe the color of the background can change
//2.let the objects move in the direction of the shape from a svg file. maybe I can start with vertex.




var circles = [];
var numOfFire = 200;
var mode;
var instruction;
var insColor;

function setup() {
  createCanvas(600, 600);
  background(0);
  colorMode(HSB, 255);
  mode = 0;
  insColor = 255;
  instruction = "try keypressed, mouseDragged, mouseClicked";
  for (var i = 0; i < numOfFire; i++) {
    circles[i] = new Circle(width / 2, height, -10);
  }

}

function draw() {
  background(0, 10);
  //instruction
  push();
  fill(insColor);
  text(instruction, 10, 10);
  insColor -= 1;
  if (insColor == 0) {
    insColor = 0;
  }
  pop();
  
  for (var i = 0; i < circles.length; i++) {
    var c = circles[i];
    c.update(mode);
    c.check();
    c.display(mode);

    if (c.isDead) {
      circles.splice(i, 1);
    }
  }
  
  if(circles.length == 0){
    push();
    fill(255);
    textAlign(CENTER);
    text("Wish you have fun. Thank you. :)", width/2, height/2);
    print("all died!");
  }
}

function keyPressed() {
  for (var i = 0; i < circles.length; i++) {
    var c = circles[i];
    c.explode();
  }
}

function mouseDragged() {
  mode = 1;
  for (var i = 0; i < circles.length; i++) {
    var c = circles[i];
    c.isExploded = false;
  }
}

function mouseReleased() {
  mode = 0;
  for (var i = 0; i < circles.length; i++) {
    var c = circles[i];
    c.count = 0;
    c.isExploded = true;
    c.explode();
  }
}

function mousePressed() {
  var newColor = color(random(255), random(0, 100), 255);
  for (var i = 0; i < circles.length; i++) {
    var c = circles[i];
    c.circleFill = newColor;
  }
}

