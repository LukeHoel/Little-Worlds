var stage;
var container;




var colors = [];
var colorCount = 4;

// var crust;
// var groundColor;
// var clouds;
// var planet;
// var planetRadius = 500;
// var water;
// var water2;
// var ground;
// var landSegments = [];
// var foliageContainer;
// var foliageInfo = [];
// var treeContainer;
// var treeInfo = [];
// var foliageOpacity = 0;

// var peopleContainer;
// var peopleInfo = [];

// var houseContainer;
// var houseInfo = [];

var minimumPlants = 40;
var plantTimer = 60 * 20;
var timer = plantTimer;

var sun = { x: window.innerWidth / 2, y: window.innerHeight / 2 }

var planets = [];
var selectedPlanet;
var offsetX = 0;
var offsetY = 0;

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
    container = new createjs.Container();
    container.x = sun.x;
    container.y = sun.y;

    addPlanet(0, 0, 2000, "sun");

    addPlanet(5000, 5, 500, "planet");

    addPlanet(10000, 5, 800, "planet");

    stage.addChild(container);

    // container.addChild(treeContainer);
    // container.addChild(houseContainer);
    // container.addChild(peopleContainer);
    // container.addChild(foliageContainer);

    // stage.addChild(container);
    // planet = new createjs.Shape();
    // planet.x = window.innerWidth / 2;
    // planet.y = window.innerHeight / 2;
    // container.addChild(planet);
    // addWater();
    // generateTerrain();
    // placeFoliage();
    // placePeople();
    // addClouds();

    //addDecorLayers();

    //container.rotation = Math.random() * 180;

    //container.setChildIndex(foliageContainer, container.numChildren - 1)
    // foliageContainer.alpha = 0;
    // treeContainer.alpha = 0;
    // peopleContainer.alpha = 0;
    // houseContainer.alpha = 0;
    // ground.graphics.clear();


    if (!isSmallScreen()) {
        container.scaleX = .04;
        container.scaleY = .04;
    } else {
        container.scaleX = .03;
        container.scaleY = .03;
    }
    selectedPlanet = planets[0].localPlanetContainer;
    stage.update();

    createjs.Ticker.framerate = 60;
    createjs.Ticker.on("tick", function (e) {
        update(e);
    });

    //document.getElementById("name").innerText = getName();
}

function getName() {
    var name = "";
    var namesPartA = [
        "Zog",
        "Dom",
        "Ag",
        "Gon",
        "Agg",
        "Zoo",
        "Nu",
        "Ksi",
        "Pi",
        "Tau"
    ];
    var namesPartB = [
        "oid",
        "son",
        "ston",
        "nog",
        "ga",
        "gon",
        "nu",
        "ski",
        "pi"
    ];
    var greekNums = [
        "Alpha",
        "Beta",
        "Gamma",
        "Delta",
        "Epsilon",
        "Zeta",
        "Eta",
        "Theta",
        "Iota",
        "Kappa",
        "Lambda",
        "Sigma",
        "Upsilon",
        "Omega"
    ];

    name += namesPartA[getRandomInt(0, namesPartA.length)];
    name += namesPartB[getRandomInt(0, namesPartB.length)];
    name += " " + greekNums[getRandomInt(0, greekNums.length)];
    return name;
}

