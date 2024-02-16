// PDFViewer.js
import React, { useMemo, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ base64Data, onTextSelect }) => {
  const [numPages, setNumPages] = useState();
  const file = useMemo(() => ({ data: atob(base64Data) }), [base64Data]);
  const options = useMemo(() => ({ workerSrc: "/pdf.worker.js" }), []);
  const [selectedText, setSelectedText] = useState('');

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleTextSelection = () => {
    const textLayer = document.querySelector('.react-pdf__Page__textContent');
    textLayer.addEventListener('mouseup', () => {
      const selection = window.getSelection();
      setSelectedText(selection.toString());
      onTextSelect(selection.toString());
    });
  };

  const renderPages = () => {
    const pages = [];
    for (let i = 1; i <= numPages; i++) {
      pages.push(
        <Page
          key={`page_${i}`}
          pageNumber={i}
          renderAnnotationLayer={true}
          renderTextLayer={true}
          onLoadSuccess={handleTextSelection}
        />
      );
    }
    return pages;
  };

  return (
    <div className="p-2 mb-2 bg-dark-subtle text-black">
      <div className="pdf-container">
        <Document 
          file={file} // Decode base64 data
          options={options}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {renderPages()}
        </Document>
      </div>
    </div>
  );
};

export default PDFViewer;
