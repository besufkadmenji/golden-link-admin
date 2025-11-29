import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { RefObject } from "react";
export const downloadPDF = async (ref: RefObject<HTMLDivElement | null>) => {
  const input = ref?.current;

  if (!input) return;

  const canvas = await html2canvas(input, {
    scale: 2,
    useCORS: true,
    allowTaint: false,
  });
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const width = pdf.internal.pageSize.getWidth();
  const height = (canvas.height * width) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, width, height);
  pdf.save("receipt.pdf");
};
