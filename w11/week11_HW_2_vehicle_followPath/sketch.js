/**
 * Assignment for week 1
 * make behicle following path
 * based on my logo
 */
"use strict"
var path;
var logoImg;
var debug = true;
var vehicles = [];
var numOfVehicles = 10;

function preload() {
  logoImg = loadImage("data/logo.jpg");
}

function setup() {
  createCanvas(1200, 600);
  background(0);
  //logoImg.resize(width, logoImg.height * width/logoImg.width);
  //image(logoImg,0,0);
  pixelDensity(1);
  noStroke();
  newPath();

  for (var i = 0; i < numOfVehicles; i++) {
    var v = new Vehicle( random(0,width/2),random(20,height - 20));
    v.setVel(random(0.3, 0.5), random(-0.4, 0.4));
    vehicles.push(v);
  }

}

function draw() {
  background(0);
  
  if (debug) {
    path.display();
  }
  
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.flock(vehicles);
    v.follow(path);
    v.update();
    v.display();
  }
}

function newPath() {
  path = new Path();
  // path.addPoint(0, height/2 - 30);
  // path.addPoint(width,height/2 + 30);
  
  
  //path.addPoint(width / 2 - 102, height);
  path.addPoint(width / 2 - 102, height / 2 + 52);
  path.addPoint(width / 2 - 102, height / 2 - 56);
  path.addPoint(width / 2 + 64, height / 2 + 52);
  path.addPoint(width / 2 + 2, height / 2 + 52);
  path.addPoint(width / 2 + 2, height / 2 - 22);
  path.addPoint(width / 2 + 116, height / 2 + 52);
  path.addPoint(width / 2 + 116, height / 2 - 56);
  //path.addPoint(width / 2 + 116, 0);
}

function mousePressed(){
  var v = new Vehicle(mouseX, mouseY);
  v.setVel(random(0.3, 0.5), random(-0.4, 0.4));
  vehicles.push(v);
}