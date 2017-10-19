function setup() {
  createCanvas(300, 300);
  noStroke();
}

function draw() {
  background(0);

  var resolution = 5;
  for (var y = 0; y < height; y += resolution) {
    for (var x = 0; x < width; x += resolution) {
      var sinVal, freq, amp;
      freq = x * 0.05; //freq = (x+frameCount )* 0.01;//记得加上x，不然没有时间变化感
      amp = 1;
      xSinVal = sin(freq) * amp;

      var clr = map(xSinVal, -1, 1, 0, 255);
      fill(clr);
      rect(x, y, resolution, resolution);
    }
  }
}