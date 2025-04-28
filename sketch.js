let capture;
let backgroundGraphics;
let captureReady = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(255);
  text("請點擊以啟動相機", width / 2, height / 2);
}

function mousePressed() {
  if (!captureReady) {
    startCapture();
    captureReady = true;
  }
}

function startCapture() {
  capture = createCapture(VIDEO, () => {
    capture.size(windowWidth * 0.8, windowHeight * 0.8);
    capture.hide();
    backgroundGraphics = createGraphics(capture.width, capture.height);
    drawGraphics();
  });
}

function draw() {
  if (captureReady && capture) {
    // 顯示背景
    image(backgroundGraphics, (width - capture.width) / 2, (height - capture.height) / 2, capture.width, capture.height);

    // 顯示翻轉的攝影機畫面
    push();
    translate(width / 2, height / 2);
    scale(-1, 1);
    image(capture, -capture.width / 2, -capture.height / 2, capture.width, capture.height);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (capture) {
    capture.size(windowWidth * 0.8, windowHeight * 0.8);
    backgroundGraphics = createGraphics(capture.width, capture.height);
    drawGraphics();
  }
}

function drawGraphics() {
  if (capture) {
    backgroundGraphics.background(0);
    backgroundGraphics.noStroke();
    capture.loadPixels();
    if (capture.pixels.length > 0) {
      for (let x = 0; x < capture.width; x += 20) {
        for (let y = 0; y < capture.height; y += 20) {
          let i = (y * capture.width + x) * 4;
          let col = color(
            capture.pixels[i],
            capture.pixels[i + 1],
            capture.pixels[i + 2],
            capture.pixels[i + 3]
          );
          backgroundGraphics.fill(col);
          backgroundGraphics.ellipse(x + 10, y + 10, 15, 15);
        }
      }
    }
  }
}
