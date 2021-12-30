alarm = "";
objects = [];
status = "";

function preload() {
    alarm = loadSound("alarm_buzzer.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(600,500);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!")
    Status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 600, 500);
    if (status != "") {
        r = random(225);
        g = random(225);
        b = random(225);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
         
          if(objects[i].label == "person")
          {
            document.getElementById("number_of_objects").innerHTML = "Baby Found";
            console.log("stop");
            alarm.stop();
          }
          else
          {
            document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
            console.log("play"); 
            alarm.play();
          }
         }

        if(objects.length == 0)
        {
          document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
          console.log("play"); 
          alarm.play();
        }
    }
}