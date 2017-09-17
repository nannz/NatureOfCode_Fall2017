//他很卡！！！



var balls = [];
var numOfBall = 10;
var gravity;
var mode;

function setup() {
  createCanvas(500, 600);
  gravity = createVector(0, 0.1);
  for (var i = 0; i < numOfBall; i++) {
    var myBall = new Ball(random(0, width), height / 2);
    balls[i] = myBall;
  }
}

function draw() {
  background(255);

  for (var i = 0; i < numOfBall; i++) {
    balls[i].applyForce(gravity);
    balls[i].updatePosition();
    balls[i].checkEdges();
    balls[i].display();
  }

}

function Ball(_positionX, _positionY) {
  this.position = createVector(_positionX, _positionY);
  this.speed = createVector(0, 0);
  this.r = random(5.0,10.0);
  this.acceleration = createVector(0, 0);
  this.ballFill = color(0, 0, 0);
  this.topSpeed = 10; //set the max value of speed

  //this.mass =map(this.r,5.0,10.0,1.0,1.0);//质量 rda mda
  
  
  this.applyForce = function(force) {
    
    //force.div(this.mass);
    //print(force.mag());
    this.acceleration.add(force);
    print(this.acceleration.mag());
  }
  
  this.updatePosition = function() {
    this.speed.add(this.acceleration);
    this.speed.limit(this.topSpeed);
    this.position.add(this.speed);
    this.acceleration.mult(0);
  }

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

  this.updateFill = function() {
    this.ballFill = color(random(0, 255), random(0, 255), random(0, 255));
  }

  this.getPosition = function() {
    return this.position;
  }
}

