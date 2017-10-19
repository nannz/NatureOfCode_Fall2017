//抖一抖的效果-》sin／cos
//feel life when applying sin and cos
function setup() {
  createCanvas(500, 600);
  noStroke();
  background(0);
}

function draw() {
  background(0);

  drawWave(3, 0, 0.005, 0.001);



}

function drawWave(size, yOffset, freq1, freq2) {
  var revolution = 3;
  for (var x = 0; x < width; x += revolution) {
    var freq, amp, sinVal;

    //3层计算，更新sinVal,-> amp -> new sinVal -> new freq and sinVal
    freq = frameCount * freq1; //0.005; //first freq
    amp = 0.02;
    sinVal = sin(freq) * amp;

    freq = frameCount * freq2; //0.001; //second freq
    amp = sinVal;
    sinVal = sin(freq) * amp;

    freq = (x + frameCount) * sinVal;
    amp = 100;
    sinVal = sin(freq) * amp;

    fill(255);
    var y = sinVal + height / 2;
    var newSize = random(1, size);
    ellipse(x, y, newSize, newSize);
  }
}