let capture;
let overlayGraphics;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全視窗畫布
  background('#ffc2d1'); // 設定背景顏色
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始影像，僅顯示於畫布

  // 建立與視訊畫面一樣大小的 Graphics
  overlayGraphics = createGraphics(capture.width, capture.height);
  overlayGraphics.fill(255, 0, 0, 150); // 半透明紅色
  overlayGraphics.noStroke();
  overlayGraphics.ellipse(
    overlayGraphics.width / 2,
    overlayGraphics.height / 2,
    overlayGraphics.width * 0.5,
    overlayGraphics.height * 0.5
  ); // 畫一個紅色圓形
}

function draw() {
  background('#ffc2d1'); // 確保背景顏色一致

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

  // 顯示 Graphics 在視訊上方
  image(
    overlayGraphics,
    (width - capture.width) / 2, // 計算 Graphics 的水平居中位置
    (height - capture.height) / 2, // 計算 Graphics 的垂直居中位置
    capture.width,
    capture.height
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 更新影像大小
  overlayGraphics = createGraphics(capture.width, capture.height); // 更新 Graphics 大小
  overlayGraphics.fill(255, 0, 0, 150); // 半透明紅色
  overlayGraphics.noStroke();
  overlayGraphics.ellipse(
    overlayGraphics.width / 2,
    overlayGraphics.height / 2,
    overlayGraphics.width * 0.5,
    overlayGraphics.height * 0.5
  ); // 重新繪製紅色圓形
}
