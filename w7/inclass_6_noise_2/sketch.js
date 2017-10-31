function setup() {
  createCanvas(300, 300);
  noStroke();
}

function draw() {
  background(0);

  var resolution = 25;
  for (var y = 0; y < height; y += resolution) {
    for (var x = 0; x < width; x += resolution) {
      var sinVal, freq1,freq2,amp;
      freq1 = (frameCount+x) * 0.01; //freq = (x+frameCount )* 0.01;//记得加上x，不然没有时间变化感
      freq2 = (frameCount+y) * 0.01;//frameCount for animation effect
      amp = 1;
      noiseVal = noise(freq1,freq2) * amp;

      var clr = map(noiseVal, -1, 1, 0, 255);
      fill(clr);
      rect(x, y, resolution, resolution);
    }
  }
}