var stage;
var container;
var planet;
var planetRadius = 100;
var plusKey = false;
var minusKey = false;
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
    container = new createjs.Container();
    container.regX = window.innerWidth / 2;
    container.regY = window.innerHeight / 2;
    container.x = window.innerWidth / 2;
    container.y = window.innerHeight / 2;

    stage.addChild(container);
    planet = new createjs.Shape();
    planet.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, planetRadius);
    planet.x = window.innerWidth / 2;
    planet.y = window.innerHeight / 2;
    planetX = planet.x;
    planetY = planet.y;
    container.addChild(planet);
    generateTerrain();
    stage.update();

    createjs.Ticker.framerate = 60;
    createjs.Ticker.on("tick", function (e) {
        update(e);
    });

}

function generateTerrain() {
    var points = 10;

    for (var i = 0; i < points; i++) {
        var offset = 50;
        var x = planet.x + (planetRadius + offset) * Math.sin(toRadians((360 / points) * i));
        var y = planet.y + (planetRadius + offset) * Math.cos(toRadians((360 / points) * i));
        var circle = new createjs.Shape();
        circle.graphics.beginFill("red").drawCircle(0, 0, 5);
        circle.x = x;
        circle.y = y;
        container.addChild(circle);
    }
}

function toRadians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
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
        // if (container.scaleX > scale + .03)
        //     container.scaleX -= .03;
        // else if (container.scaleX < scale - .03)
        //     container.scaleX += .03;

        // if (container.scaleY > scale + .03)
        //     container.scaleY -= .03;
        // else if (container.scaleY < scale - .03)
        //     container.scaleY += .03;

        if (plusKey && container.scaleX < 10) {
            container.scaleX += .03 + (container.scaleX / 20);
            container.scaleY += .03 + (container.scaleY / 20);
        }
        if (minusKey && container.scaleX > .6) {
            container.scaleX += -.03 - (container.scaleX / 20);
            container.scaleY += -.03 - (container.scaleY / 20);
        }
        if (upKey)
            container.y += -5 - (container.scaleX / 5);
        else if (downKey)
            container.y += 5 + (container.scaleX / 5);
        if (leftKey)
            container.x += -5 - (container.scaleX / 5);
        else if (rightKey)
            container.x += 5 + (container.scaleX / 5);
        stage.update();
    }
}

window.onkeyup = function (e) {
    var key = e.keyCode ? e.keyCode : e.which;

    switch (key) {
        case (32):
            debug();
            break;
        case (187):
            plusKey = false;
            break;
        case (189):
            minusKey = false;
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
        case (187):
            plusKey = true;
            break;
        case (189):
            minusKey = true;
            break;
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
}
function zoomOut() {
    scale -= .5;
}