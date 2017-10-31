"use strict";
var img;
var particles = [];

var resolution = 10; //先放着 //一个格子的宽度和长度

function preload() {
  img = loadImage("assets/cruz_small.jpg");
}
function setup() {
  createCanvas(600, 765); //size should be multiple of img width and height
  
  print(img.width + ", " + img.height);

  pixelDensity(1);
  noStroke();
  
  //read the image, get data, create particle objects
  createParticles();
}

function draw() {
  background(255);
  
  for(var i = 0; i<particles.length; i++){
    var p = particles[i];
    p.display();
  }

}

//read the image, get data, create particle objects
function createParticles(){
  img.loadPixels();
  loadPixels();
  for (var y = 0; y < height; y += resolution) {
    for (var x = 0; x < width; x += resolution) {
      var imgIndex = (x + y * width) * 4;
      var r = img.pixels[imgIndex + 0];
      var g = img.pixels[imgIndex + 1];
      var b = img.pixels[imgIndex + 2];
      var colour = color(r, g, b);
      var bright = (r + g + b) / 3;

      //fill(255 - bright);
      //ellipse(x, y, 2, 2);

      var p = new Particle().setPos(x,y).setColour(bright);
      particles.push(p);
    }
  }
}