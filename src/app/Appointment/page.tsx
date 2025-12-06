"use client";

import React, { useState, useRef, JSX } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

// ✅ Components
import UploadSection from "../../../componets/AppointmentLetter/UploadSection";
import EmployeeForm from "../../../componets/AppointmentLetter/EmployeeForm";
import ActionButtons from "../../../componets/AppointmentLetter/ActionButtons";
import InstructionCard from "../../../componets/AppointmentLetter/InstructionCard";
import AvatarScene from "../../../componets/AppointmentLetter/AvatarScene.tsx";

interface EmployeeData {
  date: string;
  name: string;
  phone: string;
  position: string;
  totalSalary: string;
  joiningDate: string;
  probationMonths: string;
  address: string;
  commencementDate: string;
}

// 🔹 Helper to draw multi-line / wrapped text
const drawWrappedText = (
  page: any,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  options: { size: number; font: any; color: any },
  lineHeight: number = options.size + 2
) => {
  if (!text) return;

  const words = text.split(" ");
  let line = "";
  let currentY = y;

  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    const testWidth = options.font.widthOfTextAtSize(
      testLine,
      options.size
    );

    if (testWidth > maxWidth && line) {
      page.drawText(line, { x, y: currentY, ...options });
      line = word;
      currentY -= lineHeight; // go DOWN to next line
    } else {
      line = testLine;
    }
  }

  if (line) {
    page.drawText(line, { x, y: currentY, ...options });
  }
};

