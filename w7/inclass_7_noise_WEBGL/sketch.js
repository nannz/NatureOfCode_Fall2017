function setup() {
  createCanvas(600, 600, WEBGL);
  noStroke();
}

function draw() {
  //in webgl, y-axis for us is actually z-axis
  background(0);

  rotateY(frameCount * 0.01);
  var resolution = 10;
  for (var z = -height/2; z < height/2; z += resolution) {
    for (var x = -width/2; x < width/2; x += resolution) {
      var sinVal, freq1,freq2,amp;
      //play with change of freq的倍数and amp
      freq1 = (frameCount+x) * 0.02; //freq = (x+frameCount )* 0.01;//记得加上x，不然没有时间变化感
      freq2 = (frameCount+z) * 0.02;//frameCount for animation effect
      amp = -40;
      noiseVal = noise(freq1,freq2) * amp;
      var y = 200 + noiseVal;
      var clr = map(noiseVal, -1, 1, 0, 255);
      drawBox(x,y,z,5);
    }
  }
}

function drawBox(x,y,z,s){//s for size
  push();
  translate(x,y,z);
  box(s);
  pop();
}