const PDFDocument = require("pdfkit");
const fs = require("fs");

const DOC_WIDTH_MM = 480;
const DOC_HEIGHT_MM = 300;
const MM_TO_PX = 3.78;

// Create a document
const doc = new PDFDocument({
  size: [DOC_WIDTH_MM * MM_TO_PX, DOC_HEIGHT_MM * MM_TO_PX],
});

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream("test.pdf"));

const width = 93 * MM_TO_PX;
const height = 54 * MM_TO_PX;

for (let x = 7.5 * MM_TO_PX, i = 0; i < 5; x += 93 * MM_TO_PX, i += 1) {
  for (let y = 15 * MM_TO_PX, j = 0; j < 5; y += 54 * MM_TO_PX, j += 1) {
    doc
      .image("back.png", x, y, {
        align: "center",
        valign: "center",
        width,
        height,
      })
      .rect(x, y, width, height)
      .stroke();
  }
}

doc.addPage();

for (let x = 7.5 * MM_TO_PX, i = 0; i < 5; x += 93 * MM_TO_PX, i += 1) {
  for (let y = 15 * MM_TO_PX, j = 0; j < 5; y += 54 * MM_TO_PX, j += 1) {
    doc
      .image("front.png", x, y, {
        align: "center",
        valign: "center",
        width,
        height,
      })
      .rect(x, y, width, height)
      .stroke();
  }
}

doc.end();