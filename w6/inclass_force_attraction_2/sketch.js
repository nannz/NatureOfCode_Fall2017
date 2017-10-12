"use strict"
var C_GRAVITY = 20;
var particles = [];

function setup() {
  createCanvas(800, 600);

  for (var i = 0; i < 10; i++) {
    particles[i] = new Particle(random(width), random(height), random(5, 10));
  }
}

function draw() {
  background(0);

  for (var a = 0; a < particles.length; a++) {
    for (var b = 0; b < particles.length; b++) {
      if (a != b) {
        particles[a].applyAttraction(particles[b]);
      }
    }
    particles[a].update();
    particles[a].checkEdges();
    particles[a].display();
  }
}