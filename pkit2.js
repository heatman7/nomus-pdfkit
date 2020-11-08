const PDFDocument = require("pdfkit");
const fs = require("fs");




const makePDFArray = (designObject) => {


    if (designObject.orientation == 'horizontal') {
        const DOC_WIDTH_MM = 480;
        const DOC_HEIGHT_MM = 325.4;
        const MM_TO_PX = 3.78;
        const CARDS_TO_SHEETS = 0.04
        const sheetCount = designObject.cardCount * CARDS_TO_SHEETS
        // Create a document
        // for (let i = 0; i < sheetCount; i += 1) { loop attempt to create multiple sheets
        const doc = new PDFDocument({
            size: [DOC_WIDTH_MM * MM_TO_PX, DOC_HEIGHT_MM * MM_TO_PX],
        });

        // Pipe its output somewhere, like to a file or HTTP response
        // See below for browser usage

        doc.pipe(fs.createWriteStream(`${designObject.name}array.pdf`));

        const width = 93 * MM_TO_PX;
        const height = 54 * MM_TO_PX;

        for (let x = 7.5 * MM_TO_PX, i = 0; i < 5; x += 93 * MM_TO_PX, i += 1) {
            for (let y = 15 * MM_TO_PX, j = 0; j < 5; y += 54 * MM_TO_PX, j += 1) {
                doc
                    .image(designObject.frontImagePath, x, y, {
                        align: "center",
                        valign: "center",
                        width,
                        height,
                    })
                    .rect(x, y, width, height)
                    ;
            }
        }
        doc.image('./cropMarks.png', x = 0, y = 0)
        doc.addPage();

        for (let x = 7.5 * MM_TO_PX, i = 0; i < 5; x += 93 * MM_TO_PX, i += 1) {
            for (let y = 15 * MM_TO_PX, j = 0; j < 5; y += 54 * MM_TO_PX, j += 1) {
                doc
                    .image(designObject.backImagePath, x, y, {
                        align: "center",
                        valign: "center",
                        width,
                        height,
                    })
                    .rect(x, y, width, height)
                    ;
            }
        }
        doc.image('./cropMarks.png', x = 0, y = 0)
        // if (i == sheetCount) { return promise } was trying to make condition check for loop finish to return promise to end doc
        doc.end();
        // }

    }

    // else if (designObject.orientation== 'horizontal') {
    //     const doc = new PDFDocument({
    //     size: [DOC_WIDTH_MM * MM_TO_PX, DOC_HEIGHT_MM * MM_TO_PX],
    // });
    // }) }

    else {
        const DOC_WIDTH_MM = 325.4;
        const DOC_HEIGHT_MM = 480;
        const MM_TO_PX = 3.78;
        const CARDS_TO_SHEETS = 0.04
        const sheetCount = designObject.cardCount * CARDS_TO_SHEETS

        // for (let i = 0; i < sheetCount; i++) { loop attempt
        const doc = new PDFDocument({
            size: [DOC_WIDTH_MM * MM_TO_PX, DOC_HEIGHT_MM * MM_TO_PX],
        });
        const width = 54 * MM_TO_PX;
        const height = 93 * MM_TO_PX;

        for (let x = 15 * MM_TO_PX, j = 0; j < 5; x += 54 * MM_TO_PX, j += 1) {
            for (let y = 7.5 * MM_TO_PX, i = 0; i < 5; y += 93 * MM_TO_PX, i += 1) {
                doc
                    // .image(designObject.frontImagePath, x, y, {
                    //     align: "center",
                    //     valign: "center",
                    //     width,
                    //     height,
                    // })
                    .rect(x, y, width, height)
                    .stroke();
            }
        }
        doc.image('./cropMarks.png')
        doc.addPage();

        for (let x = 15 * MM_TO_PX, j = 0; j < 5; x += 54 * MM_TO_PX, j += 1) {
            for (let y = 7.5 * MM_TO_PX, i = 0; i < 5; y += 93 * MM_TO_PX, i += 1) {
                doc
                    // .image(designObject.backImagePath, x, y, {
                    //     align: "center",
                    //     valign: "center",
                    //     width,
                    //     height,
                    // })
                    .rect(x, y, width, height)
                    ;
            }
        }

        // Embed a font, set the font size, and render some text -was using this for else testing
        // doc
        //     .text('Else is working!', 100, 100);

        doc.image('./cropMarks.png')
        doc.pipe(fs.createWriteStream(`${designObject.name}array.pdf`));
        doc.end();
    }
    // }
};

orderDesign1 = { name: "nomusDesign", frontImagePath: "front2.png", backImagePath: "back2.png", orientation: 'horizontal', cardCount: 50 };
orderDesign2 = { name: "mbca", frontImagePath: "abcf.png", backImagePath: "abcb.png", orientation: 'horizontal', cardCount: 50 };




makePDFArray(orderDesign1)



