"use strict";
//GOAL: pre-set the sin(store the numbers in set up function) to fasten the program
var blobs = [];
var RES = 360;
var sinArray = [];
var cosArray = [];

function setup() {
  createCanvas(500,500);
  background(0);
  for(var i = 0; i<RES; i++){
    cosArray.push(cos(radians(i)));
    sinArray.push(sin(radians(i)));
  }
  //print(sinArray);
  
  for(var i = 0; i<5; i++){
    blobs.push(new Blob(random(width), random(height),random(0.6,0.9)));
  }
  noStroke();
}

function draw() {
  background(0);
  for(var i = 0; i<blobs.length; i++){
    blobs[i].update();
    blobs[i].display();
  }
}

function fastSin(myRadians){
  //floor to round the index number! 
  // % TWO_PI! because my adians keeps increasing!
  var index = floor(map(myRadians % TWO_PI, 0, TWO_PI, 0, RES));
  return sinArray[index];
}
function fastCos(myRadians){
  var index = floor(map(myRadians % TWO_PI, 0, TWO_PI, 0, RES));//floor to round the index number!
  return cosArray[index];
}

class Particle{
  constructor(x,y){
    this.pos = createVector(x,y);
    this.angle = random(TWO_PI);
    this.aVel = random(0.01, 0.05);
    this.dia = random(15,20);
    this.distance = random(5,10);
  }
  update(){
    //this.pos.x = cos(this.angle) * this.distance;
    //this.pos.y = sin(this.angle) * this.distance;
    this.pos.x = fastCos(this.angle) * this.distance;
    this.pos.y = fastSin(this.angle) * this.distance;
  }
  display(){
    fill(255,120);
    var dia = this.dia * fastSin(this.angle) * this.distance;
    ellipse(this.pos.x, this.pos.y, dia, dia);
    //ellipse(this.pos.x, this.pos.y, dia + 10, dia + 10);
    //ellipse(this.pos.x, this.pos.y, dia + 15, dia + 15);
  }
}
class Blob{
  constructor(x,y,size){
    this.pos = createVector(x,y);
    this.size = size;
    this.sizeFreq = random(0.01, 0.05);
    this.scale = 1.0;
    
    var randNum = floor(random(3,8));
    this.particles = [];
    for(var i = 0; i<randNum; i++){
      this.particles.push(new Particle(0,0)); //add particle class into blob class
    }
  }
  update(){
    //this.scale = this.size * map(sin(this.sizeFreq * frameCount), -1,1,0.9,1.1);
    this.scale = this.size * map(fastSin(this.sizeFreq * frameCount), -1,1,0.9,1.1);
  }
  
  display(){
    push();
    translate(this.pos.x, this.pos.y);
    scale(this.scale);//this will be updated!
    for(var i = 0; i<this.particles.length; i++){
      this.particles[i].display();
    }
    pop();
  }
}