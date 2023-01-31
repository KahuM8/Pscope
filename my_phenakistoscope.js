const SLICE_COUNT = 15;
let size = 0.2;

function setup_pScope(pScope) {
  pScope.output_mode(ANIMATED_FRAME);
  pScope.scale_for_screen(true);
  pScope.draw_layer_boundaries(true);
  pScope.set_direction(CCW);
  pScope.set_slice_count(SLICE_COUNT);
  pScope.load_image("ash", "png");
  pScope.load_image("dusc", "png");
  pScope.load_image("pokeBall", "png");
}

function setup_layers(pScope) {

  new PLayer(null, 150);  //lets us draw the whole circle background, ignoring the boundaries

  //draw an elipse under duscul




  var ashLayer = new PLayer(ash);
  ashLayer.mode(RING);
  ashLayer.set_boundary(0, 0);


  var duscLayer = new PLayer(dusc);
  duscLayer.mode(RING);
  duscLayer.set_boundary(0, 0);

  var pokeBallLayer = new PLayer(pokeBall);
  pokeBallLayer.mode(SWIRL(1));
  pokeBallLayer.set_boundary(420, 750);

}

function squares(x, y, animation, pScope) {

  // this is how you set up a background for a specific layer
  let angleOffset = (360 / SLICE_COUNT) / 2
  let backgroundArcStart = 270 - angleOffset;
  let backgroundArcEnd = 270 + angleOffset;

  fill(66, 135, 245)
  arc(x, y, 800, 800, backgroundArcStart, backgroundArcEnd); // draws "pizza slice" in the background

  fill(255)
  rect(-10, -300 - animation.wave() * 50, 20, 20) // .wave is a cosine wave btw

}

function ash(x, y, animation, pScope) {
  scale(0.2);
  pScope.draw_image("ash", x, y - 2000 - animation.wave() * 15);

}

function dusc(x, y, animation, pScope) {

  scale(size);

  if (animation.frame < .8) {
    size = size - 0.005;
  }
  if (size <= 0) {
    size = 0.2;
  }
  pScope.draw_image("dusc", x + animation.wave() * 100, y - 4000 *);
}

function pokeBall(x, y, animation, pScope) {
  scale(0.2);
  pScope.draw_image("pokeBall", x - animation.frame * 200, y);
}


function edgeWave(x, y, animation, pScope) {


}