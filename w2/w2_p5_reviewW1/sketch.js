//insights from previous class
//constrain
//friction

//the object
var myBall;

function setup() {
  createCanvas(500, 600);

  myBall = new Ball();

}

function draw() {
  background(100);

  myBall.updatePosition();
  myBall.checkEdges();
  myBall.display();
}

function Ball() {
  this.position = createVector(width/2,height/2);
  this.speed = createVector(random(-3,3),random(-3,3));
  this.r = 30;
  this.acceleration = createVector(0,0.1); 
  this.ballFill = color(255, 255, 255);

  this.topSpeed = 10;//set the max value of speed
  
  this.updatePosition = function(){
    this.speed.add(this.acceleration);
    this.speed.limit(this.topSpeed);
    this.position.add(this.speed);
  };
  this.checkEdges = function() {
    if (this.position.x < 30 ) {
      this.position.x = 30; //in the window keep x
      this.speed.x = -this.speed.x;
    }else if (this.position.x > width - 30){
      this.position.x = width - 30;
      this.speed.x = -this.speed.x;
    }
    if (this.position.y < 30 ) {
      this.position.y = 30;
      this.speed.y = -this.speed.y;
    }else if(this.position.y > height-30){
      this.position.y = height - 30;
      this.speed.y = -this.speed.y;
    }
  };
  this.display = function() {
    noStroke();
    fill(this.ballFill);
    ellipseMode(RADIUS);
    ellipse(this.position.x, this.position.y, this.r, this.r);
  };

}
