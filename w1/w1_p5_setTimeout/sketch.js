//Dan's youtube video: https://www.youtube.com/watch?v=nGfTjA8qNDA&list=PLRqwX-V7Uu6ZmA-d3D0iFIvgrB5_7kB8H
//This video covers the setTimeout() function in JavaScript in the context of p5.js.  
//setTimeout() allows you to execute a given function at a specific time (in milliseconds.)
//9.1 of p5.js tutorial


var x,y,r;
var xSpeed, ySpeed;
var circleFill;

function setup() {
  createCanvas(500,600);
  x = width/2;
  y = height/2;
  r = 30;
  circleFill = color(255,255,255);
  
  xSpeed = random(-3,3);
  ySpeed = random(-3,3);
  print(xSpeed);
  
  setTimeout(test,3000); //wait for 3 seconds, then execute test function
  //test();
}

function draw() {
  background(100);
  

  x += xSpeed;
  y += ySpeed;
  
  if (x<0 || x >width){
    xSpeed = - xSpeed;
  }
  if (y<0 || y > height){
    ySpeed = -ySpeed;
  }
  drawBall(x,y,xSpeed,ySpeed);
}

function drawBall(x,y,xSpeed,ySpeed){
   //createP('xSpeed is' + 'ySpeed is');
  noStroke();
  fill(circleFill);
  ellipseMode(RADIUS);
  ellipse(x,y,r,r);
}


function test(){
  createP('initial xSpeed is ' + xSpeed + ', initial ySpeed is ' + ySpeed);
}

function mousePressed(){
  setTimeout(changeSpeednColor,1000);//same as delay. execute the function after 1000 milli seconds
}
function changeSpeednColor(){
  xSpeed = random(-3,3);
  ySpeed = random(-3,3);
  circleFill = color(random(0,255),random(0,255),random(0,255));
}