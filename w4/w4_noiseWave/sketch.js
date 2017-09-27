/*
 * @name Noise Wave
 * @description Using Perlin Noise to generate a wave-like pattern.
 * Original by Daniel Shiffman.
 */
var yoff = 0.0;        // 2nd dimension of perlin noise
var balls = [];

function setup() {
  createCanvas(710, 400);
  balls[0] = new Ball(width/2, 0);
}

function draw() {
  background(51);
  
  for(var i = 0; i<balls.length; i++){
    var b = balls[i];
    
    b.update();
    b.display();
  }
  
  
  drawWave();
  
}

function drawWave(){
  fill(255);
  // We are going to draw a polygon out of the wave points
  beginShape(); 
  var xoff = 0;
  
  // Iterate over horizontal pixels
  for (var x = 0; x <= width; x += 10) {
    // Calculate a y value according to noise, map to
    var y = map(noise(xoff, yoff), 0, 1, 200,300);
    // Set the vertex
    vertex(x, y); 
    // Increment x dimension for noise
    xoff += 0.05;
  }
  // increment y dimension for noise
  yoff += 0.01;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}
