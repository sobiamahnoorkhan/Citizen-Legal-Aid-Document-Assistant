import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { LanguageCode } from '../types';

export async function exportComplaintPDF(
  letterText: string,
  subjectText: string,
  complainantName: string,
  lang: LanguageCode = 'ur',
  elementId?: string
) {
  const sanitizeFileName = (name: string) => {
    return name.replace(/[^\w\s-]/gi, '').trim().replace(/\s+/g, '_') || 'Draft';
  };

  const fileName = `Legal_Complaint_${sanitizeFileName(complainantName)}_${lang}.pdf`;

  // 1. Try rendering the existing DOM element if ID is provided and exists
  if (elementId) {
    const targetElement = document.getElementById(elementId);
    if (targetElement) {
      try {
        const canvas = await html2canvas(targetElement, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          onclone: (clonedDoc) => {
            const clonedTarget = clonedDoc.getElementById(elementId);
            if (clonedTarget) {
              clonedTarget.style.maxHeight = 'none';
              clonedTarget.style.overflow = 'visible';
              clonedTarget.style.height = 'auto';

              // Expand any scrollable children inside the cloned element
              const scrollables = clonedTarget.querySelectorAll('.printable-text, textarea, div');
              scrollables.forEach((el: any) => {
                if (el.style) {
                  el.style.maxHeight = 'none';
                  el.style.overflow = 'visible';
                  el.style.height = 'auto';
                }
              });
            }
          },
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });

        const pageWidth = 210;
        const pageHeight = 297;
        const margin = 10;
        const imgWidth = pageWidth - margin * 2;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = margin;

        pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight - margin * 2;

        while (heightLeft > 5) {
          position = heightLeft - imgHeight + margin;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
          heightLeft -= pageHeight - margin * 2;
        }

        pdf.save(fileName);
        return;
      } catch (error) {
        console.warn('html2canvas on existing element failed, using dynamic export container:', error);
      }
    }
  }

  // 2. Dynamic Export Container: Creates an offscreen DOM element with full font & RTL support
  const isRtl = lang !== 'en';
  const dir = isRtl ? 'rtl' : 'ltr';
  const fontFamily = isRtl
    ? "'Noto Nastaliq Urdu', 'Noto Sans Arabic', 'Urdu Typesetting', serif"
    : "'Plus Jakarta Sans', system-ui, sans-serif";

  const exportContainer = document.createElement('div');
  exportContainer.style.position = 'absolute';
  exportContainer.style.left = '-9999px';
  exportContainer.style.top = '-9999px';
  exportContainer.style.width = '794px'; // A4 pixel width at 96 DPI
  exportContainer.style.backgroundColor = '#ffffff';
  exportContainer.style.color = '#000000';
  exportContainer.style.padding = '40px';
  exportContainer.style.fontFamily = fontFamily;
  exportContainer.style.direction = dir;
  exportContainer.style.textAlign = isRtl ? 'right' : 'left';

  const safeTitle = subjectText || 'پاکستان شہری قانونی امداد پورٹل - باضابطہ قانونی شکایت نامہ';
  const safeName = complainantName || '____________________';

  exportContainer.innerHTML = `
    <div style="border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 24px; text-align: center;">
      <h1 style="font-size: 20px; font-weight: bold; margin: 0 0 6px 0; font-family: ${fontFamily};">
        ${safeTitle}
      </h1>
      <p style="font-size: 12px; color: #444; margin: 0; font-family: sans-serif;">
        Citizen Legal Aid & Document Assistant - Official PDF Export Document (${lang.toUpperCase()})
      </p>
    </div>

    <div style="font-size: 15px; line-height: 2.2; white-space: pre-wrap; word-break: break-word; margin-bottom: 30px; font-family: ${fontFamily}; min-height: 300px;">
      ${letterText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
    </div>

    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #000; display: flex; justify-content: space-between; font-size: 13px; line-height: 1.8; font-family: ${fontFamily};">
      <div>
        <p style="margin: 3px 0;"><strong>دستخط سائل / انگوٹھا (Signature):</strong> _______________________</p>
        <p style="margin: 3px 0;"><strong>نام سائل (Applicant Name):</strong> ${safeName}</p>
      </div>
      <div style="text-align: ${isRtl ? 'left' : 'right'};">
        <p style="margin: 3px 0;"><strong>تاریخ (Date):</strong> ${new Date().toLocaleDateString('en-PK')}</p>
        <p style="margin: 3px 0;"><strong>مقام (City):</strong> _______________________</p>
      </div>
    </div>

    <div style="margin-top: 40px; font-size: 10px; color: #666; text-align: center; border-top: 1px dashed #ccc; padding-top: 10px; font-family: sans-serif;">
      Generated via Legal Aid for All Pakistan • Public Legal Empowerment & Document System
    </div>
  `;

  document.body.appendChild(exportContainer);

  try {
    const canvas = await html2canvas(exportContainer, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 10;
    const imgWidth = pageWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = margin;

    pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
    heightLeft -= pageHeight - margin * 2;

    while (heightLeft > 5) {
      position = heightLeft - imgHeight + margin;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - margin * 2;
    }

    pdf.save(fileName);
  } catch (err) {
    console.error('Failed to generate PDF via canvas:', err);
  } finally {
    if (document.body.contains(exportContainer)) {
      document.body.removeChild(exportContainer);
    }
  }
}
