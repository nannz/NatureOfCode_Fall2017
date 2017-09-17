function setup() {
  createCanvas(600, 600, WEBGL);
  ambientMaterial(250);
}

function draw() {
  background(0);
  var locY = (mouseY / height - 0.5) * (-2);
  var locX = (mouseX / width - 0.5) * 2;
  //print("locX: "+locX + "; locY: "+locY);
  ambientLight(100, 80, 80);
  // pointLight(200, 200, 200, locX, locY, 0);
  pointLight(200, 200, 200, -0.3, 0.3, 0);
  
  push();
  translate(0, 0, 0);
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  sphere(80);
  pop();
  pop();
}