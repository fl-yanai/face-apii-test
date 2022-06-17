//顔認識の実行と認識結果の取得
async function recognition() {
	const fData = await faceapi.detectAllFaces(video).withFaceLandmarks();

	//認識結果のリサイズ
	const iSize = { width: video.width, height: video.height };
	const rData = await faceapi.resizeResults(fData, iSize);
	rData.forEach(data => { drawResult(data); });
}

//結果の描画
function drawResult(data) {
	//ランドマークの座標
	const mrks = data.landmarks.positions;
	//顔の座標
	const box = data.detection.box;

	//口
	function mouthDraw() {
		mouthContext.clearRect(box.x, box.y, box.width, box.height)
		mouthContext.lineWidth = 0;
		//開始視点(唇は48番〜67番)
		mouthContext.moveTo(Math.round(mrks[48].x), Math.round(mrks[48].y))
		mouthContext.strokeStyle = mouthColor;
		mouthContext.fillStyle = mouthColor;

		//上唇
		mouthContext.beginPath();
		for (let i = 48; i <= 53; i++) {
			const tX = Math.round(mrks[i + 1].x);
			const tY = Math.round(mrks[i + 1].y);
			mouthContext.lineTo(tX, tY);
		}
		for (let i = 63; i >= 59; i--) {
			const tX = Math.round(mrks[i + 1].x);
			const tY = Math.round(mrks[i + 1].y);
			mouthContext.lineTo(tX, tY);
		}
		mouthContext.closePath()
		mouthContext.stroke();
		mouthContext.fill();

		//下唇
		mouthContext.beginPath();
		for (let i = 58; i >= 53; i--) {
			const tX = Math.round(mrks[i + 1].x);
			const tY = Math.round(mrks[i + 1].y);
			mouthContext.lineTo(tX, tY);
		}
		for (let i = 63; i <= 66; i++) {
			const tX = Math.round(mrks[i + 1].x);
			const tY = Math.round(mrks[i + 1].y);
			mouthContext.lineTo(tX, tY);
		}
		mouthContext.lineTo(Math.round(mrks[60].x), Math.round(mrks[60].y))
		mouthContext.closePath()
		mouthContext.stroke();
		mouthContext.fill();
	}

	//目
	function eyeDraw() {
		eyeContext.clearRect(box.x, box.y, box.width, box.height);
		eyeContext.lineWidth = 2;
		eyeContext.strokeStyle = eyeClolor;

		//右目(36~41)
		eyeContext.beginPath();
		eyeContext.moveTo(Math.round(mrks[36].x), Math.round(mrks[36].y))
		for (let i = 36; i <= 38; i++) {
			eyeContext.lineTo(Math.round(mrks[i + 1].x), Math.round(mrks[i + 1].y))
		}
		eyeContext.lineTo(Math.round(mrks[39].x), Math.round(mrks[39].y))
		eyeContext.stroke();

		//左目(42~47)
		eyeContext.beginPath();
		eyeContext.moveTo(Math.round(mrks[42].x), Math.round(mrks[42].y))
		for (let i = 42; i <= 44; i++) {
			eyeContext.lineTo(Math.round(mrks[i + 1].x), Math.round(mrks[i + 1].y))
		}
		eyeContext.stroke();
	}

	if (targetParts.includes('mouth')) {
		mouthDraw()
	}else{
		mouthContext.clearRect(box.x, box.y, box.width, box.height)
	}

	if (targetParts.includes('eye')) {
		eyeDraw()
	}else{
		eyeContext.clearRect(box.x, box.y, box.width, box.height)
	}
}