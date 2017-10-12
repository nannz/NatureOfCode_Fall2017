"use strict"
var C_GRAVITY = 20;
var particles = [];

function setup() {
  createCanvas(800, 600);
  // particles[0] = new Particle(100, height / 2, 5);
  // particles[0].vel.x = 5;
  // particles[0].vel.y = -1;
  // particles[1] = new Particle(width - 100, height / 2, 15);
  // particles[1].vel.x = -5;
  // particles[0].vel.y = -1;

  for (var i = 0; i < 10; i++) {
    particles[i] = new Particle(random(width), random(height), random(5, 10));
    particles[i].vel = createVector(-5,5);
  }
}

function draw() {
  background(0);

  for (var a = 0; a < particles.length; a++) {
    for (var b = 0; b < particles.length; b++) {
      if (a != b) {
        particles[a].checkCollision(particles[b]);
      }
    }
    
    //friction or resistance here will be naturaler
    
    
    particles[a].update();
    particles[a].checkEdges();
    particles[a].display();
  }
}