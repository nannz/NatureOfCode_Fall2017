var bx;
var by;

var pg; //pGraphic

function setup() {
  createCanvas(500, 600);
  bx = 0;
  by = height / 2;

  pg = createGraphics(400, 400); //create an extra canvas
  pg.pixelDensity(1);
  imageMode(CENTER);

}

function draw() {
  background(255);

  var noiseValue = noise(frameCount * 0.01) * 100;
  var x = cos(frameCount * 0.01) * noiseValue;
  var y = sin(frameCount * 0.01) * noiseValue;

  pg.push();
  pg.translate(pg.width / 2, pg.height / 2);
  pg.stroke(0, 100);
  pg.line(0, 0, x, y);
  pg.pop();
  image(pg, mouseX, mouseY);

  fill(100);
  stroke(0);
  ellipse(bx, by, 100, 100);
  bx++;

  fill(0);
  text(frameCount, 10, 20); //but the text can't be seen clearly. We need createGraphics to fix this. So we can show other info on the canvas
}