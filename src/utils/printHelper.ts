import { LanguageCode } from '../types';

export function printLegalDocument({
  title,
  subtitle = 'Official Legal Complaint / Application - Printed Copy',
  content,
  applicantName,
  cnicNumber,
  mobileNumber,
  cityJurisdiction,
  incidentDate,
  lang = 'ur',
  imageUrl,
}: {
  title: string;
  subtitle?: string;
  content?: string;
  applicantName?: string;
  cnicNumber?: string;
  mobileNumber?: string;
  cityJurisdiction?: string;
  incidentDate?: string;
  lang?: LanguageCode;
  imageUrl?: string;
}) {
  const isRtl = lang !== 'en';
  const dir = isRtl ? 'rtl' : 'ltr';
  const textAlign = isRtl ? 'right' : 'left';
  const fontFamily = isRtl
    ? "'Noto Nastaliq Urdu', 'Noto Sans Arabic', 'Urdu Typesetting', serif"
    : "'Plus Jakarta Sans', system-ui, sans-serif";

  // Create an iframe appended to body to bypass popup blockers
  const iframe = document.createElement('iframe');
  iframe.id = 'print-frame-' + Date.now();
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.style.visibility = 'hidden';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document || iframe.contentDocument;
  if (!doc) {
    window.print();
    return;
  }

  const escapeHtml = (str: string) =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

  const safeTitle = escapeHtml(title || 'پاکستان قانونی امداد پورٹل - باضابطہ قانونی شکایت نامہ');
  const safeSubtitle = escapeHtml(subtitle);
  const safeContent = content ? escapeHtml(content) : '';
  const safeName = escapeHtml(applicantName || '____________________');
  const safeCnic = escapeHtml(cnicNumber || '____________________');
  const safeMobile = escapeHtml(mobileNumber || '____________________');
  const safeCity = escapeHtml(cityJurisdiction || '____________________');
  const safeDate = escapeHtml(incidentDate || new Date().toLocaleDateString('en-PK'));

  const hasSignatures = Boolean(applicantName || cnicNumber || cityJurisdiction || content);

  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html lang="${lang}" dir="${dir}">
    <head>
      <meta charset="UTF-8" />
      <title>${safeTitle}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');

        @page {
          size: A4 portrait;
          margin: 15mm 15mm;
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 15px;
          background: #ffffff;
          color: #000000;
          font-family: ${fontFamily};
          direction: ${dir};
          text-align: ${textAlign};
          font-size: 13pt;
          line-height: 2.2;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .header-banner {
          text-align: center;
          border-bottom: 2px solid #000000;
          padding-bottom: 12px;
          margin-bottom: 20px;
        }

        .header-banner h1 {
          font-size: 16pt;
          margin: 0 0 4px 0;
          font-weight: bold;
        }

        .header-banner p {
          font-size: 9.5pt;
          margin: 0;
          color: #333333;
          font-family: sans-serif;
        }

        .document-body {
          white-space: pre-wrap;
          word-break: break-word;
          font-size: 12.5pt;
          line-height: 2.2;
          margin-bottom: 25px;
        }

        .image-container {
          text-align: center;
          margin: 20px 0;
        }

        .image-container img {
          max-width: 100%;
          max-height: 75vh;
          object-fit: contain;
          border: 1px solid #000;
        }

        .signature-block {
          margin-top: 35px;
          padding-top: 15px;
          border-top: 1.5px solid #000000;
          display: flex;
          justify-content: space-between;
          font-size: 11pt;
          line-height: 1.9;
          page-break-inside: avoid;
        }

        .footer-note {
          margin-top: 30px;
          font-size: 8.5pt;
          color: #555555;
          text-align: center;
          font-family: sans-serif;
          border-top: 1px dashed #cccccc;
          padding-top: 8px;
        }

        @media print {
          body {
            padding: 0;
          }
        }
      </style>
    </head>
    <body>
      <div class="header-banner">
        <h1>${safeTitle}</h1>
        <p>${safeSubtitle}</p>
      </div>

      ${
        imageUrl
          ? `<div class="image-container"><img src="${imageUrl}" alt="Document Copy" /></div>`
          : ''
      }

      ${safeContent ? `<div class="document-body">${safeContent}</div>` : ''}

      ${
        hasSignatures
          ? `<div class="signature-block">
              <div>
                <p><strong>دستخط سائل / انگوٹھا (Signature):</strong> _______________________</p>
                <p><strong>نام سائل (Applicant):</strong> ${safeName}</p>
                <p><strong>شناختی کارڈ (CNIC):</strong> ${safeCnic}</p>
              </div>
              <div style="text-align: ${isRtl ? 'left' : 'right'};">
                <p><strong>تاریخ (Date):</strong> ${safeDate}</p>
                <p><strong>مقام / شہر (City):</strong> ${safeCity}</p>
                <p><strong>موبائل نمبر (Mobile):</strong> ${safeMobile}</p>
              </div>
            </div>`
          : ''
      }

      <div class="footer-note">
        پاکستان شہری قانونی امداد پورٹل • Citizen Legal Aid &amp; Paperwork Assistant Pakistan
      </div>
    </body>
    </html>
  `);
  doc.close();

  // Print execution
  setTimeout(() => {
    try {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    } catch (err) {
      console.warn('Iframe print fallback triggered:', err);
      window.print();
    } finally {
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 3000);
    }
  }, 300);
}
