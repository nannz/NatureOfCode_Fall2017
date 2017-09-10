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
  this.x = width / 2;
  this.y = height / 2;
  this.r = 30;
  this.xSpeed = random(-3, 3);
  this.ySpeed = random(-3, 3);
  this.ballFill = color(255, 255, 255);

  this.updatePosition = function(){
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  };
  this.checkEdges = function() {
    if (this.x < 0 || this.x > width) {
      this.xSpeed = -this.xSpeed;
    }
    if (this.y < 0 || this.y > height) {
      this.ySpeed = -this.ySpeed;
    }
  };
  this.display = function() {
    noStroke();
    fill(this.ballFill);
    ellipseMode(RADIUS);
    ellipse(this.x, this.y, this.r, this.r);
  };
}
