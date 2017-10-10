var stage;
var planet;
var scale = 1;
var upKey = false;
var downKey = false;
var leftKey = false;
var rightKey = false;

function debug() {
    debugger;
}

function init() {
    var canvas = document.getElementsByTagName('canvas')[0];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', resize, false);

    stage = new createjs.Stage("canvas");

    planet = new createjs.Shape();
    planet.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 100);
    planet.x = window.innerWidth / 2;
    planet.y = window.innerHeight / 2;
    planetX = planet.x;
    planetY = planet.y;
    stage.addChild(planet);

    stage.update();

    createjs.Ticker.framerate = 60;
    createjs.Ticker.on("tick", function (e) {
        update(e);
    });

}

function resize() {
    var canvas = document.getElementsByTagName('canvas')[0];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function update(e) {
    //run everything in here!
    if (!e.paused) {
        // Actions carried out when the Ticker is not paused
        if (planet.scaleX > scale + .03)
            planet.scaleX -= .03;
        else if (planet.scaleX < scale - .03)
            planet.scaleX += .03;

        if (planet.scaleY > scale + .03)
            planet.scaleY -= .03;
        else if (planet.scaleY < scale - .03)
            planet.scaleY += .03;
        
        if(upKey)
            planet.y -= 5;
        else if(downKey)
            planet.y += 5;
        if(leftKey)
            planet.x -= 5;
        else if(rightKey)
            planet.x += 5;
        stage.update();
    }
}

window.onkeyup = function (e) {
    var key = e.keyCode ? e.keyCode : e.which;

    switch (key) {
        case (187):
            zoomIn();
            break;
        case (189):
            zoomOut();
            break;
        case (87):
            upKey = false;
            break;
        case (83):
            downKey = false;
            break;
        case (65):
            leftKey = false;
            break;
        case (68):
            rightKey = false;
            break;
    }
}
window.onkeydown = function (e) {
    var key = e.keyCode ? e.keyCode : e.which;

    switch (key) {
        case (87):
            upKey = true;
            break;
        case (83):
            downKey = true;
            break;
        case (65):
            leftKey = true;
            break;
        case (68):
            rightKey = true;
            break;
    }
}
function zoomIn() {
    scale += .5;
    stage.update();
}
function zoomOut() {
    if (scale > 1) {
        scale -= .5;
        stage.update();
    }
}