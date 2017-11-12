function setup() {
  createCanvas(600, 600);
  background(0);
  noStroke();
}

function draw() {
  //background(0);
  // translate(width / 2, height / 2);
  //rotate(frameCount * 0.01);

  //for (var angle = 0; angle < 360; angle += 72) {//apply this forloop will make the gradient fill clearer.
    push();
    translate(width/2, height/2);
    
    //rotate((radians(angle)+frameCount)*0.01);
    rotate(frameCount * 0.01);
    
    var freq, amp;
    freq = frameCount * 0.01;
    amp = 200;
    //sinVal = sin(freq)*amp;
    sinVal = noise(freq) * amp;

    var freq = frameCount * 0.015;
    //var amp = 100;
    var amp = sinVal; //frameCount * 0.1;
    var distance = sin(freq) * amp; //100;

    //drawLine for the gradient fill of the shape.
    stroke(255, 10);
    line(0, 0, distance, 0);
    ellipse(distance, 0, 1, 1);
    pop();
  //}
}