/**
 * Assignment for week 1
 * build path here
 * based on my logo
*/
"use strict"
var path;
var logoImg;
function preload(){
  logoImg = loadImage("data/logo.jpg");
}
function setup() {
  createCanvas(1200,600);
  background(0);
  //logoImg.resize(width, logoImg.height * width/logoImg.width);
  //image(logoImg,0,0);
  pixelDensity(1);
  noStroke();
  newPath();
  
}

function draw() {
  background(0);
  //image(logoImg,0,0);
  path.display();
}

function newPath(){
  path = new Path();
  path.addPoint(width/2-102,height/2+52);
  path.addPoint(width/2-102,height/2-56);
  path.addPoint(width/2+64,height/2+52);
  path.addPoint(width/2+2,height/2+52);
  path.addPoint(width/2+2,height/2 - 22);
  path.addPoint(width/2+116,height/2+52);
  path.addPoint(width/2+116,height/2-56);
}