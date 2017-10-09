createjs.Ticker.on("tick", update);

function init() {
    var stage = new createjs.Stage("canvas");
    stage.update();    
}

function update (event){
    //run everything in here!
    if (!event.paused) {
        // Actions carried out when the Ticker is not paused.
        stage.update();    
    }
}