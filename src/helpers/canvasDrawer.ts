import * as PDFJS from "pdfjs-dist";
import {YesOrNo} from "../types";

export const canvasDrawer = (
    file: File, canvas: any,
    newCanvas = null as unknown as HTMLCanvasElement,
    getHeightWidth: any = null,
    bleedSize: number = 0.125,
    showFold: YesOrNo
) => {
    let canvasEl = newCanvas ?? canvas.value;
    const ctx = canvasEl.getContext("2d") as unknown as CanvasRenderingContext2D;

    canvasEl.title = file.name;
    canvasEl.dataset.type = file.type;

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

                bleedSize = Number(bleedSize)


                // canvasEl.moveTo(10, 10);
                const bleed = bleedSize * 96;

                ctx.font = `600 ${bleedSize === 0.125 ? 7 : 14}px Quicksand`;
                ctx.fillStyle = "#00ab3c"
                ctx.fillText('Bleed Zone', bleedSize === 1 ? bleed * 0.05 : 1, bleedSize === 1 ? bleed * 0.15 : 4.5);

                ctx.strokeStyle = "#FF0000";
                ctx.strokeRect(bleed / 2, bleed / 2, image.width - bleed, image.height - bleed);

                ctx.fillStyle = "#FF0000"
                ctx.fillText('Trim Line', bleed / 1.85, bleedSize === 1 ? bleed / 1.5 : bleed / 0.99);


                ctx.strokeStyle = "#0000FF";
                ctx.strokeRect(
                    bleed,
                    bleed,
                    image.width - (bleed * 2),
                    image.height - (bleed * 2)
                );

                ctx.fillStyle = "#0000FF"
                ctx.fillText('Safe Zone',
                    bleedSize === 1 ? bleed + bleed * 0.05 : bleed + 2,
                    bleedSize === 1 ? bleed + bleed * 0.15 : bleed + 7);


                if (showFold === "yes") {
                    ctx.beginPath();
                    ctx.strokeStyle = "#686868"
                    ctx.moveTo(image.width / 2, 0);
                    ctx.lineTo(image.width / 2, image.height);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.strokeStyle = "#686868"
                    ctx.moveTo(0, image.height / 2);
                    ctx.lineTo(image.width, image.height / 2);
                    ctx.stroke();
                }

                ctx.fill();
                ctx.stroke();

                resolve(canvasEl)
            };
        } catch (e) {
            reject(e)
        }
    })

}

export const makeFileFromCanvas = (drawnCanvas: HTMLCanvasElement) => {
    return new Promise((resolve, reject) => {
        try {
            drawnCanvas.toBlob((blob: any) => {
                const canvasFile = new File([blob],
                    drawnCanvas?.title !== ''
                        ? drawnCanvas?.title
                        : `${(new Date().getTime())}${blob.type.replace("image/", '.')}`,
                    {type: blob.type});
                resolve(canvasFile);
            }, drawnCanvas.dataset.type)
        } catch (e) {
            reject(e)
        }
    })
}

export const getFilesFromPDF = async (pdfFile: any) => {

    const pdfURL = URL.createObjectURL(pdfFile);

    const pdf = await PDFJS.getDocument(pdfURL).promise;

    const filesArray = Array(pdf.numPages).fill(null).map(async (item, index) => {
        const canvasPDF = document.createElement("canvas") as HTMLCanvasElement;
        const context = canvasPDF.getContext("2d");

        const pdfPage = await pdf.getPage(index + 1)

        const operatorList = await pdfPage.getOperatorList();

        const validObjectTypes = [
            PDFJS.OPS.paintImageXObject, // 85
            PDFJS.OPS.paintImageXObjectRepeat, // 88
            PDFJS.OPS.paintJpegXObject //82
        ];

        // console.log(await pdfPage.getOperatorList())
        // console.log(PDFJS.OPS.paintJpegXObject)
        // console.log(pdfPage)
        // console.log(await pdfPage.objs)
        const viewport = pdfPage.getViewport({scale: 0.7500001});

        canvasPDF.height = Math.floor(viewport.height);
        canvasPDF.width = Math.floor(viewport.width);

        const renderContext: any = {
            canvasContext: context,
            viewport: viewport,
        };

        await pdfPage.render(renderContext).promise

        return await makeFileFromCanvas(canvasPDF) as File
    })

    return await Promise.all(filesArray)
}