function createCanvas(width, height, id) {
    const canvas = document.createElement('canvas');
    canvas.classList.add('canvas');
    canvas.id = id;
    canvas.width = width;
    canvas.height = height;
    document.getElementById('canvasPreview').appendChild(canvas);

    const context = canvas.getContext('2d');

    return context
}