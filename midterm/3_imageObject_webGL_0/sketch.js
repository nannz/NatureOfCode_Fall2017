"use strict";
var img;
var FLOOR_SIZE = 400;
var resolution = 10;
function preload() {
  img = loadImage("assets/cruz_small.jpg");
}
function setup() {
  createCanvas(600,765,WEBGL);
  pixelDensity(1);
  noStroke();
}

function draw() {
  background(255);
  
  img.loadPixels();
  //loadPixels();
  
  for (var z = 0; z < height; z += resolution) {
    for (var x = 0; x < width; x += resolution) {
      var imgIndex = (x + z * width) * 4;
      var r = img.pixels[imgIndex + 0];
      var g = img.pixels[imgIndex + 1];
      var b = img.pixels[imgIndex + 2];
      var colour = color(r, g, b);
      var bright = (r + g + b) / 3;
      //fill(255 - bright);
      //ellipse(x, y, 2, 2);
      //var p = new Particle().setPos(x,z).setColour(255 - bright);
      //particles.push(p);
    }
  }

  fill(240);
  plane(FLOOR_SIZE, FLOOR_SIZE);
}

