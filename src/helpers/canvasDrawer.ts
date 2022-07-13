export const canvasDrawer = (file: File, canvas: any, newCanvas = null as unknown as HTMLCanvasElement, getHeightWidth: any = null) => {
    let canvasEl = newCanvas ?? canvas.value;
    const ctx = canvasEl.getContext("2d") as unknown as CanvasRenderingContext2D;

    const image: HTMLImageElement = new Image();

    const reader = new FileReader();

    reader.onload = function () {
        if (typeof reader.result === "string") {
            image.src = reader.result;
        }
    };
    reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
        try {
            image.onload = function () {
                canvasEl.width = image.width;
                canvasEl.height = image.height;

                if (!newCanvas) {
                    getHeightWidth({width: image.width, height: image.height})
                    // imageSize.width = image.width;
                    // imageSize.height = image.height;
                }

                //draw background image
                ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height);

                ctx.beginPath();
                // canvasEl.moveTo(10, 10);
                const bleed = 0.125 * 96;
                ctx.strokeStyle = "#FF0000";
                ctx.strokeRect(bleed, bleed, image.width - bleed * 2, image.height - bleed * 2);
                ctx.strokeStyle = "#0000FF";
                ctx.strokeRect(bleed * 2, bleed * 2, image.width - bleed * 4, image.height - bleed * 4);
                ctx.fill();
                ctx.stroke();

                resolve(canvasEl)
            };
        } catch (e) {
            reject(e)
        }
    })

}

export const makeFileFromCanvas = (drawnCanvas: any) => {
    return new Promise((resolve, reject) => {
        try {
            drawnCanvas.toBlob((blob: any) => {
                const canvasFile = new File([blob], drawnCanvas.title);
                resolve(canvasFile);
            })
        } catch (e) {
            reject(e)
        }
    })
}