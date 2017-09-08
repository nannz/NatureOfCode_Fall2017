var x,y,r;
var xSpeed, ySpeed;
var gravity;

function setup() {
  createCanvas(500,600);
  x = width/2;
  y = height/2;
  r = 60;
  
  xSpeed = random(-3,3);
  ySpeed = random(-3,3);
  
  gravity = 0.1;
}

function draw() {
  background(100);

  
  //1.update virables first
  x +=xSpeed;
  y +=ySpeed;
  
  //apply gravity
  ySpeed += gravity; //this is an error
  
  //2.check virables second
  if(x<0 || x>width) {
    xSpeed = xSpeed* -1;
  }
  if(y<0 || y > height){ 
    ySpeed = -ySpeed;}

  
  
  //3.display thirdly  
  fill(255);
  noStroke();
  ellipse(x,y,r,r);
}

function keyPressed(){
  xSpeed = random(-3,3);
  ySpeed = random(-3,3);
}