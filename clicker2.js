let score = 0;
let bestScore = 0;
let timer = 30;
let isPlaying = false;

let targetX, targetY;
let targetRadius = 30;

let isDragging = false; 
let offsetX = 0;
let offsetY = 0;

let startTime;
let speed = 5; 

function setup() {
  createCanvas(600, 400);
  targetX = width / 2;
  targetY = height / 2;
}

function draw() {
  background(220);

  if (isPlaying) {
    handleKeyboardInput();

    if (isDragging) {
      fill(200, 0, 0); 
    } else {
      fill(255, 0, 0);
    }
    ellipse(targetX, targetY, targetRadius * 2);

    let elapsedTime = (millis() - startTime) / 1000;
    timer = 30 - elapsedTime;
    
    if (timer <= 0) {
      timer = 0;
      stopGame();
    }
    
  } else {
    drawMenu();
  }
  
  displayUI();
}

// --- Функція для керування клавіатурою ---
function handleKeyboardInput() {
  if (keyIsDown(LEFT_ARROW)) {
    targetX -= speed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    targetX += speed;
  }
  if (keyIsDown(UP_ARROW)) {
    targetY -= speed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    targetY += speed;
  }
  
  // Обмеження, щоб не вийти за межі екрану
  targetX = constrain(targetX, targetRadius, width - targetRadius);
  targetY = constrain(targetY, targetRadius, height - targetRadius);
}

function mousePressed() {
  if (!isPlaying) return;

  let d = dist(mouseX, mouseY, targetX, targetY);

  if (d < targetRadius) {
    isDragging = true;
    score++;
    
    offsetX = targetX - mouseX;
    offsetY = targetY - mouseY;
  }
}

function mouseDragged() {
  if (isPlaying && isDragging) {

    targetX = mouseX + offsetX;
    targetY = mouseY + offsetY;
  }
}

function mouseReleased() {
  isDragging = false;
}


function displayUI() {
  textSize(24);
  textAlign(LEFT, TOP);
  fill(0);
  text("Рахунок: " + score, 10, 10);
  text("Час: " + ceil(timer), width / 2 - 50, 10);
  text("Керування: Стрілки або Миша", 10, height - 30);
}

function drawMenu() {
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(0);
  if (score > 0) {
     text("Час вийшов! Рахунок: " + score, width / 2, height / 2 - 40);
     text("ПРОБІЛ - грати знову", width / 2, height / 2);
  } else {
     text("ПРОБІЛ - старт", width / 2, height / 2);
  }
}

function keyPressed() {
  if (key === ' ') {
    if (isPlaying) {
      stopGame();
    } else {
      startGame();
    }
  }
}

function startGame() {
  isPlaying = true;
  score = 0;
  timer = 30;
  startTime = millis();
}

function stopGame() {
  isPlaying = false;
  isDragging = false; закінчилась
}
