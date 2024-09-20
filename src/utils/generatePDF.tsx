import html2pdf from "html2pdf.js";
import { saveAs } from "file-saver";

const generatePDF = async (htmlContent:any, fileName:any) => {
  return new Promise((resolve, reject) => {
    const element = document.createElement("div");
    element.innerHTML = htmlContent;

    html2pdf()
      .from(element)
      .toPdf()
      .get("pdf")
      .then(function (pdf:any) {
        const blob = pdf.output("blob");
        const fileUrl = URL.createObjectURL(blob);

        // Optionally, save the PDF file locally using file-saver
        // saveAs(blob, fileName);

        resolve(fileUrl);
      })
      .catch((error:any) => {
        console.error("Error generating PDF:", error);
        reject(error);
      });
  });
};

export default generatePDF;
