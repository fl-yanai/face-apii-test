const resolution = { w: 1080, h: 720 };

//canvasにカメラの映像を描画
function videoDraw() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            facingMode: 'user',
            width: { ideal: resolution.w },
            height: { ideal: resolution.h }
        }
    }).then(function (stream) {
        video.srcObject = stream;
    });
}