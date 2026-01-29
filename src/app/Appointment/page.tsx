"use client";

import React, { useState, JSX, useEffect } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

// Components
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

// Helper
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
    const testWidth = options.font.widthOfTextAtSize(testLine, options.size);

    if (testWidth > maxWidth && line) {
      page.drawText(line, { x, y: currentY, ...options });
      line = word;
      currentY -= lineHeight;
    } else {
      line = testLine;
    }
  }

  if (line) page.drawText(line, { x, y: currentY, ...options });
};

export default function AppointmentLetterPage(): JSX.Element {
  const [editedPdfUrl, setEditedPdfUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [templatePdf, setTemplatePdf] = useState<ArrayBuffer | null>(null);

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

  // Load template automatically
  useEffect(() => {
    fetch("/templates/mock-appointment-letter.pdf")
      .then(res => res.arrayBuffer())
      .then(buffer => setTemplatePdf(buffer));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const formatDate = (dateStr: string): string => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;
  };

  const formatCurrency = (value: number): string =>
    value.toLocaleString("en-IN", { maximumFractionDigits: 0 });

  const fillPdfTemplate = async (pdfBytes: ArrayBuffer): Promise<Uint8Array> => {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();

    while (pages.length < 5) pdfDoc.addPage();

    const firstPage = pages[0];
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const textOptions = { size: 10, font, color: rgb(0, 0, 0) };
    const { height } = firstPage.getSize();

    firstPage.drawText(formatDate(data.date), { x: 345, y: height - 358, ...textOptions });

    firstPage.drawText(data.name, {
      x: 100,
      y: height - 263,
      size: 11,
      font: fontBold,
      color: rgb(0, 0, 0),
    });

    drawWrappedText(firstPage, data.position, 288, height - 296, 230, {
      size: 11,
      font: fontBold,
      color: rgb(0, 0, 0),
    });

    drawWrappedText(firstPage, data.position, 173, height - 402, 260, {
      ...textOptions,
      font: fontBold,
      size: 11,
    });

    firstPage.drawText(formatDate(data.joiningDate), {
      x: 460,
      y: height - 214,
      ...textOptions,
    });

    firstPage.drawText(`${data.probationMonths}`, {
      x: 206,
      y: height - 548,
      ...textOptions,
      size: 11,
      font: fontBold,
    });

    const fourthPage = pdfDoc.getPages()[3];
    const { height: h4 } = fourthPage.getSize();

    const totalSalary = parseFloat(data.totalSalary || "0");
    const basic = totalSalary * 0.5;
    const hra = basic * 0.4;
    const conveyance = 1600;
    const specialAllowance = totalSalary - (basic + hra + conveyance);
    const annualMultiplier = 12;

    const startY = h4 - 549.6;

    const drawRow = (monthly: string, annual: string, y: number, bold = false) => {
      fourthPage.drawText(monthly, {
        x: 290,
        y,
        size: bold ? 12 : 11.5,
        font: bold ? fontBold : font,
        color: rgb(0, 0, 0),
      });
      fourthPage.drawText(annual, {
        x: 430,
        y,
        size: bold ? 12 : 11.5,
        font: bold ? fontBold : font,
        color: rgb(0, 0, 0),
      });
    };

    const gap = 19.5;

    drawRow(formatCurrency(basic), formatCurrency(basic * annualMultiplier), startY - 25);
    drawRow(formatCurrency(hra), formatCurrency(hra * annualMultiplier), startY - 44.5);
    drawRow(formatCurrency(conveyance), formatCurrency(conveyance * annualMultiplier), startY - 64);
    drawRow(formatCurrency(specialAllowance), formatCurrency(specialAllowance * annualMultiplier), startY - 83.5);
    drawRow(formatCurrency(totalSalary), formatCurrency(totalSalary * annualMultiplier), startY - 98, true);

    const fifthPage = pdfDoc.getPages()[4];
    const { height: h5 } = fifthPage.getSize();

    const totalLPA = (totalSalary * 12) / 100000;

    fifthPage.drawText(`INR ${totalLPA.toFixed(2)} LPA`, {
      x: 160,
      y: h5 - 127.5,
      size: 9,
      font: fontBold,
      color: rgb(0, 0, 0),
    });

    return await pdfDoc.save();
  };

  const handleSubmit = async (): Promise<void> => {
    if (!templatePdf) return alert("Template not loaded");

    setIsProcessing(true);

    try {
      const editedBytes = await fillPdfTemplate(templatePdf);
      const blob = new Blob([editedBytes], { type: "application/pdf" });
      setEditedPdfUrl(URL.createObjectURL(blob));
      alert("✅ Appointment Letter generated successfully!");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadPdf = (): void => {
    if (!editedPdfUrl) return;
    const link = document.createElement("a");
    link.href = editedPdfUrl;
    link.download = `${data.name || "Appointment_Letter"}.pdf`;
    link.click();
  };

  const resetForm = (): void => setEditedPdfUrl(null);

  return (
    <div className="min-h-screen bg-gray-900 p-6 md:p-10 flex flex-col md:flex-row items-start justify-between gap-10">
      <div className="flex-1 bg-gray-300 rounded-2xl shadow-xl p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-10">
          Appointment Letter Generator
        </h1>

        <UploadSection pdfReady={!!templatePdf} />

        <EmployeeForm data={data} handleChange={handleChange} />

        <ActionButtons
          onGenerate={handleSubmit}
          onDownload={downloadPdf}
          onReset={resetForm}
          isProcessing={isProcessing}
          hasPdf={!!templatePdf}
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
