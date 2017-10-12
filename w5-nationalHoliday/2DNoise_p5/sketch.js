//noise(xoff, yoff)
var inc = 0.01;
var start = 0;

function setup() {
  createCanvas(200,200);
  pixelDensity(1); //turn off the high density of my mac screen
}

function draw() {
  
  var yoff = 0;
  loadPixels();//****
  //beginShape();
  //var xoff = start;
  for(var y=0; y<height;y++){
    var xoff = 0;
    for(var x = 0; x < width ; x++){
      var index = (x + y*width)*4;
      var r = noise(xoff,yoff) * 255;
      //var r = random(255);
      pixels[index +0]=r;//255;
      pixels[index +1]=r;//0;
      pixels[index +2]=r;//0;
      pixels[index +3]=255;//255;
      
      xoff += inc;
    }
    yoff += inc;
  }
  //endShape();
  //start += inc;
  updatePixels();
  noLoop();
}