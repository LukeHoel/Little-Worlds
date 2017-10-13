var stage;
var container;
var planet;
var planetRadius = 500;
var water;
var water2;
var ground;
var crust;
var clouds;
var grassLayer;
var rockLayer;
var groundColor;

var colors = [];
var colorCount = 4;

var landSegments = [];
var foliageContainer;
var foliageInfo = [];
var treeContainer;
var treeInfo = [];
var foliageOpacity = 0;

var minimumPlants = 40;
var plantTimer = 60 * 20;
var timer = plantTimer;

var peopleContainer;
var peopleInfo = [];

var houseContainer;
var houseInfo = [];

var starContainer;

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
var rotateLeftKey = false;
var rotateRightKey = false;
function debug() {
    debugger;
}

function init() {
    var canvas = document.getElementsByTagName('canvas')[0];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', resize, false);

    for (var i = 0; i < colorCount; i++) {
        colors.push(randomColor());
    }

    stage = new createjs.Stage("canvas");
    starStage = new createjs.Stage("canvas");
    container = new createjs.Container();
    foliageContainer = new createjs.Container;
    treeContainer = new createjs.Container;
    peopleContainer = new createjs.Container;
    houseContainer = new createjs.Container;
    starContainer = new createjs.Container;
    container.regX = window.innerWidth / 2;
    container.regY = window.innerHeight / 2;
    container.x = window.innerWidth / 2;
    container.y = window.innerHeight / 2;

    container.addChild(treeContainer);
    container.addChild(houseContainer);
    container.addChild(peopleContainer);
    container.addChild(foliageContainer);

    stage.addChild(container);
    planet = new createjs.Shape();
    planet.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, planetRadius);
    planet.x = window.innerWidth / 2;
    planet.y = window.innerHeight / 2;
    container.addChild(planet);
    addWater();
    generateTerrain();
    placeFoliage();
    placePeople();
    addClouds();

    //addDecorLayers();

    //container.rotation = Math.random() * 180;
    if (!isSmallScreen()) {
        container.scaleX = .3;
        container.scaleY = .3;
    } else {
        container.scaleX = .2;
        container.scaleY = .2;
    }
    //container.setChildIndex(foliageContainer, container.numChildren - 1)
    foliageContainer.alpha = 0;
    treeContainer.alpha = 0;
    peopleContainer.alpha = 0;
    houseContainer.alpha = 0;
    // ground.graphics.clear();
    // planet.graphics.clear();

    stage.update();

    createjs.Ticker.framerate = 60;
    createjs.Ticker.on("tick", function (e) {
        update(e);
    });

}

function addWater() {
    // water = new createjs.Shape();
    // water.graphics.beginFill("blue").drawCircle(0, 0, planetRadius + 50);
    // water.alpha = .5;
    // water.x = window.innerWidth / 2;
    // water.y = window.innerHeight / 2;
    // container.addChild(water);
    var waterColor = randomColor();
    water = new createjs.Shape();
    water.graphics.beginFill(waterColor);
    water.alpha = .5;
    water.x = window.innerWidth / 2;
    water.y = window.innerHeight / 2;
    water2 = new createjs.Shape();
    water2.graphics.beginFill(waterColor);
    water2.alpha = .5;
    water2.x = window.innerWidth / 2;
    water2.y = window.innerHeight / 2;
    var points = 10;
    for (var i = 0; i < points; i++) {
        var x = (planetRadius + 50) * Math.sin(toRadians((360 / points) * i));
        var y = (planetRadius + 50) * Math.cos(toRadians((360 / points) * i));
        water.graphics.lineTo(x, y);
        water2.graphics.lineTo(x, y);
    }
    water.rotation = 45;
    water2.scale = 1.03;
    container.addChild(water2);
    container.addChild(water);

    createjs.Tween.get(water, { loop: true }).to({ scale: 1.03 }, 2000).to({ scale: 1 }, 2000);
    createjs.Tween.get(water2, { loop: true }).to({ scale: 1 }, 2000).to({ scale: 1.03 }, 2000);
}

