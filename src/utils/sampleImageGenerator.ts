/**
 * Helper to generate realistic sample Pakistani legal document images using HTML5 Canvas.
 * Returns Base64 Data URLs so users can test the Image Document Explainer instantly.
 */

export function generateSampleDocumentImage(docType: 'rent' | 'nikah' | 'court' | 'affidavit' | 'police'): string {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Background - Aged Stamp Paper / Legal Sheet color
  ctx.fillStyle =
    docType === 'rent'
      ? '#faf7ee'
      : docType === 'nikah'
      ? '#fbf8f0'
      : docType === 'court'
      ? '#f8f9fa'
      : docType === 'affidavit'
      ? '#fefce8'
      : '#f8fafc';
  ctx.fillRect(0, 0, 800, 1000);

  // Outer Decorative Border
  ctx.strokeStyle =
    docType === 'rent'
      ? '#065f46'
      : docType === 'nikah'
      ? '#1e3a8a'
      : docType === 'court'
      ? '#dc2626'
      : docType === 'affidavit'
      ? '#ca8a04'
      : '#0284c7';
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, 760, 960);
  ctx.lineWidth = 1;
  ctx.strokeRect(26, 26, 748, 948);

  if (docType === 'rent') {
    // GOVERNMENT OF PAKISTAN STAMP PAPER HEADER
    ctx.fillStyle = '#065f46';
    ctx.fillRect(40, 40, 720, 120);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px Jameel Noori Nastaleeq, Urdu, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('حکومت پاکستان — ایک سو روپئے اسٹامپ پیپر', 400, 85);
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('GOVERNMENT OF PAKISTAN - STAMP DUTY RS. 100', 400, 120);

    // Document Header
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 26px Urdu, Arial, sans-serif';
    ctx.fillText('معاہدہ کرایہ داری (RENT AGREEMENT)', 400, 210);

    // Document Body text
    ctx.textAlign = 'right';
    ctx.font = '18px Urdu, Arial, sans-serif';
    ctx.fillStyle = '#1e293b';

    const lines = [
      'مقام: گلبرگ III، لاہور، پنجاب',
      'فریق اول (مالک مکان): محمد طارق ولد عبدالرحیم، سکنہ لاہور',
      'فریق دوم (کرایہ دار): وسیم احمد ولد محمد اقبال، سکنہ گوجرانوالہ',
      '1. ماہانہ کرایہ مبلغ 25,000 روپے (پچیس ہزار روپے) مقرر پایا۔',
      '2. پیشگی زرمبادل سیکیورٹی ڈسکاؤنٹ مبلغ 75,000 روپے کیش ادا کی گئی۔',
      '3. معاہدہ کی مدت 11 ماہ ہوگی (یکم جنوری 2025 تا 30 نومبر 2025)۔',
      '4. بجلی، گیس اور پانی کے تمام بلز کرایہ دار بروقت ادا کرے گا۔',
      '5. کرایہ داری یکم سے 10 تاریخ کے درمیان ہر ماہ ادا کرنا لازمی ہوگی۔',
      '6. مالک مکان کو 1 ماہ کے تحریری نوٹس پر مکان خالی کروانے کا حق حاصل ہے۔',
    ];

    let y = 280;
    lines.forEach((line) => {
      ctx.fillText(line, 720, y);
      y += 45;
    });

    // Stamp Duty Stamp seal
    ctx.beginPath();
    ctx.arc(150, 780, 55, 0, 2 * Math.PI);
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = '#0369a1';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('TREASURY LAHORE', 150, 775);
    ctx.fillText('VERIFIED STAMP', 150, 795);

    // Signatures
    ctx.font = 'bold 16px Urdu, Arial, sans-serif';
    ctx.fillText('دستخط مالک مکان: _____________', 600, 880);
    ctx.fillText('دستخط کرایہ دار: _____________', 250, 880);
    ctx.fillText('دستخط گواہ شد 1: _____________', 600, 930);
    ctx.fillText('دستخط گواہ شد 2: _____________', 250, 930);
  } else if (docType === 'nikah') {
    // NIKAHNAMA FORM
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(40, 40, 720, 90);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Urdu, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('اسلامی جمہوریہ پاکستان - صیغہ عقد نکاح نامہ', 400, 92);

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 20px Urdu, Arial, sans-serif';
    ctx.fillText('رجسٹریشن یونین کونسل نمبر 12 - ضلع راولپنڈی', 400, 170);

    ctx.textAlign = 'right';
    ctx.font = '17px Urdu, Arial, sans-serif';
    ctx.fillStyle = '#1e293b';

    const lines = [
      '1. دلہا کا نام: بلال حسن ولد محمود الحسن، شناختی کارڈ: 37405-1234567-1',
      '2. دلہن کا نام: ثناء فاطمہ بنت عبدالمجید، شناختی کارڈ: 37405-7654321-2',
      '3. تاریخ نکاح: 15 جنوری 2025 | مقام: راولپنڈی',
      '4. حق مہر کی رقم: مبلغ 500,000 روپے (پانچ لاکھ روپے)',
      '5. حق مہر کی نوعیت: معجل (فوری قابل ادائیگی)',
      '6. کیا شوہر نے بیوی کو طلاق کا حق تفویض کیا؟ جی ہاں (شق 18 تفویض طلاق)',
      '7. نان و نفقہ ماہانہ: مبلغ 30,000 روپے ماہوار طے پایا',
      '8. وکیل نکاح و گواہان کے نام و پتہ یونین کونسل میں درج ہیں۔',
    ];

    let y = 230;
    lines.forEach((line) => {
      ctx.fillText(line, 720, y);
      y += 45;
    });

    // Union council Seal
    ctx.beginPath();
    ctx.arc(150, 720, 60, 0, 2 * Math.PI);
    ctx.strokeStyle = '#1e3a8a';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = '#1e3a8a';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('UNION COUNCIL 12', 150, 715);
    ctx.fillText('NIKAH REGISTRAR', 150, 735);

    // Signatures
    ctx.font = 'bold 16px Urdu, Arial, sans-serif';
    ctx.fillText('دستخط دلہا: _____________', 600, 850);
    ctx.fillText('دستخط دلہن: _____________', 250, 850);
    ctx.fillText('دستخط نکاح خواں: _____________', 600, 910);
    ctx.fillText('مہر و دستخط رجسٹرار: _____________', 250, 910);
  } else if (docType === 'court') {
    // COURT SUMMONS
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(40, 40, 720, 80);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px Urdu, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('عدالتی سمن / نوٹس تنبیہ - بحوالہ ضابطہ دیوانی 1908', 400, 90);

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 20px Urdu, Arial, sans-serif';
    ctx.fillText('بعدالت جناب سول جج صاحب، کراچی شرقی', 400, 160);

    ctx.textAlign = 'right';
    ctx.font = '17px Urdu, Arial, sans-serif';
    ctx.fillStyle = '#1e293b';

    const lines = [
      'دعویٰ نمبر: 452/2026 — عنوان: دعویٰ استقرار حق و تعمیلی حکم امتناعی',
      'بنام مدعی: علی رضا ولد احمد رضا، سکنہ کراچی',
      'بنام مدعا علیہ: زاہد خان ولد شاہنواز، سکنہ پی ای سی ایچ ایس، کراچی',
      'بذریعہ اس تحریر آپ کو مطلع کیا جاتا ہے کہ مدعی نے آپ کے خلاف دعویٰ دائر کیا ہے۔',
      'آپ کو حکم دیا جاتا ہے کہ مورخہ 10 فروری 2026 بوقت 9:00 بجے صبح',
      'اصالتاً یا وکالتاً بعدالت ہذا حاضر ہو کر جواب دعویٰ داخل کریں۔',
      'عدم حاضری کی صورت میں آپ کے خلاف یکطرفہ کارروائی (Ex-Parte) عمل میں لائی جائے گی۔',
    ];

    let y = 220;
    lines.forEach((line) => {
      ctx.fillText(line, 720, y);
      y += 45;
    });

    // Court Stamp
    ctx.beginPath();
    ctx.arc(150, 720, 60, 0, 2 * Math.PI);
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = '#991b1b';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CIVIL COURT KARACHI', 150, 715);
    ctx.fillText('OFFICIAL SEAL', 150, 735);

    // Signatures
    ctx.font = 'bold 16px Urdu, Arial, sans-serif';
    ctx.fillText('دستخط و مہر سول جج: __________________', 450, 880);
    ctx.fillText('تاریخ اجراء سمن: 2026-01-20', 450, 930);
  } else if (docType === 'affidavit') {
    // AFFIDAVIT BAYAN-E-HALFI
    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(40, 40, 720, 100);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px Urdu, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('بیان حلفی — حلفیہ اقرار نامہ (AFFIDAVIT ON STAMP PAPER)', 400, 85);
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('STAMP PAPER VALUE RS. 100 - OATH COMMISSIONER ATTESTED', 400, 115);

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 22px Urdu, Arial, sans-serif';
    ctx.fillText('حلفیہ اقرار نامہ و ضمانتی ڈیکلیریشن', 400, 180);

    ctx.textAlign = 'right';
    ctx.font = '17px Urdu, Arial, sans-serif';
    ctx.fillStyle = '#1e293b';

    const lines = [
      'منکہ: محمد عثمان خان ولد احمد خان، شناختی کارڈ: 35202-1122334-5',
      'ساکن: مکان نمبر 50، کینال بینک روڈ، لاہور بحلف بیان کرتا ہوں کہ:',
      '1. یہ کہ میں متوفی احمد خان کا سگا بیٹا اور قانونی شرعی وارث ہوں۔',
      '2. یہ کہ مذکورہ جائیداد پر کوئی اور مخفی دعویٰ یا متنازعہ مسئلہ موجود نہیں۔',
      '3. یہ کہ اس بیان حلفی کے تمام مندرجات میری بہترین معلومات کے مطابق درست ہیں۔',
      '4. میں جانتا ہوں کہ غلط بیانی پر تعزیرات پاکستان کی دفعہ 193 کے تحت سزا ہوگی۔',
    ];

    let y = 240;
    lines.forEach((line) => {
      ctx.fillText(line, 720, y);
      y += 45;
    });

    // Oath Commissioner Stamp
    ctx.beginPath();
    ctx.arc(150, 720, 60, 0, 2 * Math.PI);
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = '#854d0e';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('OATH COMMISSIONER', 150, 715);
    ctx.fillText('REG # 8812 / LAHORE', 150, 735);

    ctx.font = 'bold 16px Urdu, Arial, sans-serif';
    ctx.fillText('دستخط حلف دہندہ: __________________', 450, 880);
    ctx.fillText('تصدیق شدہ اووٿ کمشنر لاہور', 450, 930);
  } else {
    // POLICE COMPLAINT
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(40, 40, 720, 90);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px Urdu, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('پنجاب پولیس — فرنٹ ڈیسک تحریری درخواست', 400, 90);

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 20px Urdu, Arial, sans-serif';
    ctx.fillText('بخڈمت جناب ایس ایچ او صاحب، تھانہ شاہ شمس ملتان', 400, 160);

    ctx.textAlign = 'right';
    ctx.font = '17px Urdu, Arial, sans-serif';
    ctx.fillStyle = '#1e293b';

    const lines = [
      'عنوان: درخواست برائے اندراج مقدمہ / ایف آئی آر چوری (دفعہ 380 PPC)',
      'سائل: کامران احمد ولد شبیر احمد، شناختی کارڈ: 36302-1234567-9',
      'ساکن: مکان نمبر 88، سیکٹر B، شاہ شمس، ملتان۔',
      '1. بتاریخ 18 جنوری 2026 بوقت رات 2:00 بجے نامعلوم چوروں نے چوری کی۔',
      '2. نقد 200,000 روپے اور طلاعی زیورات چوری کیے گئے۔',
      '3. موقع پر سی سی ٹی وی فوٹیج اور فنگر پرنٹس ثبوت دستیاب ہیں۔',
      '4. استدعا ہے کہ دفعہ 380 PPC کے تحت فوری پرچہ درج کر کے کارروائی کی جائے۔',
    ];

    let y = 230;
    lines.forEach((line) => {
      ctx.fillText(line, 720, y);
      y += 45;
    });

    ctx.beginPath();
    ctx.arc(150, 720, 60, 0, 2 * Math.PI);
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = '#075985';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('POLICE FRONT DESK', 150, 715);
    ctx.fillText('DIARY # 1042/2026', 150, 735);

    ctx.font = 'bold 16px Urdu, Arial, sans-serif';
    ctx.fillText('دستخط سائل: __________________', 450, 880);
    ctx.fillText('بتاریخ: 18 جنوری 2026', 450, 930);
  }

  return canvas.toDataURL('image/png');
}
