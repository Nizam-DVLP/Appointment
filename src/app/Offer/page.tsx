"use client";

import React, { useState, useRef, useEffect } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
// Hello world 
// ✅ Component Imports
import UploadSection from "../../../componets/OfferLetter/UploadSection";
import EmployeeForm from "../../../componets/OfferLetter/EmployeeForm";
import ActionButtons from "../../../componets/OfferLetter/ActionButtons";
import InstructionsBox from "../../../componets/OfferLetter/InstructionsBox";
import Avatar from "../../../componets/OfferLetter/Redirect";

export default function AppointmentLetterGenerator() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    position: "Business Development Associate",
    probationPeriod: "3-6 months",
    salary: "",
    joiningDate: "",
    positionBranch: "Bengaluru",
    modeOfWork: "Inhouse",
    currentDate: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
  });

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [editedPdfUrl, setEditedPdfUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (editedPdfUrl) URL.revokeObjectURL(editedPdfUrl);
    };
  }, [editedPdfUrl]);

  // ✅ Handle form data change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle PDF upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      setEditedPdfUrl(null);
    } else {
      alert("Please select a valid PDF file");
    }
  };

  // ✅ Fill the PDF with form data
  const fillPdfTemplate = async () => {
    if (!pdfFile) return alert("Please upload a PDF template first");
    if (!data.name || !data.joiningDate || !data.salary)
      return alert("Please fill Name, Joining Date, and Salary fields");

    setIsProcessing(true);
    try {
      const pdfBytes = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const { height } = firstPage.getSize();

      // ✅ Mapping text to coordinates
      const textMappings = [
        { text: data.currentDate, x: 475, y: height - 230, size: 11, font },
        { text: data.name, x: 95, y: height - 258, size: 12,font:boldFont },
        { text: data.position, x: 250, y: height - 325, size: 12, font: boldFont },
        { text: data.joiningDate, x: 250, y: height - 338, size: 11, font },
        { text: data.joiningDate, x: 340, y: height - 406, size: 11, font: boldFont },
        { text: `INR ${data.salary}`, x: 165, y: height - 555, size: 10, font },
        { text: data.positionBranch, x: 250, y: height - 352, size: 11, font },
        { text: data.probationPeriod, x: 165, y: height - 662, size: 11, font },
        { text: data.modeOfWork, x: 145, y: height - 568, size: 11, font },
        { text: data.message, x: 100, y: height - 470, size: 11, font },
      ];

      textMappings.forEach(({ text, x, y, size, font: textFont }) => {
        if (text?.trim()) {
          firstPage.drawText(text, {
            x,
            y,
            size,
            font: textFont,
            color: rgb(0, 0, 0),
          });
        }
      });

      // ✅ Fixed TypeScript error here
      const pdfBytesModified = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytesModified)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      if (editedPdfUrl) URL.revokeObjectURL(editedPdfUrl);
      setEditedPdfUrl(url);
    } catch (err) {
      console.error("Error editing PDF:", err);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // ✅ Handle generate button
  const handleSubmit = () => fillPdfTemplate();

  // ✅ Download generated PDF
  const downloadPdf = () => {
    if (!editedPdfUrl) return;
    const link = document.createElement("a");
    link.href = editedPdfUrl;
    link.download = `appointment-letter-${data.name.replace(/\s+/g, "-")}.pdf`;
    link.click();
  };

  // ✅ Reset form and state
  const resetForm = () => {
    setData({
      name: "",
      email: "",
      phone: "",
      message: "",
      position: "Business Development Associate",
      probationPeriod: "3-6 months",
      salary: "",
      joiningDate: "",
      positionBranch: "Bengaluru",
      modeOfWork: "Inhouse",
      currentDate: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    });
    setPdfFile(null);
    setEditedPdfUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 md:p-10 flex flex-col md:flex-row items-start justify-between gap-10 ">
      {/* Left Section - Form */}
      <div className="flex-1 bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Offer Letter Generator
        </h1>

        <UploadSection
          fileInputRef={fileInputRef}
          pdfFile={pdfFile}
          handleFileUpload={handleFileUpload}
        />

        <EmployeeForm data={data} handleChange={handleChange} />

        <ActionButtons
          isProcessing={isProcessing}
          pdfFile={pdfFile}
          editedPdfUrl={editedPdfUrl}
          onSubmit={handleSubmit}
          onDownload={downloadPdf}
          onReset={resetForm}
        />

        <InstructionsBox />
      </div>

      {/* Right Section - Avatar Dark Panel */}
      <div className="w-full md:w-1/3 bg-gray-800 rounded-2xl shadow-lg flex justify-center items-center p-8">
        <div className="text-center text-white">
          <Avatar />
        </div>
      </div>
    </div>
  );
}
