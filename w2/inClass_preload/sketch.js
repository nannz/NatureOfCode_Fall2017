//consider preloading content and window in html file.

var img;
var imgColor;

function preload() {  // preload() runs once for img, video or any files
  img = loadImage('assets/img.png'); //be careful not to have /assets  a slash before assets on web sometimes go to the root
}

function setup() {
  createCanvas(500,600);
  //image(img,0,0); //img(img,x,y,w,h)
}

function draw() {
  background(100);
  image(img,0,0,500,img.height /(img.width/500) ); //img(img,x,y,w,h)
}