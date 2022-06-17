//唇の色
let mouthColor = 'rgba(255,0,0,0.2)'
let eyeClolor = 'rgb(255,0,0)'

const cameraSize = { w: 350, h: 300 };

//ビデオ要素
const video = document.createElement('video');
video.id = 'video';
video.width = cameraSize.w;
video.height = cameraSize.h;
video.setAttribute( 'autoplay', true ); 
video.setAttribute( 'muted', '' ); 
video.setAttribute( 'playsinline', '' );
document.getElementById( 'videoPreview' ).appendChild( video );

//ビデオ要素canvas
const videoContext = createCanvas(cameraSize.w, cameraSize.h, "videoCanvas")

//口要素canvas
const mouthContext = createCanvas(cameraSize.w, cameraSize.h, "mouthCanvas")

//目要素canvas
const eyeContext = createCanvas(cameraSize.w, cameraSize.h, "eyeCanvas")

let targetParts = []
let p = []

let canvasDrawId

//カメラ表示
window.onload = function () {
	videoDraw()
	videoCanvasDraw()
	function videoCanvasDraw() {
		videoContext.drawImage(video, 0, 0, cameraSize.w, cameraSize.h);
		requestAnimationFrame(videoCanvasDraw);
	}
}

//表示
function pickup(target) {
	function canvasDraw() {
		recognition()
		canvasDrawId = requestAnimationFrame(canvasDraw);
	}
	//表示されているかどうか
	if (targetParts.includes(target)) {
		targetParts = targetParts.filter(function (v) {
			return !target.includes(v)
		})
		cancelAnimationFrame(canvasDrawId);
	} else {
		targetParts.push(target)
		canvasDraw();
	}
}

function takePicture() {
	function concatCanvas(context) {
		const img = new Image
		img.src = context.canvas.toDataURL()
		return img
	}

	const resultContext = document.getElementById('resultCanvas').getContext('2d')

	const imgs = [concatCanvas(videoContext).src, concatCanvas(mouthContext).src, concatCanvas(eyeContext).src]

	const loadImage = url => {
		return new Promise((resolve) => {
			const img = new Image();
			img.onload = () => resolve(img);
			img.src = url;
		});
	};

	Promise.all(imgs.map(loadImage)).then(imgs => {
		imgs.forEach(img => {
			resultContext.drawImage(img, 0, 0, cameraSize.w, cameraSize.h);
		});
		save()
	});

	function save() {
		const result = document.getElementById('resultCanvas')
		const downloadLink = document.getElementById('download_link');
		downloadLink.href = result.toDataURL('image/png');
		downloadLink.download = 'result.png';
		downloadLink.click();
	}
	// const downloadLink = document.getElementById('download_link');
	// downloadLink.href = result.toDataURL('image/png');
	// downloadLink.download = 'result.png';
	// downloadLink.click();

}


function changeColor() {
	function hex2rgb(hex) {
		if (hex.slice(0, 1) == "#") hex = hex.slice(1);
		if (hex.length == 3) hex = hex.slice(0, 1) + hex.slice(0, 1) + hex.slice(1, 2) + hex.slice(1, 2) + hex.slice(2, 3) + hex.slice(2, 3);

		return [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)].map(function (str) {
			return parseInt(str, 16);
		});
	}
	let rgbColor = hex2rgb(document.getElementById('color').value)
	let rgbaClolor = String('rgba(' + rgbColor[0] + ',' + rgbColor[1] + ',' + rgbColor[2] + ',0.3)')

	mouthColor = rgbaClolor
	recognition()
}
