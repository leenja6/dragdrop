export function ghostImg(e){
    const img = document.createElement("img");
    img.src ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgqAcAAIIAgLO2btEAAAAASUVORK5CYII="
    e.dataTransfer.setDragImage(img, 0, 0)
}