function placeFoliage() {
    var foliageCount = 2;
    for (var i = 0; i < landSegments.length - 1; i++) {
        for (var o = 0; o < foliageCount; o++) {
            //var m = (landSegments[i].y - landSegments[i + 1].y) / (landSegments[i].x - landSegments[i + 1].x);
            var bush = new createjs.Shape();
            var num = Math.random();
            bush.graphics.beginFill(colors[getRandomInt(0, colorCount)]);
            var num = Math.random();
            num *= .6;
            num += .2;
            var x = (landSegments[i].x * (1 - num) + num * landSegments[i + 1].x);
            var y = (landSegments[i].y * (1 - num) + landSegments[i + 1].y * num);
            if (landSegments[i].isOcean == false) {


                bush.x = x;
                bush.y = y;
                switch (getRandomInt(0, 5)) {
                    case (0):
                        bush.graphics.drawCircle(-2, 0, 3);
                        bush.graphics.drawCircle(2, 0, 3);
                        bush.graphics.drawCircle(0, 2.5, 3);
                        bush.resource = "food";
                        bush.amount = 1;
                        foliageContainer.addChild(bush);
                        foliageInfo.push({ type: "food", amount: 1, section: i, index: num, x: x, y: y });
                        break;
                    case (1):
                        bush.graphics.drawCircle(-3, 1, 5);
                        bush.graphics.drawCircle(2, 1, 5);
                        bush.graphics.drawCircle(0, 4, 5);
                        bush.resource = "food";
                        bush.amount = 3;
                        foliageContainer.addChild(bush);
                        foliageInfo.push({ type: "food", amount: 2, section: i, index: num, x: x, y: y });

                        break;
                    case (2):
                        bush.graphics.beginFill(colors[0]);
                        bush.graphics.drawRect(-7, -9, 5, 15);
                        bush.graphics.beginFill(colors[1]);
                        bush.graphics.moveTo(-12, 5);
                        bush.graphics.lineTo(-5, 30);
                        bush.graphics.lineTo(4, 5);
                        bush.graphics.closePath();
                        treeContainer.addChild(bush);
                        treeInfo.push({ type: "wood", amount: 3, section: i, index: num, x: x, y: y });
                        break;
                    case (3):
                        bush.graphics.beginFill(colors[2]);
                        bush.graphics.drawRect(-11, -7, 9, 18);
                        bush.graphics.beginFill(colors[3]);
                        bush.graphics.moveTo(-17, 10);
                        bush.graphics.lineTo(-6, 50);
                        bush.graphics.lineTo(4, 10);
                        bush.graphics.closePath();
                        treeContainer.addChild(bush);
                        treeInfo.push({ type: "wood", amount: 5, section: i, index: num, x: x, y: y });
                        break;
                }

                bush.rotation = Math.atan2(landSegments[i + 1].y - landSegments[i].y, landSegments[i + 1].x - landSegments[i].x) * 180 / Math.PI;
            }
        }
    }
}

function placeTreesOnly() {
    var foliageCount = 1;
    for (var i = 0; i < landSegments.length - 1; i++) {
        for (var o = 0; o < foliageCount; o++) {
            //var m = (landSegments[i].y - landSegments[i + 1].y) / (landSegments[i].x - landSegments[i + 1].x);
            var bush = new createjs.Shape();
            var num = Math.random();
            bush.graphics.beginFill(colors[getRandomInt(0, colorCount)]);
            var num = Math.random();
            num *= .6;
            num += .2;
            var x = (landSegments[i].x * (1 - num) + num * landSegments[i + 1].x);
            var y = (landSegments[i].y * (1 - num) + landSegments[i + 1].y * num);
            if (landSegments[i].isOcean == false) {


                bush.x = x;
                bush.y = y;
                switch (getRandomInt(0, 2)) {
                    case (0):
                        bush.graphics.beginFill(colors[0]);
                        bush.graphics.drawRect(-7, -9, 5, 15);
                        bush.graphics.beginFill(colors[1]);
                        bush.graphics.moveTo(-12, 5);
                        bush.graphics.lineTo(-5, 30);
                        bush.graphics.lineTo(4, 5);
                        bush.graphics.closePath();
                        treeContainer.addChild(bush);
                        treeInfo.push({ type: "wood", amount: 3, section: i, index: num, x: x, y: y });
                        break;
                    case (1):
                        bush.graphics.beginFill(colors[2]);
                        bush.graphics.drawRect(-11, -7, 9, 18);
                        bush.graphics.beginFill(colors[3]);
                        bush.graphics.moveTo(-17, 10);
                        bush.graphics.lineTo(-6, 50);
                        bush.graphics.lineTo(4, 10);
                        bush.graphics.closePath();
                        treeContainer.addChild(bush);
                        treeInfo.push({ type: "wood", amount: 5, section: i, index: num, x: x, y: y });
                        break;
                }

                bush.rotation = Math.atan2(landSegments[i + 1].y - landSegments[i].y, landSegments[i + 1].x - landSegments[i].x) * 180 / Math.PI;
            }
        }
    }
}

