import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Viewer, Worker } from "@react-pdf-viewer/core";

// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import Spinner from "./Spinner.js";
// Create new plugin instance

const PdfViewer = () => {
  const [singleFileDetails, setSingleFileDetails] = useState({});


  const params = useParams();
  const id = params.id;
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const getSingleNotes = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/single-notes/${id}`
    );

    const data = await response.json();

    setSingleFileDetails(data.singleNotes);
  };

  useEffect(() => {
    getSingleNotes();
  }, []);


  return (
    <>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.8.162/build/pdf.worker.min.js">
        <Viewer
          fileUrl={`${process.env.REACT_APP_BASE_URL}/notes-files/${singleFileDetails.file_src}`}
          plugins={[defaultLayoutPluginInstance]}
       
       renderLoader={()=><Spinner/>}/>
      </Worker>
    </>
  );
};

export default PdfViewer;
