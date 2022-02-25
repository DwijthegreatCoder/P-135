objects = [];
status = "";

function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(300, 300);
    video.hide();
}

function modelloaded() {
    console.log("Model Loadeed!")
    status = true;
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects";
    object_name = document.getElementById("object_name").value;
}

function gotResult(error, results) {
    if(error) {
        console.log("error");
    }

    objects = results;
}

function draw() {
    image(video, 0, 0, 300 , 300);
    if(status != "") {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object Detected";

            fill('#FF0000');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke('#FF0000')
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}