function placeBushesOnly() {
    var foliageCount = 1;
    for (var i = 0; i < landSegments.length - 1; i++) {
        for (var o = 0; o < foliageCount; o++) {
            //var m = (landSegments[i].y - landSegments[i + 1].y) / (landSegments[i].x - landSegments[i + 1].x);
            var bush = new createjs.Shape();
            var num = Math.random();
            bush.graphics.beginFill(colors[getRandomInt(0, colorCount)]);
            var num = Math.random();
            num *= .6;
            num += .2;
            var x = (landSegments[i].x * (1 - num) + num * landSegments[i + 1].x);
            var y = (landSegments[i].y * (1 - num) + landSegments[i + 1].y * num);
            if (landSegments[i].isOcean == false) {


                bush.x = x;
                bush.y = y;
                switch (getRandomInt(0, 2)) {
                    case (0):
                        bush.graphics.drawCircle(-2, 0, 3);
                        bush.graphics.drawCircle(2, 0, 3);
                        bush.graphics.drawCircle(0, 2.5, 3);
                        bush.resource = "food";
                        bush.amount = 1;
                        foliageContainer.addChild(bush);
                        foliageInfo.push({ type: "food", amount: 1, section: i, index: num, x: x, y: y });
                        break;
                    case (1):
                        bush.graphics.drawCircle(-3, 1, 5);
                        bush.graphics.drawCircle(2, 1, 5);
                        bush.graphics.drawCircle(0, 4, 5);
                        bush.resource = "food";
                        bush.amount = 3;
                        foliageContainer.addChild(bush);
                        foliageInfo.push({ type: "food", amount: 2, section: i, index: num, x: x, y: y });

                        break;
                }

                bush.rotation = Math.atan2(landSegments[i + 1].y - landSegments[i].y, landSegments[i + 1].x - landSegments[i].x) * 180 / Math.PI;
            }
        }
    }
}

