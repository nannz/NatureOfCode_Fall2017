//lerp(startValue, targetValue, xxx%)
//linear interpolation
var x;
function setup() {
  createCanvas(500,600);
  x = 0;
}

function draw() {
  background(0);
  x = lerp(x, width, 0.1); //update x value -> smooth effect(ease in, ease out effect)
  ellipse(x, height/2, 30,30);
}