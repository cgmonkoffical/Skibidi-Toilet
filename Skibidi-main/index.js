const canvas = document.querySelector("canvas");
const secondsCount = document.querySelector(".seconds");
const level = document.querySelector(".grade");
const context = canvas.getContext("2d");
const pugDimensions = { width: 353 / 1.5, height: 325 / 1.5 };


const levels = {
  5: "Jr Sigma",
  10: "Sr Sigma",
  15: "Senior Sigma",
  35: "Jr Rizzler",
  65: "Sr Rizzler",
  105: "Senior Rizzler",
  150: "Jr Skibidi",
  250: "Sr Skibidi",
  450: "Senior Skibidi",
  650: "Jr Battler",
  1000: "Sr Battler",
  1500: "Senior Battler",
  2500: "Jr God Skibidi",
  3500: "Sr God Skibidi",
  4500: "Senior God Skibidi",
  10500: "Jr King Skibidi ",
  20500: "Sr King Skibidi ",
  30500: "Senior King Skibidi",
  40500: "Thy Owner",
  750000: ""
}

const startTime = Date.now();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.translate(window.innerWidth / 2, window.innerHeight / 2);

const image = new Image();
image.src = "./assets/pug.png"; 

const loopingPugs = 50; 
const offsetDistance = 120;
let currentOffset = 0;

const movementRange = 200

const mouseOffset = {
  x: 0,
  y: 0
}

const movementOffset = {
  x: 0,
  y: 0
}

image.onload = () => {
  startLooping();
};

window.onresize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  context.setTransform(1, 0, 0, 1, 0, 0); 
  context.translate(window.innerWidth / 2, window.innerHeight / 2);
};

window.addEventListener('mousemove', onMouseMove)

function draw(offset, loopCount) {

  let currentPercentage = (loopingPugs - loopCount) / loopingPugs
  context.drawImage(
    image,
    -pugDimensions.width / 2 - offset/2 + (movementOffset.x * currentPercentage),
    -pugDimensions.height / 2 - offset/2 + (movementOffset.y * currentPercentage),
    pugDimensions.width + offset,
    pugDimensions.height + offset
  );
}

function onMouseMove(e) {
  mouseOffset.x = (e.clientX - window.innerWidth / 2) / window.innerWidth / 2 * movementRange
  mouseOffset.y = (e.clientY - window.innerHeight / 2) / window.innerHeight / 2 * movementRange
}

function lerp(start, end, amount) {
  return start*(1-amount)+end*amount
}

function loopDraw() {

  movementOffset.x = lerp(movementOffset.x, mouseOffset.x, 0.05)
  movementOffset.y = lerp(movementOffset.y, mouseOffset.y, 0.05)

  for (let i = loopingPugs; i >= 1; i--) {
    draw(i * offsetDistance + currentOffset, i);
  }

  draw(offsetDistance, 1);

  currentOffset++;
  if (currentOffset >= offsetDistance) {
    currentOffset = 0;
  }

  const newTime = Math.floor((Date.now() - startTime) / 1000);

  secondsCount.innerText = newTime;

  if(levels[newTime]) {
    level.innerText = levels[newTime]
  }

  requestAnimationFrame(loopDraw);
}

function startLooping() {
  requestAnimationFrame(loopDraw);
}