function placePeople() {
    var peopleCount = 1;
    var chance = 5;
    var color = randomColor();

    for (var i = 0; i < landSegments.length - 1; i++) {
        for (var o = 0; o < peopleCount; o++) {

            var person = new createjs.Shape();
            var num = Math.random();
            person.graphics.beginFill(color);
            var num = Math.random();
            var x = (landSegments[i].x * (1 - num) + num * landSegments[i + 1].x);
            var y = (landSegments[i].y * (1 - num) + landSegments[i + 1].y * num);

            if (landSegments[i].isOcean == false && getRandomInt(0, chance) == 0) {
                person.x = x;
                person.y = y;
                person.graphics.drawRect(0, 0, 2, 8);
                person.graphics.drawCircle(1, 8, 3);
                peopleInfo.push({ section: i, percent: .1, food: 2, wood: 0 });
                peopleContainer.addChild(person);

                person.rotation = (Math.atan2(landSegments[i + 1].y - landSegments[i].y, landSegments[i + 1].x - landSegments[i].x) * 180 / Math.PI);
            }
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function generateTerrain() {
    var totalMountains = 0;
    var totalOceans = 0;
    var mountainFreq = 10;//gets less likely the higher this gets
    var mountainHeight = 50;
    var oceanFreq = 10;
    var oceanWidth = 3;
    var oceanDepth = 60;
    var oceanCounter = 0;//oceans can be multiple sides wide, so we need a counter
    var points = 100;
    crust = new createjs.Shape();
    ground = new createjs.Shape();
    //ground.graphics.beginFill("#705239");
    groundColor = randomColor();
    ground.graphics.beginFill(groundColor);
    for (var i = 0; i < points; i++) {
        var offset = 70;
        var variance = 30;
        var finalOffset = offset + (Math.random() * variance);
        if ((Math.random() * oceanFreq) <= 1 && oceanCounter <= 0) {
            oceanCounter = oceanWidth;
        }
        else if ((Math.random() * mountainFreq) <= 1) {
            finalOffset += mountainHeight * (Math.random() * 2);
            totalMountains++;
        }
        var isOcean = false;
        //applies an ocean if needed
        if (oceanCounter > 0) {
            finalOffset -= oceanDepth;
            oceanCounter--;
            totalOceans++;
            isOcean = true;
        }
        var x = planet.x + (planetRadius + finalOffset) * Math.sin(toRadians((360 / points) * i));
        var y = planet.y + (planetRadius + finalOffset) * Math.cos(toRadians((360 / points) * i));
        ground.graphics.lineTo(x, y);
        landSegments.push({ x: x, y: y, isOcean: isOcean });
    }

    ground.graphics.closePath();
    container.addChild(ground);

    crust.graphics.closePath();
    container.addChild(crust);
}

function addClouds() {
    clouds = new createjs.Shape();
    clouds.graphics.beginFill(groundColor).drawCircle(0, 0, planetRadius + 300);
    clouds.alpha = .3;
    clouds.x = window.innerWidth / 2;
    clouds.y = window.innerHeight / 2;
    var blurFilter = new createjs.BlurFilter(250, 250, 1);
    clouds.filters = [blurFilter];
    var bounds = blurFilter.getBounds();
    clouds.cache(-750 + bounds.x, -750 + bounds.y, 1500 + bounds.width, 1500 + bounds.height);
    createjs.Tween.get(clouds, { loop: true }).to({ scale: .9 }, 5000).to({ scale: 1 }, 5000);
    container.addChild(clouds);
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

        if (plusKey && container.scaleX < 20) {

            var holder = container.rotation;
            container.rotation = 0;
            var pointbefore = getCenter();
            container.scaleX += .03 + (container.scaleX / 20);
            container.scaleY += .03 + (container.scaleY / 20);
            stage.update();
            var pointafter = getCenter();

            var pointdiffX = pointafter.x - pointbefore.x;
            var pointdiffY = pointafter.y - pointbefore.y;
            container.x += (pointdiffX * container.scaleX);
            container.y += (pointdiffY * container.scaleY);
            stage.update();
            container.rotation = holder;
        }
        if (minusKey && container.scaleX > .3) {

            var holder = container.rotation;
            container.rotation = 0;

            var pointbefore = getCenter();
            container.scaleX += -.03 - (container.scaleX / 20);
            container.scaleY += -.03 - (container.scaleY / 20);
            stage.update();
            var pointafter = getCenter();

            var pointdiffX = pointafter.x - pointbefore.x;
            var pointdiffY = pointafter.y - pointbefore.y;
            container.x += pointdiffX * container.scaleX;
            container.y += pointdiffY * container.scaleY;
            stage.update();
            container.rotation = holder;
        }

        var movement = shiftKey ? 2 : 1;
        for (var i = 0; i < movement; i++) {
            if (downKey) {
                stage.y += -5 - (container.scaleX / 5);
            }
            else if (upKey) {
                stage.y += 5 + (container.scaleX / 5);
            }
            if (rightKey) {
                stage.x += -5 - (container.scaleX / 5);
            }
            else if (leftKey) {
                stage.x += 5 + (container.scaleX / 5);
            }
        }

        if (!plusKey && !minusKey) {
            if (rotateLeftKey) {
                container.rotation -= 1;
            } else if (rotateRightKey) {
                container.rotation += 1;
            }
        }

        houseContainer.alpha = peopleContainer.alpha = treeContainer.alpha = foliageContainer.alpha = foliageOpacity;
        if (container.scaleX > 1.2) {
            if (foliageOpacity < 1)
                foliageOpacity += .1
        } else {
            if (foliageOpacity > 0)
                foliageOpacity -= .1
        }

        movePeople();
        timer--;
        if (timer <= 0) {
            if (foliageContainer.numChildren < minimumPlants) {
                placeBushesOnly();
            }
            if (treeContainer.numChildren < minimumPlants) {
                placeTreesOnly();
            }
            timer = plantTimer;
        }
        stage.update();
    }
}

function movePeople() {
    for (var i = 0; i < peopleContainer.numChildren; i++) {
        var person = peopleContainer.getChildAt(i);
        var stats = peopleInfo[i];
        var fallSpeed = 1;
        var walkSpeed = 0.03;
        var walkSpeedOcean = 0.01;
        var famished = 3;
        var woodNeeded = 10;

        //directions are as if the person is on the top of the planet
        var action = -1;
        var nothing = -1;
        var walkLeft = 0;
        var walkRight = 1;
        var angleFromCenter = getAngle(person, container);

        stats.food -= 0.001;
        var hasHouse = false;
        var house;
        for (var o = 0; o < houseInfo.length; o++) {
            if (houseInfo[o].person == person) {
                hasHouse = true;
                house = houseInfo[o];
            }
        }

        if (stats.food <= 0) {
            peopleInfo.splice(i, 1);
            peopleContainer.removeChild(peopleContainer.getChildAt(i));
            break;
        }


        if (stats.food < famished && foliageContainer.numChildren > 0) {
            var closest = 0;
            for (var o = 0; o < foliageInfo.length; o++) {
                var bushAngle = getAngle(foliageInfo[o], container);
                var closeAngle = getAngle(foliageInfo[closest], container);
                var dist1 = Math.abs(closeAngle - angleFromCenter);
                var dist2 = Math.abs(bushAngle - angleFromCenter);
                if (dist1 > dist2) {
                    closest = o;
                }
            }
            var closestBush = getAngle(foliageInfo[closest], container);
            if (Math.abs(angleFromCenter - closestBush) > .3) {
                if (angleFromCenter < closestBush)
                    action = walkRight;
                else if (angleFromCenter > closestBush)
                    action = walkLeft;
            } else {
                stats.food += foliageInfo[closest].amount;
                foliageInfo.splice(closest, 1);
                if (foliageContainer.removeChildAt(closest))
                    console.log("yum");
            }
        }
        else if (stats.wood < woodNeeded && treeContainer.numChildren > 0) {
            var closest = 0;
            for (var o = 0; o < treeInfo.length; o++) {
                var bushAngle = getAngle(treeInfo[o], container);
                var closeAngle = getAngle(treeInfo[closest], container);
                var dist1 = Math.abs(closeAngle - angleFromCenter);
                var dist2 = Math.abs(bushAngle - angleFromCenter);
                if (dist1 > dist2) {
                    closest = o;
                }
            }
            var closestBush = getAngle(treeInfo[closest], container);
            if (Math.abs(angleFromCenter - closestBush) > .3) {
                if (angleFromCenter < closestBush)
                    action = walkRight;
                else if (angleFromCenter > closestBush)
                    action = walkLeft;
            } else {
                stats.wood += treeInfo[closest].amount;
                treeInfo.splice(closest, 1);
                if (treeContainer.removeChildAt(closest))
                    console.log("chop");
            }
        } else if (!hasHouse) {
            if (!landSegments[stats.section].isOcean) {
                if (stats.percent < .4)
                    action = walkRight;
                else if (stats.percent > .6)
                    action = walkLeft;
                placeHouse(person, stats);
            }
            else
                action = walkRight;
        } else {
            var houseAngle = getAngle(house, container);
            if (Math.abs(angleFromCenter - houseAngle) > .2) {
                if (angleFromCenter < houseAngle)
                    action = walkRight;
                else if (angleFromCenter > houseAngle)
                    action = walkLeft;
            }
        }



        switch (action) {
            case (walkLeft):

                if (peopleInfo[i].percent < 1) {
                    if (!landSegments[peopleInfo[i].section].isOcean)
                        peopleInfo[i].percent += walkSpeed;
                    else
                        peopleInfo[i].percent += walkSpeedOcean;
                } else {
                    if (peopleInfo[i].section < landSegments.length - 1)
                        peopleInfo[i].section++;
                    else {
                        peopleInfo[i].section = 0;

                        console.log("hit the bottom");
                    }


                    person.x = landSegments[peopleInfo[i].section].x;
                    person.y = landSegments[peopleInfo[i].section].y;
                    peopleInfo[i].percent = 0;
                }
                if (peopleInfo[i].section == landSegments.length - 1) {

                    person.y = lerp(landSegments[peopleInfo[i].section].y, landSegments[0].y, peopleInfo[i].percent);
                    person.x = lerp(landSegments[peopleInfo[i].section].x, landSegments[0].x, peopleInfo[i].percent);
                }
                else {
                    person.y = lerp(landSegments[peopleInfo[i].section].y, landSegments[peopleInfo[i].section + 1].y, peopleInfo[i].percent);
                    person.x = lerp(landSegments[peopleInfo[i].section].x, landSegments[peopleInfo[i].section + 1].x, peopleInfo[i].percent);
                }
                break;
            case (walkRight):

                if (peopleInfo[i].percent > 0) {
                    if (!landSegments[peopleInfo[i].section].isOcean)
                        peopleInfo[i].percent -= walkSpeed;
                    else
                        peopleInfo[i].percent -= walkSpeedOcean;
                } else {
                    if (peopleInfo[i].section > 0)
                        peopleInfo[i].section--;
                    else
                        peopleInfo[i].section = landSegments.length - 1;

                    person.x = landSegments[peopleInfo[i].section].x;
                    person.y = landSegments[peopleInfo[i].section].y;
                    peopleInfo[i].percent = 1;
                }
                if (peopleInfo[i].section == 0) {

                    person.y = lerp(landSegments[0].y, landSegments[1].y, peopleInfo[i].percent);
                    person.x = lerp(landSegments[0].x, landSegments[1].x, peopleInfo[i].percent);
                } else if (peopleInfo[i].section == landSegments.length - 1) {

                    person.y = lerp(landSegments[peopleInfo[i].section].y, landSegments[0].y, peopleInfo[i].percent);
                    person.x = lerp(landSegments[peopleInfo[i].section].x, landSegments[0].x, peopleInfo[i].percent);
                }
                else {

                    person.y = lerp(landSegments[peopleInfo[i].section].y, landSegments[peopleInfo[i].section + 1].y, peopleInfo[i].percent);
                    person.x = lerp(landSegments[peopleInfo[i].section].x, landSegments[peopleInfo[i].section + 1].x, peopleInfo[i].percent);
                }
                break;

        }
        if (peopleInfo[i].section == landSegments.length - 1) {
            person.rotation = Math.atan2(landSegments[0].y - landSegments[peopleInfo[i].section].y, landSegments[0].x - landSegments[peopleInfo[i].section].x) * 180 / Math.PI;
        }
        else {
            person.rotation = Math.atan2(landSegments[peopleInfo[i].section + 1].y - landSegments[peopleInfo[i].section].y, landSegments[peopleInfo[i].section + 1].x - landSegments[peopleInfo[i].section].x) * 180 / Math.PI;
        }


    }
}

function placeHouse(person, stats) {
    var house = new createjs.Shape();
    house.x = person.x;
    house.y = person.y;
    house.rotation = person.rotation;
    house.graphics.beginFill(randomColor());
    house.graphics.moveTo(-5, 15);
    house.graphics.lineTo(1, 20);
    house.graphics.lineTo(7, 15);
    house.graphics.lineTo(0, 5);
    house.graphics.closePath();
    house.graphics.beginFill(randomColor());
    house.graphics.drawRect(-5, -5, 12, 20);
    houseContainer.addChild(house);
    houseInfo.push({ person: person, stats: stats, x: person.x, y: person.y });

}

function isSmallScreen() {
    if (window.innerWidth <= 992)
        return true;
    return false;
}

function getAngle(p1, p2) {

    var angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
    if (angle < 0)
        angle += 360;
    if (angle > 360)
        angle -= 360;
    return angle;
}

// Get the linear interpolation between two value
function lerp(value1, value2, amount) {
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    return value1 + (value2 - value1) * amount;
}

function addDecorLayers() {

    var image = new Image();
    image.src = "../assets/rocklayer.svg"
    rockLayer = new createjs.Bitmap(image).set({ scaleX: 15, scaleY: 15 });
    rockLayer.x = (window.innerWidth / 2);
    rockLayer.y = (window.innerHeight / 2);
    rockLayer.regX += 50;
    rockLayer.regY += 50;
    rockLayer.rotation = Math.random() * 180;
    rockLayer.mask = crust;
    container.addChild(rockLayer);

    var image = new Image();
    image.src = "../assets/grasslayer.svg"
    grassLayer = new createjs.Bitmap(image).set({ scaleX: 15, scaleY: 15 });
    grassLayer.x = (window.innerWidth / 2);
    grassLayer.y = (window.innerHeight / 2);
    grassLayer.regX += 50;
    grassLayer.regY += 50;
    grassLayer.rotation = Math.random() * 180;
    grassLayer.alpha = .5;


    grassLayer.mask = crust;
    container.addChild(grassLayer);


}

function getCenter() {
    return container.globalToLocal(window.innerWidth / 2, window.innerHeight / 2);
}

window.onkeyup = function (e) {
    var key = e.keyCode ? e.keyCode : e.which;

    switch (key) {
        case (72):
            container.scaleX = .3;
            container.scaleY = .3;
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
        case (90):
            rotateLeftKey = false;
            break;
        case (88):
            rotateRightKey = false;
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
        case (90):
            rotateLeftKey = true;
            break;
        case (88):
            rotateRightKey = true;
            break;
    }
}
function luminanace(hex) {
    var c = hex.substring(1);      // strip #
    var rgb = parseInt(c, 16);   // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff;  // extract red
    var g = (rgb >> 8) & 0xff;  // extract green
    var b = (rgb >> 0) & 0xff;  // extract blue

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luma;
}
function zoomIn() {
    scale += .5;
}
function zoomOut() {
    scale -= .5;
}