var stage;
var container;
var planet;
var planetRadius = 100;
var crust;
var clouds;
var selectedArea;
var plusKey = false;
var minusKey = false;
var upKey = false;
var downKey = false;
var leftKey = false;
var rightKey = false;
var shiftKey = false;
var selectUpKey = false;
var selectDownKey = false;
var selectLeftKey = false;
var selectRightKey = false;

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
    container.addChild(planet);

    generateTerrain();
    addClouds();
    addSelector();

    stage.update();

    createjs.Ticker.framerate = 60;
    createjs.Ticker.on("tick", function (e) {
        update(e);
    });

}

function generateTerrain() {
    var mountainFreq = 10;//gets less likely the higher this gets
    var mountainHeight = 30;
    var points = 20;
    crust = new createjs.Shape();
    crust.graphics.beginFill("gray");
    for (var i = 0; i < points; i++) {
        var offset = 50;
        var variance = 30;
        var finalOffset = offset + (Math.random() * variance);
        if ((Math.random() * mountainFreq) <= 1)
            finalOffset += mountainHeight * (Math.random() * 2);
        var x = planet.x + (planetRadius + finalOffset) * Math.sin(toRadians((360 / points) * i));
        var y = planet.y + (planetRadius + finalOffset) * Math.cos(toRadians((360 / points) * i));
        crust.graphics.lineTo(x, y);
    }
    crust.graphics.closePath();
    container.addChild(crust);
}

function addClouds() {
    clouds = new createjs.Shape();
    clouds.graphics.beginFill("white").drawCircle(0, 0, planetRadius + 150);
    clouds.alpha = .5;
    clouds.x = window.innerWidth / 2;
    clouds.y = window.innerHeight / 2;
    var blurFilter = new createjs.BlurFilter(50, 50, 1);
    clouds.filters = [blurFilter];
    var bounds = blurFilter.getBounds();
    clouds.cache(-200 + bounds.x, -200 + bounds.y, 400 + bounds.width, 400 + bounds.height);
    container.addChild(clouds);
}
function addSelector() {
    selectedArea = new createjs.Shape();
    selectedArea.graphics.beginFill("red").drawCircle(0, 0, 30);
    selectedArea.alpha = .2;
    selectedArea.x = window.innerWidth / 2;
    selectedArea.y = window.innerHeight / 2;
    container.addChild(selectedArea);
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

        container.regX = selectedArea.x;
        container.regY = selectedArea.y;

        if (plusKey && container.scaleX < 20) {
            container.scaleX += .03 + (container.scaleX / 20);
            container.scaleY += .03 + (container.scaleY / 20);
        }
        if (minusKey && container.scaleX > .6) {
            container.scaleX += -.03 - (container.scaleX / 20);
            container.scaleY += -.03 - (container.scaleY / 20);
        }
        var movement = shiftKey ? 2 : 1;
        for (var i = 0; i < movement; i++) {
            if (downKey) {
                container.y += -5 - (container.scaleX / 5);
            }
            else if (upKey)
                container.y += 5 + (container.scaleX / 5);
            if (rightKey)
                container.x += -5 - (container.scaleX / 5);
            else if (leftKey)
                container.x += 5 + (container.scaleX / 5);
            if (selectUpKey)
                selectedArea.y -= 5;
            else if (selectDownKey)
                selectedArea.y += 5;
            if (selectLeftKey)
                selectedArea.x -= 5;
            else if (selectRightKey)
                selectedArea.x += 5;
        }
        clouds.alpha = .5;
        selectedArea.alpha = .2;
        if (container.scaleX > 3.5) {
            clouds.alpha -= (container.scaleX / 20);
            selectedArea.alpha -= (container.scaleX / 30);
        }
        stage.update();
    }
}

window.onkeyup = function (e) {
    var key = e.keyCode ? e.keyCode : e.which;

    switch (key) {
        case (72):
            container.scaleX = 1;
            container.scaleY = 1;
            container.x = container.regX;
            container.y = container.regY;
            break;
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
        case (16):
            shiftKey = false;
            break;
        case (38):
            selectUpKey = false;
            break;
        case (40):
            selectDownKey = false;
            break;
        case (37):
            selectLeftKey = false;
            break;
        case (39):
            selectRightKey = false;
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
        case (16):
            shiftKey = true;
            break;
        case (38):
            selectUpKey = true;
            break;
        case (40):
            selectDownKey = true;
            break;
        case (37):
            selectLeftKey = true;
            break;
        case (39):
            selectRightKey = true;
            break;
    }
}
function zoomIn() {
    scale += .5;
}
function zoomOut() {
    scale -= .5;
}