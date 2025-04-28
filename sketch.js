let capture;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全視窗畫布
  background('#ffc2d1'); // 設定背景顏色
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始影像，僅顯示於畫布
}

function draw() {
  background('#ffc2d1'); // 確保背景顏色一致

  push(); // 儲存當前繪圖設定
  translate(width / 2, height / 2); // 將原點移至畫布中心
  scale(-1, 1); // 水平翻轉影像
  image(
    capture,
    -capture.width / 2, // 調整影像位置以居中
    -capture.height / 2,
    capture.width,
    capture.height
  );
  pop(); // 恢復繪圖設定
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 更新影像大小
}
