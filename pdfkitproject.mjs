const PDFDocument = require('pdfkit');
import { createRequire } from 'module';
const require = createRequire(import.meta.url);


// Create a document
const doc = new PDFDocument();

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream('output.pdf'));

// Add an image, constrain it to a given size, and center it vertically and horizontally
doc.image('./front.png', {
  fit: [250, 300],
  align: 'center',
  valign: 'center'
});


// Add another image
doc.image('./back.png', {
  fit: [250, 300],
  align: 'center',
  valign: 'center'
});


// Finalize PDF file
doc.end();

