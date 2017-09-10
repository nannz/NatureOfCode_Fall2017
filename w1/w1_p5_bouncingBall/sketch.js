var x,y,r;
var location;
var speed;

function setup() {
  createCanvas(500,600);
  
  //set the initial position & size of the circle
  location = new p5.Vector(width/2,height/2);
  print(location.x);
  r = 30;
  
  //set speed
  speed = createVector(random(-3,3),random(-3,3));
  
}

function draw() {
  background(100);
  
  //1.update virables
  location.add(speed);
  
  //2.check virables
  if (location.x<0 || location.x>width){
    speed.x = - speed.x;
  }
  if (location.y<0 || location.y > height){
    speed.y = - speed.y ;
  }
  
  //3.display
  fill(255);
  noStroke();
  ellipseMode(RADIUS); //the third & fourth are r instead of width of the circle
  ellipse(location.x,location.y,r,r);
}