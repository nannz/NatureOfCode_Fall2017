//var myBall;
var mode;
var balls = [];
var numOfBall = 5;

function setup() {
  createCanvas(500, 600);
  mode = 0;

  for (var i = 0; i < numOfBall; i++) {
    var myBall = new Ball(random(0, width), height / 2);
    balls[i] = myBall;
  }
  print(balls.length);
}

function draw() {
  background(255);
  //print('mode: ' + mode);
  for (var i = 0; i < numOfBall; i++) {
    balls[i].updatePosition(mode);
    balls[i].checkEdges();
    balls[i].display();
  }
  
  // var currentSpeed = balls[0].getSpeed();
  // print('currentSpeed = '+ currentSpeed);

}

function Ball(_positionX, _positionY) {
  this.position = createVector(_positionX, _positionY);
  this.speed = createVector(0, 0);
  this.r = 10;
  this.acceleration = createVector(0, 0);
  this.ballFill = color(0, 0, 0);
  this.topSpeed = 10; //set the max value of speed

  this.updatePosition = function(mode) {
    this.updateAcc(mode);
    this.speed.add(this.acceleration);
    this.speed.limit(this.topSpeed);
    this.position.add(this.speed);
  };

  this.checkEdges = function() {
    if (this.position.x < this.r) {
      this.updateFill();
      this.position.x = this.r; //in the window keep x
      this.speed.x = -this.speed.x;
    } else if (this.position.x > width - this.r) {
      this.updateFill();
      this.position.x = width - this.r;
      this.speed.x = -this.speed.x;
    }
    if (this.position.y < this.r) {
      this.updateFill();
      this.position.y = this.r;
      this.speed.y = -this.speed.y;
    } else if (this.position.y > height - this.r) {
      this.updateFill();
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

  this.updateFill = function() {
    this.ballFill = color(random(0, 255), random(0, 255), random(0, 255));
  }
  
  this.getSpeed = function(){
    return this.speed;
  }
  
  this.getFriction = function(){
    var c = 0.01;
    var normal = 1;
    var frictionMag = c * normal; //the magnitude is μ * N //滑动摩擦力公式f=μN,μ是摩擦系数,又叫摩擦因数.n为正压力,在水平面上,若没有外力,则一般把物体重力作为n
    
    var friction = this.getSpeed();
    friction.mult(-1);
    friction.normalize();
    friction.multi(frictionMag);
  }
  
  this.applyForce = function(force){
    this.acceleration.add(force);
  }
}

function mouseDragged() {
  mode = 1;
}

function mouseReleased() {
  mode = 0;
}

function mousePressed() {
  var myBall = new Ball(mouseX, mouseY);
  balls.push(myBall);
  numOfBall = numOfBall + 1;
}