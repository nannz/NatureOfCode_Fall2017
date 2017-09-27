function setup() {
  createCanvas(500,600);
}

function draw() {
  background(0);
  translate(width/2, height/2);
  
  //var angle = PI; //180
  var angle = frameCount * 0.01;
  var length = 100;
  
  //method1 to have the position
  /*
  var x = cos(angle) * length;
  var y = sin(angle) * length;
  var vector = createVector(x,y);
  */
  
  //method2 use fromAngle //好好看看p5.Vector的methods
  var vector = p5.Vector.fromAngle(angle); //create vector based on angle
  vector.mult(length);
  
  //line
  stroke(255);
  line(0,0,vector.x,vector.y);
  
}