export default function AppointmentLetterPage(): JSX.Element {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [editedPdfUrl, setEditedPdfUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [data, setData] = useState<EmployeeData>({
    date: "",
    name: "",
    phone: "",
    position: "",
    totalSalary: "",
    joiningDate: "",
    probationMonths: "",
    address: "",
    commencementDate: "",
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null) as React.RefObject<HTMLInputElement>;

  // ✅ Upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  // ✅ Input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): void => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // ✅ Format date as DD/MM/YYYY
  const formatDate = (dateStr: string): string => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;
  };

  // ✅ Currency formatter
  const formatCurrency = (value: number): string =>
    value.toLocaleString("en-IN", { maximumFractionDigits: 0 });

  // ✅ PDF Fill
  const fillPdfTemplate = async (pdfBytes: ArrayBuffer): Promise<Uint8Array> => {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();

    // Ensure at least 5 pages
    while (pages.length < 5) pdfDoc.addPage();

    const firstPage = pages[0];
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const textOptions = { size: 10, font, color: rgb(0, 0, 0) };
    const { height } = firstPage.getSize();

    // 🗓️ Date
    firstPage.drawText(formatDate(data.date), {
      x: 345,
      y: height - 358,
      ...textOptions,
    });

    // 👤 Name / Position / Salary
    firstPage.drawText(data.name, { x: 100, y: height - 262, ...textOptions });

    // 🔹 Position near the top paragraph (wrapped)
    drawWrappedText(
      firstPage,
      data.position,
      288,              // same X as before
      height - 296,     // same Y as before
      230,              // max width in that line
      textOptions
    );

    // 🔹 Position in the commencement section (wrapped)
    drawWrappedText(
      firstPage,
      data.position,
      180,              // same X as before
      height - 402,     // same Y as before
      260,              // little wider area here
      textOptions
    );

    firstPage.drawText(formatDate(data.joiningDate), {
      x: 460,
      y: height - 214,
      ...textOptions,
    });

    // 🧾 Probation Period
    firstPage.drawText(`${data.probationMonths}`, {
      x: 205,
      y: height - 548,
      ...textOptions,
      size: 11,
    });

    // 📄 PAGE 4 → Salary Breakdown Table
    const fourthPage = pdfDoc.getPages()[3];
    const { height: h4 } = fourthPage.getSize();

    const totalSalary = parseFloat(data.totalSalary || "0");
    const basic = totalSalary * 0.5;
    const hra = basic * 0.4;
    const conveyance = 1600;
    const specialAllowance = totalSalary - (basic + hra + conveyance);
    const annualMultiplier = 12;

    const startY = h4 - 549.6;
    const labelOptions = { size: 11.5, font, color: rgb(0, 0, 0) };
    const valueOptions = { size: 11.5, font, color: rgb(0, 0, 0) };

    const drawRow = (
      label: string,
      monthly: string,
      annual: string,
      y: number,
      bold = false
    ): void => {
      fourthPage.drawText(label, {
        x: 70,
        y,
        ...(bold ? { ...labelOptions, font: fontBold, size: 12 } : labelOptions),
      });
      fourthPage.drawText(monthly, {
        x: 290,
        y,
        ...(bold ? { ...valueOptions, font: fontBold, size: 12 } : valueOptions),
      });
      fourthPage.drawText(annual, {
        x: 430,
        y,
        ...(bold ? { ...valueOptions, font: fontBold, size: 12 } : valueOptions),
      });
    };

    const gap = 19.5;
    const yFixedHeader = startY;

    const yBasic = yFixedHeader - 25;
    drawRow("", formatCurrency(basic), formatCurrency(basic * annualMultiplier), yBasic);

    const yHRA = yBasic - gap;
    drawRow("", formatCurrency(hra), formatCurrency(hra * annualMultiplier), yHRA);

    const yConveyance = yHRA - gap;
    drawRow("", formatCurrency(conveyance), formatCurrency(conveyance * annualMultiplier), yConveyance);

    const ySpecial = yConveyance - gap;
    drawRow("", formatCurrency(specialAllowance), formatCurrency(specialAllowance * annualMultiplier), ySpecial);

    const yTotal = ySpecial - gap * 0.8;
    drawRow("", formatCurrency(totalSalary), formatCurrency(totalSalary * annualMultiplier), yTotal, true);

    const yIncentives = yTotal - gap;
    drawRow("", "-", "-", yIncentives);

    const yCTC = yIncentives - gap;
    drawRow("", formatCurrency(totalSalary), formatCurrency(totalSalary * annualMultiplier), yCTC, true);

    // 📄 PAGE 5 → "Salary & Bonus Structure"
    const fifthPage = pdfDoc.getPages()[4];
    const { height: h5 } = fifthPage.getSize();

    const totalLPA = (totalSalary * 12) / 100000;

    fifthPage.drawRectangle({
      x: 158,
      y: h5 - 725,
      width: 120,
      height: 16,
      color: rgb(1, 1, 1),
    });

    fifthPage.drawText(`INR ${totalLPA.toFixed(2)} LPA`, {
      x: 170,
      y: h5 - 128,
      size: 12,
      font: fontBold,
      color: rgb(0, 0, 0),
    });

    const updatedPdfBytes = await pdfDoc.save();
    return updatedPdfBytes;
  };

  // ✅ Generate PDF
  const handleSubmit = async (): Promise<void> => {
    if (!pdfFile) {
      alert("Please upload a PDF first.");
      return;
    }
    setIsProcessing(true);
    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const editedBytes = await fillPdfTemplate(arrayBuffer);

      // Create blob directly from Uint8Array
      const buffer = Buffer.from(editedBytes);
      const blob = new Blob([buffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setEditedPdfUrl(url);
      alert("✅ Appointment Letter generated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error generating the PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  // ✅ Download
  const downloadPdf = (): void => {
    if (!editedPdfUrl) return;
    const link = document.createElement("a");
    link.href = editedPdfUrl;
    link.download = `${data.name || "Appointment_Letter"}.pdf`;
    link.click();
  };

  // ✅ Reset
  const resetForm = (): void => {
    setPdfFile(null);
    setEditedPdfUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 md:p-10 flex flex-col md:flex-row items-start justify-between gap-10">
      <div className="flex-1 bg-gray-300 rounded-2xl shadow-xl p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-10">
          Appointment Letter Generator
        </h1>

        <UploadSection
          pdfFile={pdfFile}
          onUpload={handleFileUpload}
          fileInputRef={fileInputRef}
        />
        <EmployeeForm data={data} handleChange={handleChange} />
        <ActionButtons
          onGenerate={handleSubmit}
          onDownload={downloadPdf}
          onReset={resetForm}
          isProcessing={isProcessing}
          hasPdf={!!pdfFile}
          canDownload={!!editedPdfUrl}
        />
        <InstructionCard />
      </div>

      <div className="w-full md:w-[380px] h-[820px] flex justify-center items-center mt-5 md:mt-0">
        <AvatarScene />
      </div>
    </div>
  );
}
