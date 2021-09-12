const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const playerImg=new Image();
playerImg.src='assets/images/truck.png';

const coinImg=new Image();
coinImg.src='assets/images/coin.png';


const scale = 4;
let position = 0;
let speed=0.5;
let dy=0;
let rotation=(0* Math.PI)/180;

canvas.height = canvas.height * scale;
canvas.width = canvas.width * scale;

let land = [];

let player={x:200,y:null,width:100,height:75};

/*Adding EventListener*/
document.addEventListener("keydown", moveTruck);
document.addEventListener("keyup", stopTruck);


function calcAngle(a, b, c) {
  return a + b + (a - b) * Math.cos(c * Math.PI);
}

function createWave(x) {
   x = x / 200;
  land.push(Math.random() * 120);
  return calcAngle(land[Math.floor(x)], land[Math.ceil(x)], x - Math.floor(x));
}

function drawHill(speed) {
  position +=1*speed;
  context.fillStyle = "#19f";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "#86592d";
  context.beginPath();
  context.moveTo(0, canvas.height);

  for (i = 0; i < canvas.width; i++) {
    y = canvas.height - createWave(position + i) * 0.7;
    context.lineTo(i, y);
  }
  context.lineTo(canvas.width, canvas.height);
  context.fill();
  
}

function drawPlayer(dy){
    let offsetX=player.width/2;
    let y=(canvas.height- player.height-dy) - createWave(position +player.x) * 0.7;
    player.y=y;
    context.save();
    // context.translate(player.x,player.y);
    // context.rotate(rotation);
    context.drawImage(playerImg,player.x-offsetX,player.y, player.width,player.height);
    context.restore();
}

function drawCoin(){
   
    player.y=player.y+dy;


}

setInterval(() => {
    drawHill(speed);
    drawPlayer(dy);
    //updatePlayer();
},10);

/*Key Down*/
function moveTruck(e) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if (e.keyCode == UP_KEY) {
        dy=20;
        console.log("pressed")
    } else if (e.keyCode == DOWN_KEY) {
        speed=0;

    } else if (e.keyCode == LEFT_KEY) {
        
        speed=-0.5;

    } else if (e.keyCode == RIGHT_KEY) {

        speed=1.5;
 
     
    }
  }
  
/*Key Up */
function stopTruck(e) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if (e.keyCode == UP_KEY) {
        dy=0;
    } else if (e.keyCode == DOWN_KEY) {
      
        speed=0;
    } else if (e.keyCode == LEFT_KEY) {
      
        speed=0;

    } else if (e.keyCode == RIGHT_KEY) {
        speed=0.5;
    
    }
  }



