/*
PDF SAMPLE
https://github.com/mozilla/pdf.js/files/6793219/pdf-test.pdf
*/

import * as PDFJS from "pdfjs-dist";
// @ts-ignore
import pdfJsWorker from 'pdfjs-dist/build/pdf.worker.entry.js'
import {makeFileFromCanvas} from "./canvasDrawer";

PDFJS.GlobalWorkerOptions.workerSrc = pdfJsWorker


const addAlphaChannelToUnit8ClampedArray = (unit8Array: Array<Uint8ClampedArray>, imageWidth: number, imageHeight: number) => {
    const newImageData = new Uint8ClampedArray(imageWidth * imageHeight * 4) as any;

    for (let j = 0, k = 0, jj = imageWidth * imageHeight * 4; j < jj;) {
        newImageData[j++] = unit8Array[k++];
        newImageData[j++] = unit8Array[k++];
        newImageData[j++] = unit8Array[k++];
        newImageData[j++] = 255;
    }

    return newImageData;
}

async function getPageImages(pageNum: number, pdfDocumentInstance: any) {
    try {
        const pdfPage = await pdfDocumentInstance.getPage(pageNum);
        const operatorList = await pdfPage.getOperatorList();

        const validObjectTypes = [
            PDFJS.OPS.paintImageXObject, // 85
            PDFJS.OPS.paintImageXObjectRepeat, // 88
            PDFJS.OPS.paintJpegXObject //82
        ];
        console.log(operatorList)

        return operatorList.fnArray
            .reduce(async (acc: any, element: any, idx: number) => {
                if (validObjectTypes.includes(element)) {
                    const imageName = operatorList.argsArray[idx][0];
                    console.log(pdfPage.objs)
                    const image = await pdfPage.objs.get(imageName);

                    // Uint8ClampedArray
                    const imageUnit8Array = image.data;
                    const imageWidth = image.width;
                    const imageHeight = image.height;
                    console.log('image', imageUnit8Array);


                    // imageUnit8Array contains only RGB need add alphaChanel
                    const imageUint8ArrayWithAlphaChanel = addAlphaChannelToUnit8ClampedArray(imageUnit8Array, imageWidth, imageHeight);

                    const imageData = new ImageData(imageUint8ArrayWithAlphaChanel, imageWidth, imageHeight);

                    const blob = await new Blob([imageData.data.buffer])

                    console.log(blob)
                    var arr = (new Uint8Array(imageData.data.buffer)).subarray(0, 4);
                    console.log(arr)
                    var header = "";
                    for(var i = 0; i < arr.length; i++) {
                        header += arr[i].toString(16);
                    }

                    console.log(header)

                    // acc = new File([image], `${(new Date().getTime())}.png`,
                    //     {type: 'image/png'});


                    console.log(imageData)
                    const canvas: HTMLCanvasElement = document.createElement('canvas');
                    canvas.width = imageWidth;
                    canvas.height = imageHeight;
                    canvas.dataset.type = "image/jpeg";
                    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
                    ctx.putImageData(imageData, 0, 0);


                    acc = await makeFileFromCanvas(canvas)
                }
                return acc;
            });
    } catch (error) {
        console.log(error);
    }
}

export const onLoadPdfFile = async (event: any, callback: any) => {
    try {
        // turn array buffer into typed array
        const typedArray = new Uint8Array(event.target.result);

        const loadingPdfDocument = PDFJS.getDocument(typedArray);
        const pdfDocumentInstance = await loadingPdfDocument.promise;

        const totalNumPages = pdfDocumentInstance.numPages;
        const pagesPromises = [];

        for (let currentPage = 1; currentPage <= totalNumPages; currentPage += 1) {
            pagesPromises.push(getPageImages(currentPage, pdfDocumentInstance));
        }

        const pagesData = await Promise.all(pagesPromises);


        callback(pagesData)
        // console.log(pagesData);

    } catch (error) {
        console.log(error);
    }
};


// document.getElementById('file-pdf').addEventListener('change', event => {
//     const file = event.target.files[0];
//
//     if (file.type !== 'application/pdf') {
//         alert(`File ${file.name} is not a PDF file type`);
//         return;
//     }
//

// });