function addWater(planetx, planety, planetRadius, water, water2) {
    // water = new createjs.Shape();
    // water.graphics.beginFill("blue").drawCircle(0, 0, planetRadius + 50);
    // water.alpha = .5;
    // water.x = window.innerWidth / 2;
    // water.y = window.innerHeight / 2;
    // container.addChild(water);
    var waterColor = randomColor();
    water.graphics.beginFill(waterColor);
    water.alpha = .5;
    water.x = planetx;
    water.y = planety;
    water2.graphics.beginFill(waterColor);
    water2.alpha = .5;
    water2.x = planetx;
    water2.y = planety;
    var points = 10;
    for (var i = 0; i < points; i++) {
        var x = (planetRadius + 35) * Math.sin(toRadians((360 / points) * i));
        var y = (planetRadius + 35) * Math.cos(toRadians((360 / points) * i));
        water.graphics.lineTo(x, y);
        water2.graphics.lineTo(x, y);
    }
    water.rotation = 45;
    water2.scale = 1.03;

    //createjs.Tween.get(water, { loop: true }).to({ scale: 1.03 }, 2000).to({ scale: 1 }, 2000);
    //createjs.Tween.get(water2, { loop: true }).to({ scale: 1 }, 2000).to({ scale: 1.03 }, 2000);
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
                        if (landSegments[i].biome.canPlantsGrow) {
                            bush.graphics.drawCircle(-2, 0, 3);
                            bush.graphics.drawCircle(2, 0, 3);
                            bush.graphics.drawCircle(0, 2.5, 3);
                            bush.scaleX *= landSegments[i].biome.resourceModifier;
                            bush.scaleY *= landSegments[i].biome.resourceModifier;
                            foliageContainer.addChild(bush);
                            foliageInfo.push({ type: "food", amount: 1 * landSegments[i].biome.resourceModifier, section: i, index: num, x: x, y: y });
                            break;
                        }
                    case (1):
                        if (landSegments[i].biome.canPlantsGrow) {
                            bush.graphics.drawCircle(-3, 1, 5);
                            bush.graphics.drawCircle(2, 1, 5);
                            bush.graphics.drawCircle(0, 4, 5);
                            bush.scaleX *= landSegments[i].biome.resourceModifier;
                            bush.scaleY *= landSegments[i].biome.resourceModifier;
                            foliageContainer.addChild(bush);
                            foliageInfo.push({ type: "food", amount: 2 * landSegments[i].biome.resourceModifier, section: i, index: num, x: x, y: y });

                            break;
                        }
                    case (2):
                        if (landSegments[i].biome.canTreesGrow) {
                            bush.graphics.beginFill(colors[0]);
                            bush.graphics.drawRect(-7, -9, 5, 15);
                            bush.graphics.beginFill(colors[1]);
                            bush.graphics.moveTo(-12, 5);
                            bush.graphics.lineTo(-5, 30);
                            bush.graphics.lineTo(4, 5);
                            bush.graphics.closePath();
                            bush.scaleX *= landSegments[i].biome.resourceModifier;
                            bush.scaleY *= landSegments[i].biome.resourceModifier;
                            treeContainer.addChild(bush);
                            treeInfo.push({ type: "wood", amount: 3 * landSegments[i].biome.resourceModifier, section: i, index: num, x: x, y: y });
                            break;
                        }
                    case (3):
                        if (landSegments[i].biome.canTreesGrow) {
                            bush.graphics.beginFill(colors[2]);
                            bush.graphics.drawRect(-11, -7, 9, 18);
                            bush.graphics.beginFill(colors[3]);
                            bush.graphics.moveTo(-17, 10);
                            bush.graphics.lineTo(-6, 50);
                            bush.graphics.lineTo(4, 10);
                            bush.graphics.closePath();
                            bush.scaleX *= landSegments[i].biome.resourceModifier;
                            bush.scaleY *= landSegments[i].biome.resourceModifier;
                            treeContainer.addChild(bush);
                            treeInfo.push({ type: "wood", amount: 5 * landSegments[i].biome.resourceModifier, section: i, index: num, x: x, y: y });
                            break;
                        }
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
            if (landSegments[i].biome.canTreesGrow)
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
                            bush.scaleX *= landSegments[i].biome.resourceModifier;
                            bush.scaleY *= landSegments[i].biome.resourceModifier;
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
                            bush.scaleX *= landSegments[i].biome.resourceModifier;
                            bush.scaleY *= landSegments[i].biome.resourceModifier;
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
            if (landSegments[i].biome.canPlantsGrow)
                if (landSegments[i].isOcean == false) {


                    bush.x = x;
                    bush.y = y;
                    switch (getRandomInt(0, 2)) {
                        case (0):
                            bush.graphics.drawCircle(-2, 0, 3);
                            bush.graphics.drawCircle(2, 0, 3);
                            bush.graphics.drawCircle(0, 2.5, 3);
                            bush.scaleX *= landSegments[i].biome.resourceModifier;
                            bush.scaleY *= landSegments[i].biome.resourceModifier;
                            foliageContainer.addChild(bush);
                            foliageInfo.push({ type: "food", amount: 1, section: i, index: num, x: x, y: y });
                            break;
                        case (1):
                            bush.graphics.drawCircle(-3, 1, 5);
                            bush.graphics.drawCircle(2, 1, 5);
                            bush.graphics.drawCircle(0, 4, 5);
                            bush.scaleX *= landSegments[i].biome.resourceModifier;
                            bush.scaleY *= landSegments[i].biome.resourceModifier;
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
                peopleInfo.push({ section: i, percent: Math.random(), food: 6, wood: 0, idleDirection: 0, idleTimer: 0 });
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

function generateTerrain(planetx, planety, ground, groundColor, landSegments, planetRadius) {

    var totalMountains = 0;
    var totalOceans = 0;
    var mountainFreq = 10;//gets less likely the higher this gets
    var mountainHeight = 20;
    var oceanFreq = 30;
    var oceanWidth = 8;
    var oceanDepth = 80;
    var oceanCounter = 0;//oceans can be multiple sides wide, so we need a counter
    var oceanOffCounter = 0;
    var points = 100;
    //ground.graphics.beginFill("#705239");
    groundColor = randomColor();
    ground.graphics.beginFill(groundColor);

    var biomeWidth = 4;
    var widthsleft = 0;
    var biome;
    var biomes = [];
    biomes.push({ landModifier: 30, canTreesGrow: true, canPlantsGrow: true, buildable: true, ocean: false, resourceModifier: 1.2, variance: 20 });
    biomes.push({ landModifier: 10, canTreesGrow: true, canPlantsGrow: true, buildable: true, ocean: false, resourceModifier: 1, variance: 30 });
    biomes.push({ landModifier: 10, canTreesGrow: false, canPlantsGrow: false, buildable: false, ocean: true, variance: 10 });
    biomes.push({ landModifier: -20, canTreesGrow: true, canPlantsGrow: true, buildable: true, ocean: false, resourceModifier: 1.5, variance: 30 });
    biomes.push({ landModifier: 10, canTreesGrow: false, canPlantsGrow: false, buildable: true, ocean: false, resourceModifier: 1.5, variance: 60 });
    for (var i = 0; i < points; i++) {
        widthsleft--;
        if (widthsleft <= 0) {
            biome = biomes[getRandomInt(0, biomes.length)];
            widthsleft = biomeWidth;
        }
        var offset = 70;
        var variance = biome.variance;
        var finalOffset = offset + (Math.random() * variance);
        if (oceanOffCounter <= 0) {
            if ((Math.random() * oceanFreq) <= 1 && oceanCounter <= 0) {
                oceanCounter = oceanWidth + getRandomInt(0, 7);
                oceanOffCounter = 3;
            }
        } else {
            if (oceanCounter <= 0)
                oceanOffCounter--;
        }
        if (oceanCounter > 0)
            if ((Math.random() * mountainFreq) <= 1) {
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
        if (landSegments.length > 1) {
            if (isOcean && !landSegments[landSegments.length - 1].isOcean) {
                finalOffset += (oceanDepth / 2);
            }
            if (!isOcean && landSegments[landSegments.length - 1].isOcean) {
                finalOffset -= (oceanDepth / 2);
            }
        }
        if (!isOcean)
            finalOffset += biome.landModifier;
        var x = planetx + (planetRadius + finalOffset) * Math.sin(toRadians((360 / points) * i));
        var y = planety + (planetRadius + finalOffset) * Math.cos(toRadians((360 / points) * i));
        ground.graphics.lineTo(x, y);
        landSegments.push({ x: x, y: y, isOcean: isOcean, biome: biome, dist: finalOffset });
    }

    ground.graphics.closePath();
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
        //updatePlanet();
        if (selectedPlanet != planets[0]) {
            if (plusKey && container.scaleX < 7.5) {

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
            if (minusKey && container.scaleX > .05) {

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
        }
        var movement = shiftKey ? 2 : 1;
        for (var i = 0; i < movement; i++) {
            if (downKey) {
                offsetY += -5;
            }
            else if (upKey) {
                offsetY += 5;
            }
            if (rightKey) {
                offsetX += -5;
            }
            else if (leftKey) {
                offsetX += 5;
            }
        }

        // if (rotateLeftKey) {
        //     container.rotation -= 1;
        // } else if (rotateRightKey) {
        //     container.rotation += 1;
        // }

        // houseContainer.alpha = peopleContainer.alpha = treeContainer.alpha = foliageContainer.alpha = foliageOpacity;

        // if (container.scaleX > 1.2) {
        //     if (foliageOpacity < 1)
        //         foliageOpacity += .1
        // } else {
        //     if (foliageOpacity > 0)
        //         foliageOpacity -= .1
        // }

        // movePeople();
        // timer--;
        // if (timer <= 0) {
        //     if (foliageContainer.numChildren < minimumPlants) {
        //         placeBushesOnly();
        //     }
        //     if (treeContainer.numChildren < minimumPlants) {
        //         placeTreesOnly();
        //     }
        //     timer = plantTimer;
        // }
        stage.x = 0;
        stage.y = 0;
        if (selectedPlanet != planets[0].localPlanetContainer) {
            // var dist = distance(selectedPlanet, planets[0].localPlanetContainer);
            // var angle = selectedPlanet.rotation;
            // console.log(angle);
            // stage.x = dist * Math.sin(toRadians(angle));
            // stage.y = dist * Math.cos(toRadians(angle));
            // debugger;
            var point = selectedPlanet.localToGlobal(selectedPlanet.x, selectedPlanet.y);
            stage.x -= point.x;
            stage.y -= point.y;
            stage.x += window.innerWidth / 2;
            stage.y += window.innerHeight / 2;
        }
        stage.x += offsetX;
        stage.y += offsetY;
        updatePlanets();
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
        if (hasHouse) {
            house.health -= 0.001;
            if (house.health <= 0) {
                houseInfo.splice(i, 1);
                houseContainer.removeChild(house);
                house = null;
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
                foliageContainer.removeChildAt(closest);
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
                treeContainer.removeChildAt(closest);
            }
        } else if (!hasHouse) {
            if (!landSegments[stats.section].isOcean && landSegments[stats.section].biome.buildable) {
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
            if (house.health < 10) {
                if (Math.abs(angleFromCenter - houseAngle) > .2) {
                    if (angleFromCenter < houseAngle)
                        action = walkRight;
                    else if (angleFromCenter > houseAngle)
                        action = walkLeft;
                } else {

                    house.health += stats.wood;
                }
            } else {
                //if there is nothing else to do...
                stats.idleTimer--;
                if (stats.idleTimer <= 0) {
                    stats.idleTimer = (2 + getRandomInt(0, 3)) * 60;
                    stats.idleDirection = getRandomInt(0, 2);
                }
                action = stats.idleDirection;
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
    houseInfo.push({ person: person, stats: stats, x: person.x, y: person.y, health: 10 + getRandomInt(5, 10), section: stats.section, dist: landSegments[stats.section].dist });

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
function distance(point1, point2) {
    return Math.hypot(point2.x - point1.x, point2.y - point1.y);
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

function updatePlanet() {
    ground.graphics.clear();
    ground.graphics.beginFill(groundColor);
    for (var i = 0; i < landSegments.length; i++) {
        var x = planet.x + (planetRadius + landSegments[i].dist) * Math.sin(toRadians((360 / landSegments.length) * i));
        var y = planet.y + (planetRadius + landSegments[i].dist) * Math.cos(toRadians((360 / landSegments.length) * i));
        ground.graphics.lineTo(x, y);
        landSegments[i].x = x;
        landSegments[i].y = y;
    }
    ground.graphics.closePath();
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
function addPlanet(planetx, planety, radius, type) {
    var groundColor;
    var clouds = new createjs.Shape();
    var water = new createjs.Shape();
    var water2 = new createjs.Shape();
    var ground = new createjs.Shape();
    var landSegments = [];
    var foliageContainer;
    var foliageInfo = [];
    var treeContainer;
    var treeInfo = [];
    var foliageOpacity = 0;
    var peopleContainer;
    var peopleInfo = [];

    var houseContainer;
    var houseInfo = [];

    var planetContainer = new createjs.Container;
    var localPlanetContainer = new createjs.Container;
    foliageContainer = new createjs.Container;
    treeContainer = new createjs.Container;
    peopleContainer = new createjs.Container;
    houseContainer = new createjs.Container;


    switch (type) {
        case 'sun':
            //ground.graphics.beginFill(randomColor());
            //ground.graphics.drawCircle(0, 0, radius)
            addWater(planetx, planety, radius, water, water2);
            createjs.Tween.get(water, { loop: true }).to({ rotation: 360 }, 20000);
            createjs.Tween.get(water2, { loop: true }).to({ rotation: -360 }, 20000);
            water2.scale = 1.05;
            localPlanetContainer.regX = sun.x;
            localPlanetContainer.regY = sun.y;
            localPlanetContainer.x = sun.x;
            localPlanetContainer.y = sun.y;

            planetContainer.x = sun.x;
            planetContainer.y = sun.y;
            planetContainer.regX = sun.x;
            planetContainer.regY = sun.y;
            selectedPlanet = ground;
            break;
        default:
            localPlanetContainer.regX = planetx;
            localPlanetContainer.regY = planety;
            localPlanetContainer.x = planetx;
            localPlanetContainer.y = planety;

            planetContainer.regX = sun.x;
            planetContainer.regY = sun.y;
            generateTerrain(planetx, planety, ground, groundColor, landSegments, radius);
            addWater(planetx, planety, radius, water, water2);
            break;
    }
    localPlanetContainer.addChild(water);
    localPlanetContainer.addChild(water2);
    localPlanetContainer.addChild(ground);

    planetContainer.addChild(localPlanetContainer);
    //if (type != "sun")
    planets.push({
        type:type,
        radius: radius,
        localPlanetContainer: localPlanetContainer,
        planetContainer: planetContainer,
        groundColor: groundColor,
        clouds: clouds,
        water: water,
        water2: water2,
        ground: ground,
        landSegments: landSegments,
        foliageContainer: foliageContainer,
        foliageInfo: foliageInfo,
        treeContainer: treeContainer,
        treeInfo: treeInfo,
        peopleContainer: peopleContainer,
        peopleInfo: peopleInfo,
        houseContainer: houseContainer,
        houseInfo: houseInfo
    });
    localPlanetContainer.addEventListener("click", function (event) {
        selectedPlanet = localPlanetContainer;
        if (!isSmallScreen()) {
            container.scaleX = .04;
            container.scaleY = .04;
        } else {
            container.scaleX = .03;
            container.scaleY = .03;
        }
        offsetX = 0;
        offsetY = 0;
    })
    container.addChild(planetContainer);
}
function updatePlanets() {
    var rotationSpeedSecs = 60;
    var rotationSpeed = rotationSpeedSecs / 60;
    var planetaryOrbitSpeedSecs = 20;
    var planetaryOrbitSpeed = planetaryOrbitSpeedSecs * 60;
    for (var i = 0; i < planets.length; i++) {
        var planet = planets[i];
        if (planet.type != "sun") {
            var orbitSpeed = planetaryOrbitSpeed / (distance(planet.localPlanetContainer, planet.planetContainer) / 2);
            planet.planetContainer.rotation += orbitSpeed;
            planet.localPlanetContainer.rotation += rotationSpeed;
        }
    }
}