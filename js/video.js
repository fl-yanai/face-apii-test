//canvasにカメラの映像を描画
function videoDraw() {
    navigator.mediaDevices.getUserMedia({
        facingMode: 'user',
        audio: false,
        video: true,
    }).then(function (stream) {
        video.srcObject = stream;
    });
}