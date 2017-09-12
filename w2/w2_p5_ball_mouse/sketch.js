var myBall;
var mode;

function setup() {
  createCanvas(500, 600);
  myBall = new Ball();
  mode = 0;
}

function draw() {
  background(100);
  print('mode: ' + mode);
  
    myBall.updatePosition(mode);
    myBall.checkEdges();
    myBall.display();
  
}

function Ball() {
  this.position = createVector(width / 2, height / 2);
  this.speed = createVector(0, 0);
  this.r = 10;
  this.acceleration = createVector(0, 0);
  this.ballFill = color(255, 255, 255);
  this.topSpeed = 10; //set the max value of speed

  this.updatePosition = function(mode) {


    this.updateAcc(mode);
    this.speed.add(this.acceleration);
    this.speed.limit(this.topSpeed);
    this.position.add(this.speed);

    print('acc: ' + this.acceleration);
  };

  this.checkEdges = function() {
    if (this.position.x < this.r) {
      this.position.x = this.r; //in the window keep x
      this.speed.x = -this.speed.x;
    } else if (this.position.x > width - this.r) {
      this.position.x = width - this.r;
      this.speed.x = -this.speed.x;
    }
    if (this.position.y < this.r) {
      this.position.y = this.r;
      this.speed.y = -this.speed.y;
    } else if (this.position.y > height - this.r) {
      this.position.y = height - this.r;
      this.speed.y = -this.speed.y;
    }
  };

  this.display = function() {
    noStroke();
    fill(this.ballFill);
    ellipseMode(RADIUS);
    ellipse(this.position.x, this.position.y, this.r, this.r);
  };

  this.updateAcc = function(mode) {
    if (mode == 0) {
      this.acceleration = createVector(0, 0.1);
    }
    if (mode == 1) {
      //mouse
      var mouseVector = createVector(mouseX, mouseY);
      var dir = mouseVector.sub(this.position);
      dir.normalize();
      dir.mult(0.5);
      this.acceleration = dir;
    }
  }
}

function mouseDragged() {
  mode = 1;
}

function mouseReleased() {
  mode = 0;
}