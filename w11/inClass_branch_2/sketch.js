//branch//
var c = 0;

function setup() {
  createCanvas(500, 600);
  background(255);
  translate(width / 2, height);
  stroke(0);
  branch(200);
  print(c);
}

function draw() {
  noLoop();

}

function branch(len) {
  var angle = PI / 6;
  var sw = map(len, 200, 0, 20, 0); //strokeWeight
  strokeWeight(sw);
  line(0, 0, 0, -len);


  translate(0, -len);
  if (len > 10) {
    push()
    rotate(angle);
    branch(len / 2);
    pop();

    push();
    rotate(-angle);
    branch(len / 2);
    pop();
  }


  c += 1;
}