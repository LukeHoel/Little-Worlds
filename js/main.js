var stage;
var planet;
function init() {
    var canvas = document.getElementsByTagName('canvas')[0];
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', resize, false);    

    stage = new createjs.Stage("canvas");

    planet = new createjs.Shape();
    planet.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 100);
    planet.x = window.innerWidth/2;
    planet.y = window.innerHeight/2;
    stage.addChild(planet);

    stage.update();

    createjs.Ticker.framerate = 60;
    createjs.Ticker.on("tick", function (e) {
        update(e);
    });

}

function update(e) {
    //run everything in here!
    if (!e.paused) {
        // Actions carried out when the Ticker is not paused
        stage.update();
    }
}

function resize(){
    var canvas = document.getElementsByTagName('canvas')[0];
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
}

function zoomIn(){
    stage.scaleX += .1;
    stage.scaleY += .1;
}
function zoomOut(){
    stage.scaleX += .1;
    stage.scaleY += .1;
}