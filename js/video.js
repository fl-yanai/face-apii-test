//canvasにカメラの映像を描画
function videoDraw() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
    }).then(function (stream) {
        video.srcObject = stream;
    });
}