import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PDFViewer from './PDFViewer';
import { useNavigate } from 'react-router-dom';

const Redaction = () => {
  const [pdfData, setPdfData] = useState([]);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [selectedText, setSelectedText] = useState('Nothing is selected yet');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRedactionActive, setIsRedactionActive] = useState(false); // Step 1: State for redaction activation
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate("/login");
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]); 

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/pdfs');
      setPdfData(response.data);
    } catch (error) {
      console.error('Error fetching PDF data:', error);
    }
  };

  const handleViewPDF = (base64Data) => {
    setSelectedPDF(base64Data);
  };

  const handleTextSelect = (text) => {
    setSelectedText(text);
  };

  const doRedaction = () => {
    if (selectedPDF && selectedText) {
      const regex = new RegExp(selectedText, 'g');
      const redactedPDF = selectedPDF.replace(regex, 'X');
      setSelectedPDF(redactedPDF);
      console.log(redactedPDF)
      console.log("redaction completed")
    }
  };
  

  const reset = () => {
    setSelectedPDF(null);
    setSelectedText('Nothing is selected yet');
  };

  return (
    <div className='container text-center p-4'>
      {isAuthenticated ?( <table className='table table-hover'>
        <thead>
          <tr>
            <th>Sr</th>
            <th>DocId</th>
            <th>Doc Title</th>
            <th>View PDF</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {pdfData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.docId}</td>
              <td>{item.doc_title}</td>
              <td>
                <button className="btn btn-outline-success rounded-pill" onClick={() => handleViewPDF(item.base64Data)}>View PDF</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      ) : null}
      <div className=''>
        <div className='d-flex gap-4'>
        {selectedPDF && <PDFViewer base64Data={selectedPDF} onTextSelect={handleTextSelect} selectedText={selectedText} />} {/* Step 2: Pass selectedText to PDFViewer */}
        {selectedPDF && <p>Selected Text: {selectedText}</p>}
        </div>
        <button className='btn btn-outline-primary rounded-pill m-2 p-2' onClick={doRedaction}>Do Redaction</button>
        <button className='btn btn-outline-warning rounded-pill m-2 p-2' onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default Redaction;
