/*
PDF SAMPLE
https://github.com/mozilla/pdf.js/files/6793219/pdf-test.pdf
*/

const addAlphaChannelToUnit8ClampedArray = (unit8Array: Array<Uint8ClampedArray>, imageWidth: number, imageHeight: number) =>{
    const newImageData = new Uint8ClampedArray(imageWidth * imageHeight * 4) as any;

    for (let j = 0, k = 0, jj = imageWidth * imageHeight * 4; j < jj; ) {
        newImageData[j++] = unit8Array[k++];
        newImageData[j++] = unit8Array[k++];
        newImageData[j++] = unit8Array[k++];
        newImageData[j++] = 255;
    }

    return newImageData;
}

async function getPageImages(pageNum, pdfDocumentInstance) {
    try {
        const pdfPage = await pdfDocumentInstance.getPage(pageNum);
        const operatorList = await pdfPage.getOperatorList();

        const validObjectTypes = [
            pdfjsLib.OPS.paintImageXObject, // 85
            pdfjsLib.OPS.paintImageXObjectRepeat, // 88
            pdfjsLib.OPS.paintJpegXObject //82
        ];

        operatorList.fnArray
            .forEach((element, idx) => {
                if(validObjectTypes.includes(element)) {
                    const imageName = operatorList.argsArray[idx][0];
                    console.log('page', pageNum, 'imageName', imageName);

                    pdfPage.objs.get(imageName, async (image) => {
                        // Uint8ClampedArray
                        const imageUnit8Array = image.data;
                        const imageWidth = image.width;
                        const imageHeight = image.height;
                        // console.log('image', image);

                        // imageUnit8Array contains only RGB need add alphaChanel
                        const imageUint8ArrayWithAlphaChanel = addAlphaChannelToUnit8ClampedArray(imageUnit8Array, imageWidth, imageHeight);

                        const imageData = new ImageData(imageUint8ArrayWithAlphaChanel, imageWidth, imageHeight);

                        const canvas = document.getElementById('canvas');
                        canvas.width = imageWidth;
                        canvas.height = imageHeight;
                        const ctx = canvas.getContext('2d');
                        ctx.putImageData(imageData, 0, 0);
                        // console.log('canvas > toDataURL', canvas.toDataURL());

                        const decodedData = jsQR(imageUint8ArrayWithAlphaChanel, imageWidth, imageHeight);

                        if (decodedData) {
                            const outputElement = document.getElementById('output');
                            outputElement.innerHTML += `${JSON.stringify(decodedData.data, null, 2)}\n`;
                            console.log('decodedData', decodedData.data);
                        }
                    });
                }
            });
    } catch (error) {
        console.log(error);
    }
}

const onLoadFile = async event => {
    try {
        // turn array buffer into typed array
        const typedArray = new Uint8Array(event.target.result);

        const loadingPdfDocument = pdfjsLib.getDocument(typedArray);
        const pdfDocumentInstance = await loadingPdfDocument.promise;

        const totalNumPages = pdfDocumentInstance.numPages;
        const pagesPromises = [];

        for (let currentPage = 1; currentPage <= totalNumPages; currentPage += 1) {
            pagesPromises.push(getPageImages(currentPage, pdfDocumentInstance));
        }

        const pagesData = await Promise.all(pagesPromises);
        // console.log(pagesData);

    } catch (error) {
        console.log(error);
    }
};

document.getElementById('file-pdf').addEventListener('change', event => {
    const file = event.target.files[0];

    if (file.type !== 'application/pdf') {
        alert(`File ${file.name} is not a PDF file type`);
        return;
    }

    const fileReader = new FileReader();
    fileReader.onload = onLoadFile;
    fileReader.readAsArrayBuffer(file);
});
