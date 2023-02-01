const SLICE_COUNT = 15;
let size = 0.2;

//noise variables
let noiseScale = 0.1;
let noiseStrength = 0.8;
let noiseChange = 2;

let bacgroundC = 100;
let cChange = 0.2;


function setup_pScope(pScope) {
  pScope.output_mode(ANIMATED_DISK);
  pScope.scale_for_screen(true);
  pScope.draw_layer_boundaries(true);
  pScope.set_direction(CCW);
  pScope.set_slice_count(SLICE_COUNT);
  pScope.load_image("ash", "png");
  pScope.load_image("dusc", "png");
  pScope.load_image("pokeBall", "png");
}

function setup_layers(pScope) {
   

  new PLayer(null, 100);  //lets us draw the whole circle background, ignoring the boundaries
  



    var  sliceLayer = new PLayer(slice);
    

    var edgeWaveLayer = new PLayer(edgeWave);
    edgeWaveLayer.mode(RING);


   



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

  pScope.draw_image("dusc", x + animation.wave() * 100, y - 4000);
}

function pokeBall(x, y, animation, pScope) {
  scale(0.2);
  pScope.draw_image("pokeBall", x - animation.frame * 200, y);
}


function edgeWave(x, y, animation, pScope) {

//make 100 lines with perlin noise for the length of the noise
    stroke(40);
    strokeWeight(4);
    for (let i = 0; i < 500; i++) {
        let noiseVal = noise(i * noiseScale, animation.frame * noiseChange);
        let lineLength = noiseVal * noiseStrength;
        rotate(2);
        line(x + i , -1000, x + i, -1000 + lineLength *400);
    }



}

function slice(x, y, animation, pScope){
    //make an ark that covers the entire slice
    bacgroundC += cChange;
    fill(bacgroundC);
    if(bacgroundC > 110 || bacgroundC < 90){
        cChange *= -1;
    }
   


    let angleOffset = (360 / SLICE_COUNT) / 2
    let backgroundArcStart = 270 - angleOffset;
    let backgroundArcEnd = 270 + angleOffset;
    arc(x, y, 2000, 2000, backgroundArcStart, backgroundArcEnd); // draws "pizza slice" in the background

}