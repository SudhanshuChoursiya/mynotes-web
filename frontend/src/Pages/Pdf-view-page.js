import "./Pdf-view-page.css";
import React, { useState, useEffect } from "react";
import PdfViewer from "../Components/Pdf_viewer.js";

const PdfViewPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behaviour: "smooth" });
  }, []);

  return (
    <>
      <div className="react-pdf-viewer-container">
        <PdfViewer />
      </div>
    </>
  );
};

export default PdfViewPage;
