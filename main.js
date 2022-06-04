song="";
leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload()
{
    song = loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw()
{
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    
    
    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristx,leftWristy,20);
        lefty = Math.floor(leftWristy);
        volume = lefty / 500;
        document.getElementById("vol").innerHTML = "volume = " + volume;
        song.setVolume(volume);
    }

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristx,rightWristy,20);
        if (rightWristy >= 0 && rightWristy< 100)
        {
            song.rate(0.5);
            document.getElementById("speed").innerHTML = "speed = 0.5x";
        }

        else if (rightWristy >= 100 && rightWristy< 200)
        {
            song.rate(1);
            document.getElementById("speed").innerHTML = "speed = 1x";
        }

        else if (rightWristy >= 200 && rightWristy< 300)
        {
            song.rate(1.5);
            document.getElementById("speed").innerHTML = "speed = 1.5x";
        }

        else if (rightWristy >= 300 && rightWristy< 400)
        {
            song.rate(2);
            document.getElementById("speed").innerHTML = "speed = 2x";
        }

        else if (rightWristy >= 400 && rightWristy< 500)
        {
            song.rate(2.5);
            document.getElementById("speed").innerHTML = "speed = 2.5x";
        }
    }

   }

function play() 
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded()
{
    console.log("model was successfully loaded");
}

function gotPoses(results)
{
    if (results.length > 0 )
    {
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(results);
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        /*console.log("leftWristx = " + leftWristx );
        console.log("leftWristy = " + leftWristy );
        console.log("rightWristx = " + rightWristx );
        console.log("rightWristy = " + rightWristy );*/
    }
    
}