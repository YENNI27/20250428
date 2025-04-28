let capture;
let backgroundGraphics;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全視窗畫布
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始影像，僅顯示於畫布

  // 建立與視訊畫面一樣大小的背景 Graphics
  backgroundGraphics = createGraphics(capture.width, capture.height);
  drawGraphics(); // 繪製背景內容
}

function draw() {
  // 顯示背景 Graphics
  image(
    backgroundGraphics,
    (width - capture.width) / 2, // 計算背景的水平居中位置
    (height - capture.height) / 2, // 計算背景的垂直居中位置
    capture.width,
    capture.height
  );

  // 顯示攝影機影像
  push();
  translate(width / 2, height / 2); // 將原點移至畫布中心
  scale(-1, 1); // 水平翻轉影像
  image(
    capture,
    -capture.width / 2, // 調整影像位置以居中
    -capture.height / 2,
    capture.width,
    capture.height
  );
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 更新影像大小
  backgroundGraphics = createGraphics(capture.width, capture.height); // 更新背景 Graphics 大小
  drawGraphics(); // 重新繪製背景內容
}

function drawGraphics() {
  backgroundGraphics.background(0); // 設定背景為黑色

  // 確保 capture 已準備好
  if (capture.loadedmetadata) {
    for (let x = 0; x < backgroundGraphics.width; x += 20) {
      for (let y = 0; y < backgroundGraphics.height; y += 20) {
        // 從 capture 中取得顏色
        let col = capture.get(x, y);
        let gray = (red(col) + green(col) + blue(col)) / 3; // 計算灰階值
        backgroundGraphics.fill(gray); // 設定圓形顏色為灰階
        backgroundGraphics.noStroke();
        backgroundGraphics.ellipse(x + 10, y + 10, 15, 15); // 繪製圓形
      }
    }
  }
}
