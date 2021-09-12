const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const playerImg=new Image();
playerImg.src='assets/images/truck.png';

const coinImg=new Image();
coinImg.src='assets/images/coin.png';

const bombImg=new Image();
bombImg.src='assets/images/bomb.png';


const scale = 4;
let position = 0;
let speed=1;
let dy=0;
let coinPosition=20;
let bombPosition=-300;
let balance=0;

canvas.height = canvas.height * scale;
canvas.width = canvas.width * scale;

let land = [];

let player={x:200,y:null,width:100,height:75};

let coin={x:null,y:null,width:50,height:50};

let bomb={x:null,y:null,width:50,height:80};

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
    context.drawImage(playerImg,player.x-offsetX,player.y, player.width,player.height);
    context.restore();
}

function drawCoin(coinPosition){
    coin.x=(canvas.width-coinPosition);
    let y=(canvas.height- coin.height) - createWave(position +coin.x) * 0.7;
    coin.y=y;
    context.drawImage(coinImg,coin.x,coin.y,coin.width,coin.height);
   
}

function drawBomb(bombPosition){
    bomb.x=(canvas.width-bombPosition);
    let y=(canvas.height- bomb.height) - createWave(position +bomb.x) * 0.7;
    bomb.y=y;
    context.drawImage(bombImg,bomb.x,bomb.y,bomb.width,bomb.height);
}

function drawScore(balance){
    context.font = "30px Comic Sans MS";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText("Coin: "+balance,60,40);

}

function checkCoinCollision(){
    let x = player.x - coin.x;
    let y = player.y - coin.y;
    let distance= Math.sqrt( x*x + y*y );

    let collisionDistance=(player.width+coin.width)/2;
    if (distance<=collisionDistance) {
        return true;  
    }
}

function checkBombCollision(){
    let x = player.x - bomb.x;
    let y = player.y - bomb.y;
    let distance= Math.sqrt( x*x + y*y );

    let collisionDistance=(player.width+bomb.width)/2;
    if (distance<=collisionDistance) {
        return true;  
    }
}

function syncCoinAndBombSpeed(){
    if(speed==0){
        coinPosition+=0;
        bombPosition+=0;
    }else if(speed==1){
        coinPosition+=3.5;
        bombPosition+=3.5;
    }
    else if(speed==1.5){
        coinPosition+=5;
        bombPosition+=5;
    }else if(speed==-0.5){
        coinPosition-=1.5;
        bombPosition-=1.5;
    }
}

function updateCoin(){
    if(coinPosition>=canvas.width){
        coinPosition=20;
        console.log("find")
    }
    else if(checkCoinCollision()){
        coinPosition=20;
        balance +=1;
    }
}

function updateBomb(){
    if(bombPosition>=canvas.width){
        bombPosition=-300;
    }
    else if(checkBombCollision()){
        bombPosition=-300;
    }
}


const interval=setInterval(() => {
    drawHill(speed);
    drawPlayer(dy);
    drawCoin(coinPosition);
    drawBomb(bombPosition)
    updateCoin();
    updateBomb();
    syncCoinAndBombSpeed();
    drawScore(balance)
},10);

function gameOver(){



}


/*Key Down*/
function moveTruck(e) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if (e.keyCode == UP_KEY) {
        dy=100; 
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
        speed=1;    
    }
  }



