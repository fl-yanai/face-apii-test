//学習用データを読み込む
Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri('./weights'),
    faceapi.nets.tinyFaceDetector.loadFromUri('./weights'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./weights'),
]);