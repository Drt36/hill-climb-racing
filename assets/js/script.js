const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const scale = 4;
let position = 0;

canvas.height = canvas.height * scale;
canvas.width = canvas.width * scale;

let land = [];

function calcAngle(a, b, c) {
  return a + b + (a - b) * Math.cos(c * Math.PI);
}

function createWave(x) {
  x = x / 200;
  land.push(Math.random() * 120);
  return calcAngle(land[Math.floor(x)], land[Math.ceil(x)], x - Math.floor(x));
}

function drawHill() {
  position += 1;
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
  requestAnimationFrame(drawHill);
}

drawHill();
