const SLICE_COUNT = 15;


//noise variables
let noiseScale = 100;
let noiseStrength = 0.8;
let noiseChange = 2;

let bacgroundC = 100;
let cChange = 0.05;

let scaleChange = 0.1;
let ballScale = 0.1;

//scaryface scale
let scaryFaceScale = 0.1;
let scaryFaceScaleChange = 0.1;

//smoke variables
let particles = [];


//play this music while you watch the animation for full emersion\\
//***************************************************************\\
// https://www.youtube.com/watch?v=VxFadPqMbfM&ab_channel=Pokeli
//***************************************************************\\

function setup_pScope(pScope) {
  pScope.output_mode(ANIMATED_DISK);
  pScope.scale_for_screen(true);
  pScope.draw_layer_boundaries(false);
  pScope.set_direction(CCW);
  pScope.set_slice_count(SLICE_COUNT);
  pScope.load_image("ash", "png");
  pScope.load_image("dusc", "png");
  pScope.load_image("pokeBall", "png");
  pScope.load_image_sequence("ash", "png", 6);
  pScope.load_image("spooky", "png");
  pScope.load_image("bBall", "png");
}

function setup_layers(pScope) {


  new PLayer(null, 90);  //lets us draw the whole circle background, ignoring the boundaries
  var edgeWaveLayer = new PLayer(edgeWave);
  edgeWaveLayer.mode(RING);
  var smokeLayer = new PLayer(smoke);
  smokeLayer.mode(RING);
  smokeLayer.set_boundary(200, 200)
  var scaryFaceLayer = new PLayer(scaryFace);
  scaryFaceLayer.mode(SWIRL(2));
  scaryFaceLayer.set_boundary(800, 500);
  var Bball = new PLayer(bBall);
  Bball.mode(RING);
  var ashLayer = new PLayer(ash);
  ashLayer.mode(RING);
  ashLayer.set_boundary(0, 0);
  var duscLayer = new PLayer(dusc);
  duscLayer.mode(RING);
  duscLayer.set_boundary(0, 0);
  var pokeBallLayer = new PLayer(pokeBall);
  pokeBallLayer.mode(SWIRL(1));
  pokeBallLayer.set_boundary(500, 750);
}

function ash(x, y, animation, pScope) {
  pScope.draw_image_from_sequence("ash", x - 25, y - 450 - animation.wave() * 15, animation.frame);
}

function dusc(x, y, animation, pScope) {

  pScope.draw_image("dusc", x + animation.wave() * 20, y - 800);
}

function pokeBall(x, y, animation, pScope) {
  scale(ballScale + scaleChange * animation.frame);
  pScope.draw_image("pokeBall", x, y);
}


function edgeWave(x, y, animation, pScope) {
  stroke(30);
  strokeWeight(2);
  for (let i = 0; i < 400; i++) {
    let noiseVal = noise(i * noiseScale, animation.frame * noiseChange);
    let lineLength = noiseVal * noiseStrength;
    rotate(1);
    line(x + i / 2, -1000, x, -1000 + lineLength * 300);
  }
}




//function that draws a pokeball in the center of the screen
function bBall(x, y, animation, pScope) {
  pScope.draw_image("bBall", x, y);
}


//spooky layer
function scaryFace(x, y, animation, pScope) {
  scale(0.1 - scaryFaceScaleChange * animation.frame);
  pScope.draw_image("spooky", x - animation.wave() * 100, y);
}

//smoke layer
class Particle {
  constructor() {
    this.x = 0 + random(0, 50);
    this.y = 0;
    this.vx = random(-0.5, 0.5);
    this.vy = random(-1, -0.2);
    this.alpha = 255;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= random(0, 2);
  }
}


/**
 * sorry about the gross code lol
 */
function smoke(x, y, animation, pScope) {
  noStroke();
  if (particles.length < 200) {
    let p = new Particle();
    particles.push(p);
  }
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    fill(48, 36, 59, particles[i].alpha);
    ellipse(x + particles[i].x - 150, y + particles[i].y - 150, random(12, 20), random(12, 20));
    if (particles[i].alpha <= 0) {
      particles.splice(i, 1);
    }
  }
}