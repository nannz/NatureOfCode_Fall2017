//noise(xoff, yoff)
//每个小方块是一个vector，有方向
var inc = 0.1;
var scl = 10;//scale
var cols, rows;

var fr;

function setup() {
  createCanvas(200,200);
  cols = floor(width/scl);
  rows = floor(height/scl);//floor得最近整数
  fr = createP('');//createParagraoh
}

function draw() {
  background(255,200);
  var yoff = 0;
  for(var y=0; y<rows;y++){
    var xoff = 0;
    for(var x = 0; x < cols ; x++){
      var index = (x + y*width)*4;
      var r = noise(xoff,yoff) * 255;
      
      var v = p5.Vector.fromAngle(random(TWO_PI));//PI/2);
      stroke(0);
      push();
      translate(x * scl, y*scl);
      rotate(v.heading());
      line(0,0,scl,0)
      pop();
      /*test grids
      //noStroke();
      fill(r);
      rect(x * scl, y * scl, scl, scl); // test: we should have a grid of rects
      */
      xoff += inc;
    }
    yoff += inc;
  }
  
  fr.html(floor(frameRate()));
}