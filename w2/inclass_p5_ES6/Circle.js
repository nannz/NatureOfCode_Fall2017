class Circle{
  constructor(_x,_y){
    this.position = createVector(_positionX, _positionY);
    this.speed = createVector(0, 0);
    this.acceleration = createVector(random(-5,5), random(-5,5));
    this.ballFill = color(0, 0, 0,100);
  }
  
  update(){
    speed.add(acceleration);
    speed.limit()
  }
}