"use strict";
var img;
var cols = 16; //横着16个格子
var resolution = 10;//先放着 //一个格子的宽度和长度
var rows;

function preload() {
  img = loadImage("assets/cruz_small.jpg");
}

function setup() {
  createCanvas(600, 765); //size should be multiple of img width and height

  //img.resize(width , img.height * width/img.width);
  print(img.width + ", "+img.height);
  //background(255);
  pixelDensity(1);
  noStroke();
}

function draw() {
  background(255);
  
  //image(img,0,0);
  img.loadPixels();
  loadPixels();
  
  for (var y = 0; y < height; y += resolution){
    for (var x = 0; x < width; x += resolution){
      var imgIndex = (x + y * width) *4;
      var r = img.pixels[imgIndex +0];
      var g = img.pixels[imgIndex +1];
      var b = img.pixels[imgIndex +2];
      var colour = color(r,g,b);
      var bright = (r+g+b)/3;
      
      fill(0, 255-bright);
      ellipse(x,y,2,2);
    }
  }
  
  /* the slow version
  for (var y = 0; y < height; y ++){
    for (var x = 0; x < width; x ++){
      var imgIndex = ((x*resolution) + (y*resolution)*width)*4;
      //var imgIndex = ((img.width-x+1) + (y*img.width))*4;
      //var imgIndex = (x + y * width)*4;
      
      var r = img.pixels[imgIndex +0];
      var g = img.pixels[imgIndex +1];
      var b = img.pixels[imgIndex +2];
      var colour = color(r,g,b);
      var bright = (r+g+b)/3;
      fill(0,255-bright);
      ellipse(x*resolution,y*resolution,2,2);
    }
  }
  */
  
   //print(img.width + ", "+img.height);
}