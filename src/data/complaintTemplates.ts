import { ComplaintTemplate } from '../types';

export const COMPLAINT_TEMPLATES: ComplaintTemplate[] = [
  {
    id: 'rent_deposit_refund',
    category: 'Tenancy & Landlord Dispute',
    subject: {
      en: 'Application for Refund of Security Deposit & Prevention of Unlawful Eviction',
      ur: 'درخواست برائے واپسی سیکیورٹی ڈپازٹ اور غیر قانونی بے دخلی کی روک تھام',
      sd: 'درخواست برائي سيڪيورٽي ڊپازٽ جي واپسي ۽ غير قانوني بي دخلي روڪڻ',
      pa: 'درخواست برائے واپسی سیکیورٹی ڈپازٹ تے غیر قانونی بے دخلی روکنا',
      ps: 'د امانت پېسو بېرته اخیستلو او نا حقه ایستلو مخنیوي غوښتنه',
    },
    recipientDepartment: {
      en: 'The Worthy Rent Controller / Civil Judge Court',
      ur: 'جناب عالی رینٹ کنٹرولر صاحب / سول جج عدالت',
      sd: 'جناب رينٽ ڪنٽرولر صاحبان / سول جج ڪورٽ',
      pa: 'جناب عالی رینٹ کنٹرولر صاحب / سول جج',
      ps: 'محترم د رینټ کنټرولر او سول قاضي صاحب',
    },
    questions: [
      {
        key: 'complainant_name',
        questionText: {
          en: 'Your Full Name (سائل / درخواست دہندہ کا نام):',
          ur: 'آپ کا مکمل نام (درخواست دہندہ):',
          sd: 'توهان جو پورو نام (درخواست ڏيندڙ):',
          pa: 'تہاڈا مکمل نام (درخواست دہندہ):',
          ps: 'ستاسو بشپړ نوم (عریضه کوونکی):',
        },
        placeholder: {
          en: 'e.g. Syed Ali Raza Shah',
          ur: 'مثلاً: سید علی رضا شاہ',
          sd: 'مثلاً: سيد علي رضا شاهه',
          pa: 'مثلاً: سید علی رضا شاہ',
          ps: 'مثال: سید علی رضا شاه',
        },
        type: 'text',
        required: true,
      },
      {
        key: 'complainant_cnic',
        questionText: {
          en: 'Your CNIC Number (شناختی کارڈ نمبر):',
          ur: 'آپ کا شناختی کارڈ نمبر (CNIC):',
          sd: 'توهان جو سڃاڻپ ڪارڊ نمبر:',
          pa: 'تہاڈا شناختی کارڈ نمبر:',
          ps: 'ستاسو د تذکرې شمیره:',
        },
        placeholder: {
          en: 'e.g. 61101-1234567-1',
          ur: '61101-1234567-1',
          sd: '61101-1234567-1',
          pa: '61101-1234567-1',
          ps: '61101-1234567-1',
        },
        type: 'text',
        required: true,
      },
      {
        key: 'landlord_name',
        questionText: {
          en: 'Landlord / Respondent Name (مالک مکان کا نام):',
          ur: 'مالک مکان کا نام (مخالف فریق):',
          sd: 'مالڪ مڪان جو نام:',
          pa: 'مالک مکان دا نام:',
          ps: 'د مالک/مخالف لوري نوم:',
        },
        placeholder: {
          en: 'e.g. Chaudhry Muhammad Tariq',
          ur: 'مثلاً: چوہدری محمد طارق',
          sd: 'مثلاً: چوڌري محمد طارق',
          pa: 'مثلاً: چوہدری محمد طارق',
          ps: 'مثال: چوهدری محمد طارق',
        },
        type: 'text',
        required: true,
      },
      {
        key: 'property_address',
        questionText: {
          en: 'Rented Property Address (مکان / فلیٹ کا پتہ):',
          ur: 'کرائے کے مکان یا فلیٹ کا پتہ:',
          sd: 'ڪرايي جي جڳهه جو پتو:',
          pa: 'کرائے دے مکان دا پتہ:',
          ps: 'د کرایې د ځای مکمل پته:',
        },
        placeholder: {
          en: 'e.g. House 12, Street 4, Sector F-11, Islamabad',
          ur: 'مثلاً: مکان 12، گلی 4، سیکٹر F-11، اسلام آباد',
          sd: 'مثلاً: مڪان 12، سيڪٽر F-11، اسلام آباد',
          pa: 'مثلاً: مکان 12، سیکٹر F-11، اسلام آباد',
          ps: 'مثال: کور ۱۲، کوڅه ۴، اف ۱۱، اسلام اباد',
        },
        type: 'text',
        required: true,
      },
      {
        key: 'deposit_amount',
        questionText: {
          en: 'Security Deposit Amount (سیکیورٹی رقم):',
          ur: 'سیکیورٹی ڈپازٹ کی رقم (روپے):',
          sd: 'سيڪيورٽي ڊپازٽ جي رقم:',
          pa: 'سیکیورٹی ڈپازٹ دی رقم:',
          ps: 'د سیکیوټي ضمانت پیسې:',
        },
        placeholder: {
          en: 'e.g. 70,000',
          ur: 'مثلاً: 70000',
          sd: '70000',
          pa: '70000',
          ps: '70000',
        },
        type: 'number',
        required: true,
      },
      {
        key: 'vacate_date',
        questionText: {
          en: 'Date of Vacating / Notice Date (خالی کرنے کی تاریخ):',
          ur: 'مکان خالی کرنے یا نوٹس دینے کی تاریخ:',
          sd: 'جڳهه خالي ڪرڻ جي تاريخ:',
          pa: 'مکان خالی کرن دی تاریخ:',
          ps: 'د ځای خوشې کولو موده/تاريخ:',
        },
        placeholder: {
          en: 'e.g. 2026-06-30',
          ur: '2026-06-30',
          sd: '2026-06-30',
          pa: '2026-06-30',
          ps: '2026-06-30',
        },
        type: 'date',
        required: true,
      },
    ],
    letterBodyTemplate: {
      en: `BEFORE THE WORTHY RENT CONTROLLER / CIVIL COURT

Subject: APPLICATION FOR REFUND OF SECURITY DEPOSIT OF RS. {deposit_amount}/- AND RESTRAINT FROM ILLEGAL INTERFERENCE

Respected Sir,

1. That the applicant ({complainant_name}, CNIC: {complainant_cnic}) was a lawful tenant in property ({property_address}) under Respondent ({landlord_name}).
2. That at the commencement of tenancy, the applicant deposited a refundable security deposit of Rs. {deposit_amount}/- with the Respondent.
3. That the applicant vacated the rented property on {vacate_date} after clearing all utility bills up to date and handing over peaceful vacant possession.
4. That despite repeated demands, the Respondent has illegally withheld the security deposit of Rs. {deposit_amount}/- without any lawful justification.

PRAYER:
It is humbly prayed that the Respondent be directed to immediately refund the security deposit of Rs. {deposit_amount}/- to the applicant and restrain from any illegal harassment.

Applicant: {complainant_name}
CNIC: {complainant_cnic}
Dated: {today_date}`,
      ur: `بخڈمت جناب عالی رینٹ کنٹرولر / ضلعی سول جج صاحب

عنوان: درخواست برائے واپسی سیکیورٹی رقم مبلغ -/{deposit_amount} روپے اور غیر قانونی مداخلت کی روک تھام

جناب عالی!

گزارش حسب ذیل ہے:
1۔ یہ کہ سائل ({complainant_name}، شناختی کارڈ: {complainant_cnic}) مخالف فریق ({landlord_name}) کا جائیداد واقع ({property_address}) کا قانونی کرایہ دار رہا ہے۔
2۔ یہ کہ معاہدہ کی شروعات پر سائل نے مخالف فریق کے پاس بطور امانت سیکیورٹی رقم مبلغ -/{deposit_amount} روپے جمع کروائی تھی۔
3۔ یہ کہ سائل نے بتاریخ {vacate_date} تمام بجلی، گیس اور پانی کے بل مکمل ادا کرنے کے بعد مکان کا پرامن قبضہ مخالف فریق کے حوالے کر دیا تھا۔
4۔ یہ کہ سائل کے بارہا مطالبے کے باوجود مخالف فریق بغیر کسی قانونی وجہ کے سیکیورٹی رقم مبلغ -/{deposit_amount} روپے غصب کر کے واپس نہیں کر رہا۔

استدعا:
استدعا ہے کہ مخالف فریق کو سائل کی سیکیورٹی رقم -/{deposit_amount} روپے فوری واپس کرنے کا حکم صادر فرمایا جائے۔

سائل: {complainant_name}
شناختی کارڈ: {complainant_cnic}
بتاریخ: {today_date}`,
      sd: `جناب رينٽ ڪنٽرولر صاحب

عنوان: درخواست برائي سيڪيورٽي ڊپازٽ -/{deposit_amount} روپيا جي واپسي

جناب!
1. سائل ({complainant_name}، سڃاڻپ ڪارڊ: {complainant_cnic}) جڳهه ({property_address}) جو ڪراييدار هو.
2. سائل سيڪيورٽي ڊپازٽ -/{deposit_amount} روپيا مالڪ ({landlord_name}) وٽ جمع ڪرايا هئا.
3. سائل تاريخ {vacate_date} تي سڀ بل ادا ڪري جڳهه خالي ڪئي.
4. مالڪ سيمورٽي رقم واپس نٿو ڪري.

استدعا: سيڪيورٽي رقم واپس ڪرڻ جو حڪم ڏنو وڃي.

سائل: {complainant_name}`,
      pa: `جناب رینٹ کنٹرولر صاحب

عنوان: درخواست برائے واپسی سیکیورٹی رقم -/{deposit_amount} روپے

جناب عالی!
1. سائل ({complainant_name}، شناختی کارڈ: {complainant_cnic}) جائیداد ({property_address}) دا کرایہ دار رہا اے۔
2. سائل سیکیورٹی رقم -/{deposit_amount} روپے مالک ({landlord_name}) کول جمع کروائی سی۔
3. سائل {vacate_date} نوں تمام بل ادا کر کے مکان خالی کر دتا۔
4. مالک سیکیورٹی رقم واپس نہیں کر رہا۔

استدعا: سیکیورٹی رقم واپس کروان دا حکم دتا جائے۔

سائل: {complainant_name}`,
      ps: `د درانه رینټ کنټرولر په وړاندې

موضوع: د امانت پېسو -/{deposit_amount} بېرته ورکولو غوښتنه

محترمه!
۱. عریضه کوونکی ({complainant_name}، تذکره: {complainant_cnic}) د دغه ځای ({property_address}) کرایه دار و.
۲. د مالک ({landlord_name}) سره د ۷۰ زره ضمانت پیسې خوندي وې.
۳. په {vacate_date} نېټه ټول بلونه تادیه شول او ځای خوشې شو.
۴. مالک پېسې له قانونی لامل پرته بېرته نه ورکوي.

غوښتنه: لوري ته د امانت پېسو ورکولو امر وکړئ.

عریضه کوونکی: {complainant_name}`,
    },
    enclosuresChecklist: {
      en: [
        'Attested copy of Complainant CNIC',
        'Copy of Tenancy Agreement',
        'Paid Utility Bills Receipts',
        'Copy of Legal Notice sent to Landlord',
      ],
      ur: [
        'درخواست دہندہ کے شناختی کارڈ کی تصدیق شدہ کاپی',
        'کرایہ نامہ کی کاپی',
        'ادا شدہ بجلی و گیس کے بلوں کی رسیدیں',
        'مالک مکان کو بھیجے گئے قانونی نوٹس کی کاپی',
      ],
      sd: [
        'سڃاڻپ ڪارڊ جي ڪاپي',
        'ڪرايه نامي جي ڪاپي',
        'ادا ٿيل بلن جون رسيدون',
      ],
      pa: [
        'شناختی کارڈ دی کاپی',
        'کرایہ نامہ دی کاپی',
        'ادا شدہ بل دی رسیداں',
      ],
      ps: [
        'د تذکرې کاپي',
        'د کرایې لیک کاپي',
        'د تحویل شویو بلونو رسیدونه',
      ],
    },
  },
  {
    id: 'labour_unpaid_salary',
    category: 'Labour & Employment Rights',
    subject: {
      en: 'Claim Application for Unpaid Wages and Gratuity Arrears under Payment of Wages Act',
      ur: 'درخواست برائے وصولی روکی گئی تنخواہ و بقایاجات (تحت پیمنٹ آف ویجز ایکٹ)',
      sd: 'درخواست برائي روڪيل پگهار ۽ گريجوئٽي (تحت پيمنٽ آف ويجز ايڪٽ)',
      pa: 'درخواست برائے وصولی روکی تنخواہ تے گریجویٹی',
      ps: 'د نه ورکړل شوي معاش او برطرفۍ حقونو د مطالبی درخواست',
    },
    recipientDepartment: {
      en: 'Authority under Payment of Wages Act / Directorate of Labour Welfare',
      ur: 'جناب بااختیار اتھارٹی تحت پیمنٹ آف ویجز ایکٹ / ڈائریکٹوریٹ آف لیبر ویلفیئر',
      sd: 'جناب اٿارٽي انڊر پيمنٽ آف ويجز ايڪٽ / ليبر ڊپارٽمينٽ',
      pa: 'جناب اتھارٹی تحت پیمنٹ آف ویجز ایکٹ / لیبر ڈائریکٹوریٹ',
      ps: 'د کار په وزارت کې د معاش او حقونو اتهارټي مقام',
    },
    questions: [
      {
        key: 'employee_name',
        questionText: {
          en: 'Employee Full Name (ملازم کا نام):',
          ur: 'ملازم کا نام (درخواست دہندہ):',
          sd: 'ملازم جو پورو نام:',
          pa: 'ملازم دا نام:',
          ps: 'د کارګر/مامور نوم:',
        },
        placeholder: {
          en: 'e.g. Muhammad Farooq',
          ur: 'مثلاً: محمد فاروق',
          sd: 'مثلاً: محمد فاروق',
          pa: 'مثلاً: محمد فاروق',
          ps: 'مثال: محمد فاروق',
        },
        type: 'text',
        required: true,
      },
      {
        key: 'employee_cnic',
        questionText: {
          en: 'Employee CNIC Number (شناختی کارڈ):',
          ur: 'شناختی کارڈ نمبر:',
          sd: 'سڃاڻپ ڪارڊ نمبر:',
          pa: 'شناختی کارڈ نمبر:',
          ps: 'د تذکرې شمیره:',
        },
        placeholder: {
          en: 'e.g. 35201-1234567-8',
          ur: '35201-1234567-8',
          sd: '35201-1234567-8',
          pa: '35201-1234567-8',
          ps: '35201-1234567-8',
        },
        type: 'text',
        required: true,
      },
      {
        key: 'employer_company',
        questionText: {
          en: 'Company / Employer Name (ادارہ / مالک کا نام):',
          ur: 'کمپنی / ادارے یا مالک کا نام:',
          sd: 'ڪمپني / مالڪ جو نام:',
          pa: 'کمپنی / مالک دا نام:',
          ps: 'د دفتر/کمپنۍ نوم:',
        },
        placeholder: {
          en: 'e.g. Acme Logistics Pvt Ltd',
          ur: 'مثلاً: ایکمی لاجسٹکس پرائیویٹ لمیٹڈ',
          sd: 'مثلاً: ايڪمي لاجسٽڪس',
          pa: 'مثلاً: ایکمی لاجسٹکس',
          ps: 'مثال: ایکمي لوجسټیک',
        },
        type: 'text',
        required: true,
      },
      {
        key: 'unpaid_months',
        questionText: {
          en: 'Number of Unpaid Months / Period (کتنے ماہ کی تنخواہ روکی ہے):',
          ur: 'روکی گئی تنخواہ کی مدت یا ماہ (مثلاً 3 ماہ):',
          sd: 'روڪيل پگهار جي مدت:',
          pa: 'روکی تنخواہ دی مدت:',
          ps: 'د کومو میاشتو معاش پاتې دی:',
        },
        placeholder: {
          en: 'e.g. 3 Months (March to May 2026)',
          ur: 'مثلاً: 3 ماہ (مارچ تا مئی 2026)',
          sd: '3 مهينا',
          pa: '3 ماہ',
          ps: 'مثال: ۳ میاشتې',
        },
        type: 'text',
        required: true,
      },
      {
        key: 'total_claim_amount',
        questionText: {
          en: 'Total Claimed Amount (کل واجب الادا رقم):',
          ur: 'کل واجب الادا رقم (روپے):',
          sd: 'ڪل رقم:',
          pa: 'کل رقم:',
          ps: 'ټوله پور پیسې:',
        },
        placeholder: {
          en: 'e.g. 150,000',
          ur: '150000',
          sd: '150000',
          pa: '150000',
          ps: '150000',
        },
        type: 'number',
        required: true,
      },
    ],
    letterBodyTemplate: {
      en: `BEFORE THE AUTHORITY UNDER PAYMENT OF WAGES ACT

Subject: CLAIM PETITION FOR RECOVERY OF UNPAID SALARY OF RS. {total_claim_amount}/- AGAINST {employer_company}

Respected Authority,

1. That the applicant ({employee_name}, CNIC: {employee_cnic}) was employed with the Respondent ({employer_company}).
2. That the applicant performed duties diligently, but the Respondent unlawfully withheld salary for {unpaid_months} amounting to Rs. {total_claim_amount}/-.
3. That under Section 15 of Payment of Wages Act 1936, withholding earned wages is a punishable offense.

PRAYER:
It is prayed that the Respondent be ordered to pay the full arrears of Rs. {total_claim_amount}/- along with statutory compensation.

Applicant: {employee_name}
CNIC: {employee_cnic}
Dated: {today_date}`,
      ur: `بخڈمت جناب بااختیار اتھارٹی تحت پیمنٹ آف ویجز ایکٹ

عنوان: درخواست برائے وصولی روکی گئی تنخواہ مبلغ -/{total_claim_amount} روپے بمقابلہ {employer_company}

جناب عالی!

1۔ یہ کہ سائل ({employee_name}، شناختی کارڈ: {employee_cnic}) مخالف فریق ({employer_company}) کا ملازم رہا ہے۔
2۔ یہ کہ سائل نے ایمانداری سے فرائض سرانجام دیے لیکن مخالف فریق نے {unpaid_months} کی تنخواہ مبلغ -/{total_claim_amount} روپے غیر قانونی طور پر روک رکھی ہے۔
3۔ یہ کہ پیمنٹ آف ویجز ایکٹ کی دفعہ 15 کے تحت محنت کش کی تنخواہ روکنا قابل تعزیر جرم ہے۔

استدعا:
استدعا ہے کہ مخالف فریق کو سائل کی کل تنخواہ -/{total_claim_amount} روپے بمعہ ہرجانہ ادا کرنے کا حکم دیا جائے۔

سائل: {employee_name}
شناختی کارڈ: {employee_cnic}
بتاریخ: {today_date}`,
      sd: `جناب اٿارٽي انڊر پيمنٽ آف ويجز ايڪٽ

عنوان: درخواست برائي پگهار جي وصولي -/{total_claim_amount} روپيا

جناب!
1. سائل ({employee_name}) ڪمپني ({employer_company}) جو ملازم هو.
2. ڪمپني {unpaid_months} جي پگهار -/{total_claim_amount} روپيا روڪي ڇڏي آهي.

استدعا: پگهار ڏيارڻ جو حڪم ڏنو وڃي.

سائل: {employee_name}`,
      pa: `جناب اتھارٹی تحت پیمنٹ آف ویجز ایکٹ

عنوان: درخواست برائے وصولی تنخواہ -/{total_claim_amount} روپے

جناب عالی!
1. سائل ({employee_name}) کمپنی ({employer_company}) دا ملازم اے۔
2. کمپنی {unpaid_months} دی تنخواہ -/{total_claim_amount} روپے روکی ہوئی اے۔

استدعا: تنخواہ دوائی جائے۔

سائل: {employee_name}`,
      ps: `د کار او اجورې اتهارټي په وړاندې

موضوع: د نه ورکړل شوي معاش -/{total_claim_amount} د اخیستو ادعا

محترمه!
۱. عریضه کوونکی ({employee_name}) په شرکت ({employer_company}) کې مراجع و.
۲. ادارې د {unpaid_months} معاش له څه شرعي پلمې پرته ځنډولی دی.

غوښتنه: نغدې پیسې تحویلول منظور کړئ.

عریضه کوونکی: {employee_name}`,
    },
    enclosuresChecklist: {
      en: [
        'Attested Copy of CNIC',
        'Appointment Letter / Employment Card',
        'Bank Statement or Salary Slips',
        'Copy of Grievance Notice sent to Employer',
      ],
      ur: [
        'شناختی کارڈ کی تصدیق شدہ کاپی',
        'ملازمت کا لیٹر (Appointment Letter) یا جاب کارڈ',
        'بینک سٹیٹمنٹ یا تنخواہ کی پرچی',
        'ادارے کو بھیجے گئے شکوہ نامہ کی کاپی',
      ],
      sd: [
        'سڃاڻپ ڪارڊ جي ڪاپي',
        'اپوائنٽمينٽ ليٽر',
        'بئنڪ اسٽيٽمينٽ',
      ],
      pa: [
        'شناختی کارڈ دی کاپی',
        'جاب کارڈ یا لیٹر',
        'بینک سٹیٹمنٹ',
      ],
      ps: [
        'د تذکرې کاپي',
        'د تقرر کارت',
        'د بېنک معلومات',
      ],
    },
  },
  {
    id: 'family_maintenance_claim',
    category: 'Family Laws',
    subject: {
      en: 'Family Suit for Recovery of Monthly Maintenance, Dowry Articles, and Custody',
      ur: 'دعویٰ برائے وصولی خرچہ نفقہ، سامان جہیز اور حضانتِ طفل',
      sd: 'دعويٰ برائي خرچو، ڏيج ۽ ٻارن جي پرورش',
      pa: 'دعویٰ برائے وصولی خرچہ، سامان جہیز تے بچیاں دی پرورش',
      ps: 'د میاشتنۍ نفقې، د جهېز سامان او د اولادونو سرپرستۍ ادعا',
    },
    recipientDepartment: {
      en: 'In the Court of Worthy Judge Family Court / Senior Civil Judge',
      ur: 'جناب عالی جج فیملی کورٹ / سینئر سول جج صاحب',
      sd: 'جناب جج فيملي ڪورٽ',
      pa: 'جناب جج فیملی کورٹ',
      ps: 'محترم د کورنیو محکمې قاضي صاحب',
    },
    questions: [
      {
        key: 'plaintiff_name',
        questionText: {
          en: 'Plaintiff Full Name (مدعیہ کا نام):',
          ur: 'مدعیہ / خاتون کا مکمل نام:',
          sd: 'مدعيه / عورت جو نالو:',
          pa: 'مدعیہ / خاتون دا نام:',
          ps: 'د عریضه کوونکې مېرمنې نوم:',
        },
        placeholder: {
          en: 'e.g. Ayesha Bibi',
          ur: 'مثال: عائشہ بی بی',
          sd: 'مثال: عائشه بي بي',
          pa: 'مثال: عائشہ بی بی',
          ps: 'مثال: عایشه بی بی',
        },
        type: 'text',
        required: true,
      },
      {
        key: 'defendant_husband',
        questionText: {
          en: 'Husband / Defendant Name (مدعا علیہ / شوہر کا نام):',
          ur: 'شوہر کا مکمل نام:',
          sd: 'مڙس جو نام:',
          pa: 'شوہر دا نام:',
          ps: 'د خاوند/مخالف لوري نوم:',
        },
        placeholder: {
          en: 'e.g. Muhammad Imran Khan',
          ur: 'مثال: محمد عمران خان',
          sd: 'مثال: محمد عمران خان',
          pa: 'مثال: محمد عمران خان',
          ps: 'مثال: محمد عمران خان',
        },
        type: 'text',
        required: true,
      },
      {
        key: 'monthly_maintenance_amount',
        questionText: {
          en: 'Claimed Monthly Maintenance Amount (ماہانہ خرچہ نفقہ):',
          ur: 'ماہانہ نفقہ خرچہ کا مطالبہ (روپے):',
          sd: 'ماهوار خرچو:',
          pa: 'ماہانہ خرچہ:',
          ps: 'د میاشتنۍ نفقې غوښتل شوې پیسې:',
        },
        placeholder: {
          en: 'e.g. 35,000',
          ur: '35000',
          sd: '35000',
          pa: '35000',
          ps: '35000',
        },
        type: 'number',
        required: true,
      },
    ],
    letterBodyTemplate: {
      en: `IN THE COURT OF WORTHY JUDGE FAMILY COURT

Subject: FAMILY SUIT FOR RECOVERY OF MONTHLY MAINTENANCE RS. {monthly_maintenance_amount}/- PER MONTH, RECOVERY OF DOWRY ARTICLES, AND CUSTODY OF MINORS

Respected Judge,

1. That the marriage between the plaintiff ({plaintiff_name}) and the defendant ({defendant_husband}) was solemnized under Islamic Shariah.
2. That out of the wedlock, minor children were born who are currently under the care of the plaintiff mother.
3. That the defendant has willfully turned out the plaintiff and failed to provide any monthly maintenance or return dowry articles.

PRAYER:
It is humbly prayed that decree for monthly maintenance of Rs. {monthly_maintenance_amount}/- per month and recovery of dowry articles be granted in favor of plaintiff.

Plaintiff: {plaintiff_name}
Dated: {today_date}`,
      ur: `بخڈمت جناب عالی جج فیملی کورٹ / سینئر سول جج صاحب

عنوان: دعویٰ برائے وصولی نفقہ ماہانہ -/{monthly_maintenance_amount} روپے، سامان جہیز اور حضانتِ بچوں

جناب عالی!

1۔ یہ کہ مدعیہ ({plaintiff_name}) کا نکاح مسمی مدعا علیہ ({defendant_husband}) کے ساتھ شرعی و قانونی ضوابط کے مطابق ہوا تھا۔
2۔ یہ کہ مدعیہ و مدعا علیہ کے زفاف سے نابالغ بچے پیدا ہوئے جو فی الوقت مدعیہ کے پاس پرورش پاتے ہیں۔
3۔ یہ کہ مدعا علیہ نے بلاوجہ شرعی مدعیہ اور بچوں کو نفقہ اور خرچہ دینے سے مکمل انکار کر رکھا ہے اور سامان جہیز غصب کیا ہوا ہے۔

استدعا:
استدعا ہے کہ مدعیہ کے حق میں ماہانہ نفقہ -/{monthly_maintenance_amount} روپے اور سامان جہیز کی ڈگری صادر فرمائی جائے۔

مدعیہ: {plaintiff_name}
بتاریخ: {today_date}`,
      sd: `جناب جج فيملي ڪورٽ
عنوان: دعويٰ برائي نفقو -/{monthly_maintenance_amount} روپيا

جناب!
1. مدعيه ({plaintiff_name}) جو نڪاح مدعا عليه ({defendant_husband}) سان ٿيو.
2. مدعا عليه ٻارن جو خرچو نٿو ڏئي.

استدعا: ماهوار خرچو ڏيارڻ جي ڊگري جاري ڪئي وڃي.

مدعيه: {plaintiff_name}`,
      pa: `جناب جج فیملی کورٹ
عنوان: دعویٰ برائے وصولی خرچہ -/{monthly_maintenance_amount} روپے

جناب عالی!
1. مدعیہ ({plaintiff_name}) دا نکاح مدعا علیہ ({defendant_husband}) نال ہویا۔
2. مدعا علیہ خرچہ نہیں دے رہا۔

استدعا: ماہانہ خرچہ دیا جائے۔

مدعیہ: {plaintiff_name}`,
      ps: `د کورنیو محکمې قاضي صاحب په وړاندې
موضوع: د نفقې -/{monthly_maintenance_amount} دعوا

محترمه!
۱. مدعیه ({plaintiff_name}) او مدعا علیه ({defendant_husband}) نکاح شوی و.
۲. مدعا علیه له میاشتنۍ نفقې انکار کوي.

غوښتنه: میاشتنۍ نفقې منظوري صادر کړئ.

مدعیه: {plaintiff_name}`,
    },
    enclosuresChecklist: {
      en: ['Copy of Nikahnama', 'CNIC Copy of Plaintiff', 'Children B-Form', 'Dowry List'],
      ur: ['نکاح نامہ کاپی', 'شناختی کارڈ مدعیہ', 'بچوں کا ب فارم', 'سامان جہیز کی فہرست'],
      sd: ['نڪاح نامو', 'سڃاڻپ ڪارڊ', 'ب فارم'],
      pa: ['نکاح نامہ کاپی', 'شناختی کارڈ', 'ب فارم'],
      ps: ['د نکاح پاڼه', 'د تذکرې کاپي', 'د ماشومانو ب فارم'],
    },
  },
  {
    id: 'consumer_defective_product',
    category: 'Consumer Protection',
    subject: {
      en: 'Complaint for Refund/Replacement of Defective Goods and Damages under Consumer Protection Act',
      ur: 'درخواست برائے تبدیلی یا رقم کی واپسی اور حرجانہ تحت کنزیومر پروٹیکشن ایکٹ',
      sd: 'درخواست برائي خراب سامان جي واپسي تحت ڪنزيومر پروٽيڪشن ايڪٽ',
      pa: 'درخواست برائے واپسی خراب سامان تے ہرجانہ تحت کنزیومر ایکٹ',
      ps: 'د بې کيفیته توکو تعویض او تاوان غوښتنې غوښتنلیک',
    },
    recipientDepartment: {
      en: 'Before the Presiding Officer / Judge Consumer Court',
      ur: 'جناب عالی پریزائیڈنگ آفیسر / جج کنزیومر کورٹ',
      sd: 'جناب جج ڪنزيومر ڪورٽ',
      pa: 'جناب جج کنزیومر کورٹ',
      ps: 'د پیرودونکو چارو قضايي محکمې رئیس',
    },
    questions: [
      {
        key: 'consumer_name',
        questionText: {
          en: 'Consumer Name (صارف کا نام):',
          ur: 'درخواست دہندہ / صارف کا نام:',
          sd: 'صارف جو نام:',
          pa: 'صارف دا نام:',
          ps: 'د اخیستونکي/مصرف کوونکي نوم:',
        },
        placeholder: {
          en: 'e.g. Usman Ghani',
          ur: 'مثال: عثمان غنی',
          sd: 'مثال: عثمان غني',
          pa: 'مثال: عثمان غنی',
          ps: 'مثال: عثمان غنی',
        },
        type: 'text',
        required: true,
      },
      {
        key: 'seller_store_name',
        questionText: {
          en: 'Seller / Store / Brand Name (دکاندار / کمپنی کا نام):',
          ur: 'دکاندار، اسٹور یا کمپنی کا نام:',
          sd: 'دوڪاندار يا ڪمپني جو نام:',
          pa: 'دکاندار یا کمپنی دا نام:',
          ps: 'د پلورنځي یا کمپنۍ نوم:',
        },
        placeholder: {
          en: 'e.g. Electronics Mart Ltd',
          ur: 'مثال: الیکٹرانکس مارٹ',
          sd: 'مثال: اليڪٽرانڪس مارٽ',
          pa: 'مثال: الیکٹرانکس مارٹ',
          ps: 'مثال: الیکٹرانکس مارټ',
        },
        type: 'text',
        required: true,
      },
      {
        key: 'product_price',
        questionText: {
          en: 'Product Price Paid (مصنوعات کی قیمت):',
          ur: 'خریدی گئی مصنوعات کی قیمت (روپے):',
          sd: 'سامان جي قيمت:',
          pa: 'سامان دی قیمت:',
          ps: 'د جنس د رانیولو بېه:',
        },
        placeholder: {
          en: 'e.g. 140,000',
          ur: '140000',
          sd: '140000',
          pa: '140000',
          ps: '140000',
        },
        type: 'number',
        required: true,
      },
    ],
    letterBodyTemplate: {
      en: `BEFORE THE PRESIDING OFFICER / DISTRICT CONSUMER COURT

Subject: CLAIM PETITION FOR REFUND OF RS. {product_price}/- AND DAMAGES AGAINST DEFECTIVE GOODS OF {seller_store_name}

Respected Court,

1. That the applicant ({consumer_name}) purchased defective products worth Rs. {product_price}/- from the respondent seller ({seller_store_name}).
2. That despite statutory 15-day legal notice served, the seller refused refund or replacement.

PRAYER:
It is prayed that the seller be ordered to refund Rs. {product_price}/- and pay damages for mental harassment.

Applicant: {consumer_name}
Dated: {today_date}`,
      ur: `بخڈمت جناب عالی پریزائیڈنگ آفیسر / جج کنزیومر کورٹ

عنوان: درخواست برائے واپسی رقم -/{product_price} روپے و ادائے حرجانہ بمقابلہ {seller_store_name}

جناب عالی!

1۔ یہ کہ سائل ({consumer_name}) نے مخالف فریق دکاندار ({seller_store_name}) سے مبلغ -/{product_price} روپے کی مصنوعات خریدیں۔
2۔ یہ کہ مصنوعات ناقص و خراب نکلیں اور 15 دن کے قانونی نوٹس کے باوجود مخالف فریق نے رقم کی واپسی سے صاف انکار کر دیا ہے۔

استدعا:
استدعا ہے کہ مخالف فریق کو مبلغ -/{product_price} روپے واپسی اور ہرجانہ ادا کرنے کا حکم دیا جائے۔

سائل: {consumer_name}
بتاریخ: {today_date}`,
      sd: `جناب جج ڪنزيومر ڪورٽ
عنوان: درخواست برائي واپسي رقم -/{product_price} روپيا

جناب!
1. سائل ({consumer_name}) دوڪاندار ({seller_store_name}) مان -/{product_price} جو سامان ورتو.
2. سامان خراب نڪتو ۽ دوڪاندار رقم واپس نٿو ڪري.

استدعا: رقم واپس ڏيارڻ جو حڪم ڏنو وڃي.

سائل: {consumer_name}`,
      pa: `جناب جج کنزیومر کورٹ
عنوان: درخواست برائے رقم واپسی -/{product_price} روپے

جناب عالی!
1. سائل ({consumer_name}) نے دکاندار ({seller_store_name}) توں -/{product_price} دا سامان لیا۔
2. سامان خراب نکتہ تے دکاندار پیسے نہیں دے رہا۔

استدعا: رقم واپس کروائی جائے۔

سائل: {consumer_name}`,
      ps: `د پیرودونکو چارو قضايي محکمې رئیس په وړاندې
موضوع: د پیسو -/{product_price} بېرته اخیستلو ادعا

محترمه!
۱. عریضه کوونکي ({consumer_name}) له پلورونکي ({seller_store_name}) جنس اخستی و.
۲. جنس خراب و او پلورونکی پیسې بېرته نه ورکوي.

غوښتنه: د پیسو بېرته تحویلولو حکم صادر کړئ.

عریضه کوونکی: {consumer_name}`,
    },
    enclosuresChecklist: {
      en: ['Complainant CNIC Copy', 'Purchase Bill Invoice', '15-Day Courier Legal Notice Receipt'],
      ur: ['سائل کا شناختی کارڈ', 'خریداری کا بل / کیش میمو', '15 دن کے نوٹس کی کورئیر رسید'],
      sd: ['سڃاڻپ ڪارڊ', 'خریداري جي رسيد', 'نوٽس رسيد'],
      pa: ['شناختی کارڈ', 'بل رسید', 'نوٹس رسید'],
      ps: ['د تذکرې کاپي', 'د رانیولو فاکتور', 'د واستول شوي نوټس سند'],
    },
  },
  {
    id: 'police_fir_refusal',
    category: 'Police & Criminal Procedure',
    subject: {
      en: 'Petition under Section 22-A/22-B CrPC for Registration of FIR against Police Refusal',
      ur: 'درخواست تحت دفعہ 22-A/22-B ضابطہ فوجداری برائے اندارج مقدمہ / ایف آئی آر',
      sd: 'درخواست تحت 22-A برائي ايف آئي آر داخل ڪرڻ',
      pa: 'درخواست تحت 22-A برائے اندارج ایف آئی آر',
      ps: 'د لومړي رپوټ (FIR) لګولو د نه منلو په پار د ۲۲-A غوښتنلیک',
    },
    recipientDepartment: {
      en: 'In the Court of Worthy Ex-Officio Justice of Peace / Sessions Judge',
      ur: 'جناب عالی جسٹس آف پیس / سیشن جج صاحب',
      sd: 'جناب جسٽس آف پيس / سشن جج',
      pa: 'جناب جسٹس آف پیس / سیشن جج',
      ps: 'محترم جسټس آف پیس قاضي صاحب',
    },
    questions: [
      {
        key: 'complainant_name',
        questionText: {
          en: 'Complainant Name (مدعی کا نام):',
          ur: 'مدعی / درخواست دہندہ کا نام:',
          sd: 'مدعي جو نام:',
          pa: 'مدعی دا نام:',
          ps: 'د عریضه کوونکي نوم:',
        },
        placeholder: {
          en: 'e.g. Kamran Ahmed',
          ur: 'مثال: کامران احمد',
          sd: 'مثال: ڪامران احمد',
          pa: 'مثال: کامران احمد',
          ps: 'مثال: کامران احمد',
        },
        type: 'text',
        required: true,
      },
      {
        key: 'police_station_name',
        questionText: {
          en: 'Police Station / SHO (متعلقہ تھانہ / ایس ایچ او):',
          ur: 'متعلقہ تھانے کا نام یا ایس ایچ او:',
          sd: 'ٿاڻي جو نام:',
          pa: 'تھانے دا نام:',
          ps: 'د پولیسو اړونده حوزه/امریت:',
        },
        placeholder: {
          en: 'e.g. Police Station Shah Shams Multan',
          ur: 'مثال: تھانہ شاہ شمس ملتان',
          sd: 'مثال: ٿاڻو شاه شمس',
          pa: 'مثال: تھانہ شاہ شمس',
          ps: 'مثال: حوزه شاه شمس ملتان',
        },
        type: 'text',
        required: true,
      },
    ],
    letterBodyTemplate: {
      en: `BEFORE THE WORTHY EX-OFFICIO JUSTICE OF PEACE / SESSIONS JUDGE

Subject: PETITION UNDER SECTION 22-A/22-B CrPC FOR DIRECTION TO REGISTER FIR AGAINST SHO {police_station_name}

Respected Justice of Peace,

1. That a cognizable offense was committed against the petitioner ({complainant_name}).
2. That despite written application and complaint to SP, Respondent SHO ({police_station_name}) refused to register FIR under Section 154 CrPC.

PRAYER:
It is prayed that Respondent SHO be directed to record statement and register FIR immediately.

Petitioner: {complainant_name}
Dated: {today_date}`,
      ur: `بخڈمت جناب عالی جسٹس آف پیس / سیشن جج صاحب

عنوان: درخواست تحت دفعہ 22-A/22-B ضابطہ فوجداری برائے ہدایت اندراج ایف آئی آر بمقابلہ ایس ایچ او {police_station_name}

جناب عالی!

1۔ یہ کہ سائل ({complainant_name}) کے ساتھ قابل دست اندازی پولیس جرم وقوع پذیر ہوا۔
2۔ یہ کہ تھانہ میں تحریری درخواست اور ایس پی کو شکایت کے باوجود ایس ایچ او {police_station_name} نے قانون کی خلاف ورزی کرتے ہوئے ایف آئی آر درج کرنے سے صاف انکار کر دیا ہے۔

استدعا:
استدعا ہے کہ ایس ایچ او کو مدعی کا بیان قلمبند کر کے فوری ایف آئی آر درج کرنے کا حکم دیا جائے۔

سائل: {complainant_name}
بتاریخ: {today_date}`,
      sd: `جناب جسٽس آف پيس / سشن جج
عنوان: درخواست تحت 22-A برائي ايف آئي آر

جناب!
1. سائل ({complainant_name}) سان قابل دست اندازي جرم ٿيو.
2. ايس ايڇ او ({police_station_name}) ايف آئي آر داخل نٿو ڪري.

استدعا: ايف آئي آر داخل ڪرڻ جو حڪم ڏنو وڃي.

سائل: {complainant_name}`,
      pa: `جناب جسٹس آف پیس / سیشن جج
عنوان: درخواست تحت 22-A برائے ایف آئی آر

جناب عالی!
1. سائل ({complainant_name}) نال جرم ہویا۔
2. ایس ایچ او ({police_station_name}) ایف آئی آر نہیں کٹ رہا۔

استدعا: ایف آئی آر کٹن دا حکم دتا جائے۔

سائل: {complainant_name}`,
      ps: `د جسټس آف پیس قاضي په وړاندې
موضوع: د ۲۲-A مادې پر بنسټ د FIR د لګولو عریضه

محترمه!
۱. له عریضه کوونکي ({complainant_name}) سره جرم شوی.
۲. امریت ({police_station_name}) له FIR ثبتولو انکار کوي.

غوښتنه: د FIR د ثبتولو مستقیم امر وکړئ.

عریضه کوونکی: {complainant_name}`,
    },
    enclosuresChecklist: {
      en: ['Complainant CNIC Copy', 'Written Application to SHO with Stamp', 'Complaint Receipt of SP Office'],
      ur: ['مدعی کا شناختی کارڈ', 'تھانے میں دی گئی درخواست معہ ڈائری نمبر', 'ایس پی افس میں جمع کروائی گئی رسید'],
      sd: ['سڃاڻپ ڪارڊ', 'ٿاڻي جي درخواست', 'ايس پي آفيس رسيد'],
      pa: ['شناختی کارڈ', 'تھانے دی درخواست', 'ایس پی رسید'],
      ps: ['د تذکرې کاپي', 'حوزې ته ورکړل شوې درخواست کاپي', 'د SP د دفتر رسید'],
    },
  },
  {
    id: 'fia_cybercrime_harassment',
    category: 'Cybercrime',
    subject: {
      en: 'Cybercrime Complaint for Online Blackmail and Harassment under PECA 2016',
      ur: 'درخواست برائے انسداد سائبر کرائم، آن لائن بلیک میلنگ و ہراسانی (تحت پیکا ایکٹ 2016)',
      sd: 'درخواست برائي آن لائن هراسان ڪرڻ تحت پيڪا ايڪٽ 2016',
      pa: 'درخواست برائے سائبر کرائم تے آن لائن ہراسانی تحت پیکا',
      ps: 'د برېښنایي جرمونو او آنلاين ځورونې ځانګړی غوښتنلیک',
    },
    recipientDepartment: {
      en: 'To the Director / Incharge FIA Cyber Crime Wing (NR3C)',
      ur: 'جناب ڈائریکٹر / انچارج صاحب ایف آئی اے سائبر کرائم ونگ',
      sd: 'جناب ڊائريڪٽر ايف آئي اي سائبر ڪرائم',
      pa: 'جناب ڈائریکٹر ایف آئی اے سائبر کرائم',
      ps: 'محترم د FIA الکټرونیکي څېړنو څانګې رئیس',
    },
    questions: [
      {
        key: 'victim_name',
        questionText: {
          en: 'Victim / Complainant Name (متاثرہ شخص کا نام):',
          ur: 'متاثرہ شخص کا مکمل نام:',
          sd: 'متاثر جو نام:',
          pa: 'متاثرہ بندے دا نام:',
          ps: 'د قرباني شوې فرد نوم:',
        },
        placeholder: {
          en: 'e.g. Sana Bibi',
          ur: 'مثال: ثنا بی بی',
          sd: 'مثال: ثنا بي بي',
          pa: 'مثال: ثنا بی بی',
          ps: 'مثال: ثنا بی بی',
        },
        type: 'text',
        required: true,
      },
      {
        key: 'offender_details',
        questionText: {
          en: 'Culprit Phone / Profile URL / Account (ملزم کا نمبر یا اکاؤنٹ):',
          ur: 'ملزم کا موبائل نمبر یا پروفائل لنک:',
          sd: 'ملزم جو نمبر يا لنڪ:',
          pa: 'ملزم دا نمبر یا لنک:',
          ps: 'د مجرم شمیره یا اکاونټ ادرس:',
        },
        placeholder: {
          en: 'e.g. 0300-1234567 or instagram.com/fake_acc',
          ur: '0300-1234567 یا پروفائل لنک',
          sd: '0300-1234567',
          pa: '0300-1234567',
          ps: '0300-1234567',
        },
        type: 'text',
        required: true,
      },
    ],
    letterBodyTemplate: {
      en: `BEFORE THE DIRECTOR / INCHARGE FIA CYBER CRIME WING

Subject: COMPLAINT UNDER SECTIONS 20, 21 & 24 PECA 2016 FOR ONLINE BLACKMAIL AND HARASSMENT BY {offender_details}

Respected Director,

1. That the applicant ({victim_name}) is being subjected to unlawful cyber harassment and extortion by accused ({offender_details}).
2. That digital evidence including screenshots and messages are attached.

PRAYER:
It is prayed that proceedings under PECA 2016 be initiated and account/number be blocked immediately.

Applicant: {victim_name}
Dated: {today_date}`,
      ur: `بخڈمت جناب ڈائریکٹر / انچارج صاحب ایف آئی اے سائبر کرائم ونگ

عنوان: درخواست برائے قانونی کارروائی تحت دفعات 20، 21 اور 24 پیکا ایکٹ 2016 بمقابلہ ملزم {offender_details}

جناب عالی!

1۔ یہ کہ سائلہ ({victim_name}) کو ملزم ({offender_details}) آن لائن ہراساں، بلیک میل اور دھمکیاں دے رہا ہے۔
2۔ یہ کہ سکرین شاٹس اور ڈیجیٹل ثبوت ساتھ منسلک ہیں۔

استدعا:
استدعا ہے کہ پیکا ایکٹ کے تحت ملزم کے خلاف فوری پرچہ درج کر کے کارروائی کی جائے۔

سائلہ: {victim_name}
بتاریخ: {today_date}`,
      sd: `جناب ڊائريڪٽر ايف آئي اي سائبر ڪرائم
عنوان: درخواست تحت پيڪا ايڪٽ 2016

جناب!
1. سائلہ ({victim_name}) کي ملزم ({offender_details}) آن لائن هراسان ڪري رهيو آهي.
2. اسڪرين شاٽس گڏ لڳايون ٿا.

استدعا: قانوني ڪارروائي ڪئي وڃي.

سائلہ: {victim_name}`,
      pa: `جناب ڈائریکٹر ایف آئی اے سائبر کرائم
عنوان: درخواست تحت پیکا ایکٹ 2016

جناب عالی!
1. سائلہ ({victim_name}) نوں ملزم ({offender_details}) آن لائن ہراساں کر رہا اے۔
2. سکرین شاٹس نال لائے نے۔

استدعا: قانونی کارروائی کیتی جائے۔

سائلہ: {victim_name}`,
      ps: `د FIA د برېښنایي جرمونو څانګې امریت په وړاندې
موضوع: د پېکا قانون له مخې عریضه

محترمه!
۱. له سائلې ({victim_name}) سره د تورن ({offender_details}) لخوا انټرنیټي بدکاري کېږي.
۲. دیجیتلي شواهد ضمیمه دي.

غوښتنه: د مجرم برخلاف جدي قانوني ګامونه واخلئ.

سائله: {victim_name}`,
    },
    enclosuresChecklist: {
      en: ['Complainant CNIC Copy', 'Screenshots of Messages & Profile', 'Call Logs'],
      ur: ['سائلہ کا شناختی کارڈ', 'پیغامات اور پروفائل کے سکرین شاٹس', 'کال لاگز'],
      sd: ['سڃاڻپ ڪارڊ', 'اسڪرين شاٽس'],
      pa: ['شناختی کارڈ', 'سکرین شاٹس'],
      ps: ['د تذکرې کاپي', 'د پیامونو سکرین شټونه'],
    },
  },
  {
    id: 'workplace_harassment_ombudsperson',
    category: 'Workplace Harassment',
    subject: {
      en: 'Complaint for Workplace Harassment under Protection against Harassment of Women at Workplace Act 2010',
      ur: 'درخواست برائے انسداد ہراسانی بمقامِ کار تحت یکٹ 2010',
      sd: 'درخواست برائي هراسان ڪرڻ تحت ايڪٽ 2010',
      pa: 'درخواست برائے ہراسانی بمقام کار تحت ایکٹ 2010',
      ps: 'په کارځای کې د ځورونې او هراسانی منع کولو عریضه',
    },
    recipientDepartment: {
      en: 'To the Worthy Federal / Provincial Ombudsperson for Protection Against Harassment',
      ur: 'جناب عالی وفاقی / صوبائی محتسب برائے تحفظ نہ ہراسانی بمقام کار',
      sd: 'جناب محتسب برائي تحفظ نه هراسمينٽ',
      pa: 'جناب محتسب برائے ہراسانی',
      ps: 'محترم د محتسب خپلواک قاضي صاحب',
    },
    questions: [
      {
        key: 'complainant_name',
        questionText: {
          en: 'Complainant Full Name (درخواست دہندہ کا نام):',
          ur: 'سائلہ / درخواست دہندہ کا نام:',
          sd: 'سائلہ جو نام:',
          pa: 'سائلہ دا نام:',
          ps: 'د شکایت کوونکې نوم:',
        },
        placeholder: {
          en: 'e.g. Fatima Zahra',
          ur: 'مثال: فاطمہ زہرا',
          sd: 'مثال: فاطمه زهرا',
          pa: 'مثال: فاطمہ زہرا',
          ps: 'مثال: فاطمه زهرا',
        },
        type: 'text',
        required: true,
      },
      {
        key: 'organization_name',
        questionText: {
          en: 'Organization / Office Name (ادارے / کمپنی کا نام):',
          ur: 'ادارے یا کمپنی کا نام:',
          sd: 'اداري جو نام:',
          pa: 'ادارے دا نام:',
          ps: 'د کارځای/دفتر نوم:',
        },
        placeholder: {
          en: 'e.g. National Bank / Private Firm',
          ur: 'مثال: نیشنل بینک / نجی کمپنی',
          sd: 'مثال: بئنڪ / ڪمپني',
          pa: 'مثال: بینک / کمپنی',
          ps: 'مثال: ملی بانک / خصوصي شرکت',
        },
        type: 'text',
        required: true,
      },
    ],
    letterBodyTemplate: {
      en: `BEFORE THE WORTHY OMBUDSPERSON FOR PROTECTION AGAINST HARASSMENT

Subject: COMPLAINT UNDER PROTECTION AGAINST HARASSMENT OF WOMEN AT WORKPLACE ACT 2010 AGAINST MANAGEMENT OF {organization_name}

Respected Ombudsperson,

1. That the applicant ({complainant_name}) is working in ({organization_name}).
2. That the applicant faced persistent hostile harassment and management failed to act.

PRAYER:
It is prayed that major penalty under Act 2010 be imposed on culprit.

Applicant: {complainant_name}
Dated: {today_date}`,
      ur: `بخڈمت جناب عالی وفاقی / صوبائی محتسب برائے تحفظ نہ ہراسانی بمقامِ کار

عنوان: درخواست برائے کارروائی تحت پروٹیکشن اگینسٹ ہراسمنٹ آف وومن ایٹ ورک پلیس ایکٹ 2010 بمقابلہ {organization_name}

جناب عالی!

1۔ یہ کہ سائلہ ({complainant_name}) ادارہ ({organization_name}) میں ملازم ہے۔
2۔ یہ کہ سائلہ کو مسلسل ہراساں کیا جا رہا ہے اور انتظامیہ کوئی ایکشن نہیں لے رہی۔

استدعا:
استدعا ہے کہ ملزم کے خلاف ایکٹ 2010 کے تحت سنگین سزا اور برطرفی کا حکم دیا جائے۔

سائلہ: {complainant_name}
بتاریخ: {today_date}`,
      sd: `جناب محتسب صاحب
عنوان: درخواست تحت ايڪٽ 2010

جناب!
1. سائلہ ({complainant_name}) اداري ({organization_name}) ۾ ڪم ڪري ٿي.
2. هراسان ڪيو پيو وڃي.

استدعا: سزا ڏني وڃي.

سائلہ: {complainant_name}`,
      pa: `جناب محتسب صاحب
عنوان: درخواست تحت ایکٹ 2010

جناب عالی!
1. سائلہ ({complainant_name}) ادارے ({organization_name}) وچ کام کر دی اے۔
2. ہراساں کیتا جا رہا اے۔

استدعا: سزا دتی جائے۔

سائلہ: {complainant_name}`,
      ps: `د محتسب امربالمعروف قاضي په وړاندې
موضوع: د ځورونې مخنیوي عریضه

محترمه!
۱. سائله ({complainant_name}) په دې کارځای ({organization_name}) کې دنده لري.
۲. له هغې سره بې باوره رویه کېږي.

غوښتنه: د مجرم محاکمه کول منظور کړئ.

سائله: {complainant_name}`,
    },
    enclosuresChecklist: {
      en: ['Complainant CNIC Copy', 'Proof of Employment', 'Evidence / Emails / Witness List'],
      ur: ['سائلہ کا شناختی کارڈ', 'ملازمت کا ثبوت', 'ای میلز یا گواہوں کی فہرست'],
      sd: ['سڃاڻپ ڪارڊ', 'ملازمت ثبوت'],
      pa: ['شناختی کارڈ', 'ملازمت ثبوت'],
      ps: ['د تذکرې کاپي', 'د دندې کارت'],
    },
  },
  {
    id: 'utility_overbilling_nepra',
    category: 'Utility Billing',
    subject: {
      en: 'Application for Rectification of Excessive Utility Bill and Cancellation of Illegal Detection Penalty',
      ur: 'درخواست برائے درستی بجلی بل و منسوخی غیر قانونی ڈٹیکشن چارجز تحت نیپرا ایکٹ',
      sd: 'درخواست برائي بل دروستي ۽ ڊٽيڪشن منسوخي',
      pa: 'درخواست برائے بجلی بل درستی تحت نیپرا ایکٹ',
      ps: 'د برېښنا له نا حقه تحمیلي بل څخه د استیناف غوښتنلیک',
    },
    recipientDepartment: {
      en: 'To the Provincial Electric Inspector / NEPRA Consumer Affairs Division',
      ur: 'جناب عالی صوبائی الیکٹرک انسپکٹر / نیپرا کنزیومر افیئرز ڈویژن',
      sd: 'جناب اليڪٽرڪ انسپيڪٽر / نيپرا آفيس',
      pa: 'جناب الیکٹرک انسپکٹر / نیپرا دفتر',
      ps: 'محترم د برېښنا ولایتي مفتش / د نیپرا ریس',
    },
    questions: [
      {
        key: 'consumer_name',
        questionText: {
          en: 'Consumer Name (صارف کا نام):',
          ur: 'صارف کا نام:',
          sd: 'صارف جو نام:',
          pa: 'صارف دا نام:',
          ps: 'د مشتري نوم:',
        },
        placeholder: {
          en: 'e.g. Rashid Ali',
          ur: 'مثال: راشد علی',
          sd: 'مثال: راشد علي',
          pa: 'مثال: راشد علی',
          ps: 'مثال: راشد علی',
        },
        type: 'text',
        required: true,
      },
      {
        key: 'utility_reference_no',
        questionText: {
          en: 'Consumer Reference Number / Meter No (میٹر ریفرنس نمبر):',
          ur: 'بل کا ریفرنس نمبر یا میٹر نمبر:',
          sd: 'ريفرنس نمبر:',
          pa: 'ریفرنس نمبر:',
          ps: 'د برېښنا میټر ریفرنس شمیره:',
        },
        placeholder: {
          en: 'e.g. 12-34567-8901234',
          ur: '12-34567-8901234',
          sd: '12-34567-8901234',
          pa: '12-34567-8901234',
          ps: '12-34567-8901234',
        },
        type: 'text',
        required: true,
      },
    ],
    letterBodyTemplate: {
      en: `BEFORE THE PROVINCIAL ELECTRIC INSPECTOR / NEPRA

Subject: PETITION UNDER SECTION 38 NEPRA ACT 1997 FOR RECTIFICATION OF BILL REF: {utility_reference_no}

Respected Inspector,

1. That applicant ({consumer_name}) is consumer of reference ({utility_reference_no}).
2. That illegal detection billing was added without notice.

PRAYER:
It is prayed that disputed amount be canceled.

Applicant: {consumer_name}
Dated: {today_date}`,
      ur: `بخڈمت جناب عالی صوبائی الیکٹرک انسپکٹر / نیپرا

عنوان: درخواست برائے درستی بجلی بل ریفرنس نمبر {utility_reference_no} تحت دفعہ 38 نیپرا ایکٹ

جناب عالی!

1۔ یہ کہ سائل ({consumer_name}) ریفرنس نمبر ({utility_reference_no}) کا باقاعدہ صارف ہے۔
2۔ یہ کہ بغیر نوٹس کے غیر قانونی ڈٹیکشن بل شامل کیا گیا ہے۔

استدعا:
استدعا ہے کہ متنازع بل منسوخ کر کے اصل بل کی تصحیح کا حکم دیا جائے۔

سائل: {consumer_name}
بتاریخ: {today_date}`,
      sd: `جناب اليڪٽرڪ انسپيڪٽر
عنوان: درخواست برائي بل دروستي {utility_reference_no}

جناب!
1. سائل ({consumer_name}) بل ريفرنس ({utility_reference_no}) جو صارف آهي.
2. غلط ڊٽيڪشن بل لڳايو ويو آهي.

استدعا: بل منسوخ ڪيو وڃي.

سائل: {consumer_name}`,
      pa: `جناب الیکٹرک انسپکٹر
عنوان: درخواست برائے بل درستی {utility_reference_no}

جناب عالی!
1. سائل ({consumer_name}) بل ریفرنس ({utility_reference_no}) دا صارف اے۔
2. غلط ڈٹیکشن بل لایا گیا اے۔

استدعا: بل منسوخ کیتا جائے۔

سائل: {consumer_name}`,
      ps: `د برېښنا د مفتش په وړاندې
موضوع: د برېښنا د نا حقه بل {utility_reference_no} استیناف

محترمه!
۱. عریضه کوونکی ({consumer_name}) د دغه میټر ({utility_reference_no}) مشتري دی.
۲. تحمیلي پیسې ضمیمه شوې دي.

غوښتنه: د پور لغوه کول منظور کړئ.

عریضه کوونکی: {consumer_name}`,
    },
    enclosuresChecklist: {
      en: ['Complainant CNIC Copy', 'Disputed Bill Copy', 'Photo of Meter Display'],
      ur: ['صارف کا شناختی کارڈ', 'متنازع بل کی کاپی', 'میٹر ریڈنگ کی تصویر'],
      sd: ['سڃاڻپ ڪارڊ', 'متنازعه بل', 'ميٽر تصوير'],
      pa: ['شناختی کارڈ', 'متنازع بل', 'میٹر تصویر'],
      ps: ['د تذکرې کاپي', 'د شخړه ییز بل پاڼه', 'د میټر څرګند عکس'],
    },
  },
  {
    id: 'property_illegal_dispossession',
    category: 'Property & Land',
    subject: {
      en: 'Complaint under Illegal Dispossession Act 2005 for Eviction of Qabza Group and Possession Restoration',
      ur: 'درخواست تحت الیگل ڈس پوزیشن ایکٹ 2005 برائے واگزاری جائیداد و بے دخلی قبضہ مافیا',
      sd: 'درخواست تحت اليگل ڊس پوزيشن ايڪٽ 2005 برائي وراثت و زمين',
      pa: 'درخواست تحت الیگل ڈس پوزیشن ایکٹ 2005 برائے واگزاری زمین',
      ps: 'د غصب شوی املاکو بېرته واکمنولو پر اساس غوښتنلیک',
    },
    recipientDepartment: {
      en: 'In the Court of Worthy District & Sessions Judge',
      ur: 'جناب عالی ڈسٹرکٹ اینڈ سیشنز جج صاحب',
      sd: 'جناب سشن جج ڪورٽ',
      pa: 'جناب سیشن جج صاحب',
      ps: 'محترم د مرکزي جلسو او سیشن قاضي صاحب',
    },
    questions: [
      {
        key: 'owner_name',
        questionText: {
          en: 'Property Owner Name (مالک کا نام):',
          ur: 'مالک جائیداد کا نام:',
          sd: 'مالڪ جو نام:',
          pa: 'مالک دا نام:',
          ps: 'د ځمکې اساسي مالک نوم:',
        },
        placeholder: {
          en: 'e.g. Zainab Bibi',
          ur: 'مثال: زینب بی بی',
          sd: 'مثال: زينب بي بي',
          pa: 'مثال: زینب بی بی',
          ps: 'مثال: زینب بی بی',
        },
        type: 'text',
        required: true,
      },
      {
        key: 'property_details',
        questionText: {
          en: 'Property Khasra / Location Details (جائیداد کا خسرہ نمبر یا پتہ):',
          ur: 'جائیداد کا پتہ یا خسرہ نمبر:',
          sd: 'زمين جو پتو يا نمبر:',
          pa: 'زمین دا پتہ یا نمبر:',
          ps: 'د جايداد ثبت مشخصات او ادرس:',
        },
        placeholder: {
          en: 'e.g. Khasra 412, Sheikhupura',
          ur: 'مثال: خسرہ نمبر 412، شیخوپورہ',
          sd: 'مثال: نمبر 412',
          pa: 'مثال: خسرہ 412',
          ps: 'مثال: خسرې شمیره ۴۱۲، شیخوپوره',
        },
        type: 'text',
        required: true,
      },
    ],
    letterBodyTemplate: {
      en: `BEFORE THE WORTHY DISTRICT & SESSIONS JUDGE

Subject: COMPLAINT UNDER SECTION 3 ILLEGAL DISPOSSESSION ACT 2005 FOR RESTORATION OF POSSESSION OF PROPERTY {property_details}

Respected Sessions Judge,

1. That the complainant ({owner_name}) is lawful title holder of property ({property_details}).
2. That respondents illegally dispossessed the complainant.

PRAYER:
It is prayed that possession be restored immediately under Section 3 Illegal Dispossession Act.

Complainant: {owner_name}
Dated: {today_date}`,
      ur: `بخڈمت جناب عالی ڈسٹرکٹ اینڈ سیشنز جج صاحب

عنوان: درخواست تحت دفعہ 3 الیگل ڈس پوزیشن ایکٹ 2005 برائے واگزاری و بحالی قبضہ جائیداد واقع {property_details}

جناب عالی!

1۔ یہ کہ سائلہ ({owner_name}) جائیداد واقع ({property_details}) کی قانونی مالک ہے۔
2۔ یہ کہ مخالف فریقین نے غیر قانونی طور پر قبضہ مافیا بن کر جائیداد پر ناجائز قبضہ کر لیا ہے۔

استدعا:
استدعا ہے کہ الیگل ڈس پوزیشن ایکٹ کے تحت مخالف فریقین کو بے دخل کر کے سائلہ کو قبضہ واگزار کروایا جائے۔

سائلہ: {owner_name}
بتاریخ: {today_date}`,
      sd: `جناب سشن جج صاحب
عنوان: درخواست تحت اليگل ڊس پوزيشن ايڪٽ 2005

جناب!
1. سائلہ ({owner_name}) جائيداد ({property_details}) جي مالڪ آهي.
2. غير قانوني قبضو ڪيو ويو آهي.

استدعا: قبضو واپس ڏياريو وڃي.

سائلہ: {owner_name}`,
      pa: `جناب سیشن جج صاحب
عنوان: درخواست تحت الیگل ڈس پوزیشن ایکٹ 2005

جناب عالی!
1. سائلہ ({owner_name}) جائیداد ({property_details}) دی مالک اے۔
2. ناجائز قبضہ کیتا گیا اے۔

استدعا: قبضہ واپس کروایا جائے۔

سائلہ: {owner_name}`,
      ps: `د مرکزي سیشن قاضي په وړاندې
موضوع: د ۲۰۰۵ کال قانون له مخې د غصب منع کولو عریضه

محترمه!
۱. سائله ({owner_name}) د املاکو ({property_details}) اصلي حقه خاونده ده.
۲. غير قانوني تصرف شوی دی.

غوښتنه: د ځمکې واک بېرته راسپارل منظور کړئ.

سائله: {owner_name}`,
    },
    enclosuresChecklist: {
      en: ['Complainant CNIC Copy', 'Fard Malkiyat / Registry', 'Legal Notice Receipt'],
      ur: ['سائلہ کا شناختی کارڈ', 'فردِ ملکیت یا رجسٹری بیع نامہ', 'قانونی نوٹس کی رسید'],
      sd: ['سڃاڻپ ڪارڊ', 'فرد يا بئنامو'],
      pa: ['شناختی کارڈ', 'فرد ملکیت'],
      ps: ['د تذکرې کاپي', 'د ملکیت فرد پاڼه'],
    },
  },
  {
    id: 'fbr_taxation_appeal',
    category: 'Taxation & FBR',
    subject: {
      en: 'Complaint before Federal Tax Ombudsman against Unlawful Freezing of Bank Account by FBR',
      ur: 'درخواست برائے انسدادِ بدانتظامی و منسوخی غیر قانونی فریزنگ بینک اکاؤنٹ (تحت ایف ٹی او آرڈیننس)',
      sd: 'درخواست برائي بئنڪ اڪائونٽ ان فريز تحت ايف ٽي او',
      pa: 'درخواست برائے بینک اکاؤنٹ فریز منسوخی تحت ایف ٹی او',
      ps: 'د FBR له لوري د بانکي حساب له غېر قانوني بندېدو استیناف',
    },
    recipientDepartment: {
      en: 'To the Honorable Federal Tax Ombudsman (FTO)',
      ur: 'جناب عالی وفاقی ٹیکس محتسب صاحب',
      sd: 'جناب فيڊرل ٽيڪس محتسب',
      pa: 'جناب فیڈرل ٹیکس محتسب',
      ps: 'محترم د فدرالي ټکس امربالمعروف رییس',
    },
    questions: [
      {
        key: 'taxpayer_name',
        questionText: {
          en: 'Taxpayer Name (ٹیکس دہندہ کا نام):',
          ur: 'ٹیکس دہندہ / درخواست دہندہ کا نام:',
          sd: 'ٽيڪس ڏيندڙ جو نام:',
          pa: 'ٹیکس دہندہ دا نام:',
          ps: 'د ټکس ورکوونکي نوم:',
        },
        placeholder: {
          en: 'e.g. Salim Akhtar',
          ur: 'مثال: سلیم اختر',
          sd: 'مثال: سليم اختر',
          pa: 'مثال: سلیم اختر',
          ps: 'مثال: سلیم اختر',
        },
        type: 'text',
        required: true,
      },
      {
        key: 'ntn_number',
        questionText: {
          en: 'NTN or CNIC Number (این ٹی این یا شناختی کارڈ):',
          ur: 'این ٹی این یا شناختی کارڈ نمبر:',
          sd: 'NTN يا سڃاڻپ ڪارڊ:',
          pa: 'NTN یا شناختی کارڈ:',
          ps: 'د ټکس خاوند NTN يا تذکره شمیره:',
        },
        placeholder: {
          en: 'e.g. 1234567-8 or 36302-1234567-1',
          ur: '1234567-8',
          sd: '1234567-8',
          pa: '1234567-8',
          ps: '1234567-8',
        },
        type: 'text',
        required: true,
      },
    ],
    letterBodyTemplate: {
      en: `BEFORE THE HONORABLE FEDERAL TAX OMBUDSMAN

Subject: COMPLAINT AGAINST FBR MALADMINISTRATION FOR UNLAWFUL FREEZING OF BANK ACCOUNT OF NTN: {ntn_number}

Respected Ombudsman,

1. That complainant ({taxpayer_name}, NTN: {ntn_number}) faced illegal freezing of bank account without Section 140 statutory prior notice.
2. That this constitutes administrative harassment under FTO Ordinance 2000.

PRAYER:
It is prayed that FBR be directed to unfreeze bank account immediately.

Complainant: {taxpayer_name}
Dated: {today_date}`,
      ur: `بخڈمت جناب عالی وفاقی ٹیکس محتسب صاحب

عنوان: درخواست برائے بدانتظامی ایف بی آر اور غیر قانونی فریزنگ بینک اکاؤنٹ متعلقہ این ٹی این {ntn_number}

جناب عالی!

1۔ یہ کہ سائل ({taxpayer_name}، این ٹی این: {ntn_number}) کا بینک اکاؤنٹ ایف بی آر نے بغیر کسی تحریری نوٹس کے غیر قانونی طور پر منجمد کر دیا ہے۔
2۔ یہ کہ یہ اقدام ایف ٹی او قانون کی رو سے شدید انتظامی بدانتظامی اور ہراسانی کے زمرے میں آتا ہے۔

استدعا:
استدعا ہے کہ ایف بی آر کو سائل کا بینک اکاؤنٹ فوراً بحال کرنے کا حکم صادر فرمایا جائے۔

سائل: {taxpayer_name}
بتاریخ: {today_date}`,
      sd: `جناب فيڊرل ٽيڪس محتسب
عنوان: درخواست برائي بئنڪ اڪائونٽ ان فريز {ntn_number}

جناب!
1. سائل ({taxpayer_name}) جو بئنڪ اڪائونٽ ايف بي آر بغير نوٽس فريز ڪيو آهي.

استدعا: اڪائونٽ ان فريز ڪيو وڃي.

سائل: {taxpayer_name}`,
      pa: `جناب فیڈرل ٹیکس محتسب
عنوان: درخواست برائے بینک اکاؤنٹ ان فریز {ntn_number}

جناب عالی!
1. سائل ({taxpayer_name}) دا بینک اکاؤنٹ ایف بی آر نے بغیر نوٹس فریز کیتا اے۔

استدعا: اکاؤنٹ بحال کیتا جائے۔

سائل: {taxpayer_name}`,
      ps: `د فدرالي ټکس محتسب په وړاندې
موضوع: د FBR د غېر قانوني بانک انجماد ضد استیناف {ntn_number}

محترمه!
۱. له عریضه کوونکي ({taxpayer_name}) څخه له مخکیني خبرتیا پرته بانکي حساب انجماد شوی.

غوښتنه: د حساب سمدستي پرانیستل منظور کړئ.

عریضه کوونکی: {taxpayer_name}`,
    },
    enclosuresChecklist: {
      en: ['Complainant CNIC Copy', 'Bank Account Freezing Notice Copy', 'NTN Certificate'],
      ur: ['سائل کا شناختی کارڈ', 'بینک اکاؤنٹ فریزنگ آرڈر کاپی', 'این ٹی این سرٹیفکیٹ'],
      sd: ['سڃاڻپ ڪارڊ', 'بئنڪ ليٽر'],
      pa: ['شناختی کارڈ', 'بینک لیٹر'],
      ps: ['د تذکرې کاپي', 'د بانکي انجماد ليک'],
    },
  },
  {
    id: 'family_divorce_notice',
    category: 'Family Law & Marital Matters',
    subject: {
      en: 'Notice of Talaq / Khula / Marriage Dissolution under Muslim Family Laws Ordinance 1961',
      ur: 'نوٹس طلاق / خلع / تنسیخ نکاح تحت مسلم فیملی لاؤز آرڈیننس 1961 (دفعہ 7 و 8)',
      sd: 'نوٽس طلاق / خلع / تنسيخ نڪاح تحت مسلم فيملي لاز آرڊيننس 1961',
      pa: 'نوٹس طلاق / خلع / تنسیخ نکاح تحت مسلم فیملی لاز آرڈیننس 1961',
      ps: 'د طلاق / خلع / نکاح د فسخې رسمي خبرتیا ليک (مسلم فیملی لاز آرډیننس ۱۹۶۱)',
    },
    recipientDepartment: {
      en: 'The Chairman / Secretary, Union Council / Municipal Committee',
      ur: 'جناب چیئرمین / سیکرٹری صاحب، یونین کونسل / میونسپل کمیٹی',
      sd: 'جناب چيئرمين / سيڪريٽري، يونين ڪائونسل',
      pa: 'جناب چیئرمین / سیکرٹری، یونین کونسل',
      ps: 'محترم رئيس / سکرټر صاحب، یونین کونسل / ښاروالۍ کمېټه',
    },
    questions: [
      {
        key: 'complainant_name',
        questionText: {
          en: 'Full Name of Spouse Issuing Notice (نوٹس دہندہ کا نام):',
          ur: 'نوٹس دہندہ کا مکمل نام (شوہر / زوجہ):',
          sd: 'نوٽس ڏيندڙ جو پورو نام:',
          pa: 'نوٹس دین والے دا مکمل نام:',
          ps: 'د نوټس استونکي بشپړ نوم:',
        },
        placeholder: {
          en: 'e.g. Muhammad Usman / Saira Bano',
          ur: 'مثلاً: محمد عثمان / سائیرہ بانو',
          sd: 'مثلاً: محمد عثمان / سائره بانو',
          pa: 'مثلاً: محمد عثمان / سائیرہ بانو',
          ps: 'مثال: محمد عثمان / سائره بانو',
        },
        type: 'text',
        required: true,
      },
      {
        key: 'complainant_cnic',
        questionText: {
          en: 'CNIC Number of Spouse Issuing Notice (شناختی کارڈ نمبر):',
          ur: 'نوٹس دہندہ کا شناختی کارڈ نمبر:',
          sd: 'سڃاڻپ ڪارڊ نمبر:',
          pa: 'شناختی کارڈ نمبر:',
          ps: 'د تذکرې شمیره:',
        },
        placeholder: {
          en: 'e.g. 35202-1234567-1',
          ur: '35202-1234567-1',
          sd: '35202-1234567-1',
          pa: '35202-1234567-1',
          ps: '35202-1234567-1',
        },
        type: 'text',
        required: true,
      },
      {
        key: 'respondent_spouse_name',
        questionText: {
          en: 'Name of Other Spouse (مخالف فریق / شوہر یا بیوی کا نام):',
          ur: 'مخالف فریق (شوہر یا زوجہ) کا نام:',
          sd: 'مخالف ڌر (مڙس يا زال) جو نام:',
          pa: 'مخالف فریق (شوہر یا بیوی) دا نام:',
          ps: 'د بل لوري (خاوند یا مېرمنې) نوم:',
        },
        placeholder: {
          en: 'e.g. Saira Bano / Muhammad Usman',
          ur: 'مثلاً: سائیرہ بانو / محمد عثمان',
          sd: 'مثلاً: سائره بانو',
          pa: 'مثلاً: سائیرہ بانو',
          ps: 'مثال: سائره بانو',
        },
        type: 'text',
        required: true,
      },
      {
        key: 'union_council_name',
        questionText: {
          en: 'Union Council Name & Number (یونین کونسل کا نام و نمبر):',
          ur: 'متعلقہ یونین کونسل کا نام و شہر:',
          sd: 'يونين ڪائونسل جو نام ۽ نمبر:',
          pa: 'یونین کونسل دا نام تے شہر:',
          ps: 'د اړوند یونین کونسل نوم او سیمه:',
        },
        placeholder: {
          en: 'e.g. Union Council No. 45, Sector G-9/2, Islamabad',
          ur: 'مثلاً: یونین کونسل نمبر 45، گلبرگ، لاہور',
          sd: 'مثلاً: يونين ڪائونسل 12، حيدرآباد',
          pa: 'مثلاً: یونین کونسل 45، لاہور',
          ps: 'مثال: یونین کونسل ۴۵، پیښور',
        },
        type: 'text',
        required: true,
      },
    ],
    letterBodyTemplate: {
      en: `BEFORE THE CHAIRMAN / SECRETARY, UNION COUNCIL: {union_council_name}

SUBJECT: WRITTEN NOTICE OF MARRIAGE DISSOLUTION / TALAQ UNDER SECTION 7 / 8 OF MUSLIM FAMILY LAWS ORDINANCE 1961

Respected Chairman,

1. That applicant ({complainant_name}, CNIC: {complainant_cnic}) was lawfully married to respondent ({respondent_spouse_name}).
2. That due to irreconcilable differences, the applicant hereby pronounces divorce / notice of dissolution under Section 7 / Section 8 of MFLO 1961.
3. A copy of this notice has been dispatched to the respondent via Registered Post A.D.

PRAYER:
It is prayed that the Chairman constitute an Arbitration Council for mandatory 90 days reconciliation period and, upon failure, issue the official Certificate of Effectiveness of Divorce.

Applicant: {complainant_name}
CNIC: {complainant_cnic}
Date: {today_date}`,
      ur: `بخدمت جناب چیئرمین / سیکرٹری صاحب، یونین کونسل: {union_council_name}

عنوان: تحریری نوٹس طلاق / انحلالِ نکاح تحت دفعہ 7 و 8 مسلم فیملی لاؤز آرڈیننس 1961

جناب عالی!

1۔ یہ کہ سائل ({complainant_name}، شناختی کارڈ: {complainant_cnic}) کا نکاح مسمات / مسمی ({respondent_spouse_name}) سے قائم تھا۔
2۔ یہ کہ ناگزیر وجوہات اور شدید ناموافقت کی بناء پر سائل حسبِ ضابطہ مسلم فیملی لاؤز آرڈیننس 1961 کی دفعہ 7 / 8 کے تحت یہ تحریری نوٹس طلاق ارسال کر رہا / رہی ہے۔
3۔ اس نوٹس کی ایک کاپی بذریعہ رجسٹری اے ڈی مخالف فریق کو بھی ارسال کر دی گئی ہے۔

استدعا:
استدعا ہے کہ ضابطہ کے مطابق مصالحتی کونسل تشکیل دی جائے اور 90 دن کی عدت کے بعد طلاق کے موثر ہونے کا باضابطہ نادرا ڈورس سرٹیفکیٹ جاری فرمایا جائے۔

سائل / سائلہ: {complainant_name}
شناختی کارڈ: {complainant_cnic}
بتاریخ: {today_date}`,
      sd: `جناب چيئرمين يونين ڪائونسل: {union_council_name}
عنوان: تحريري نوٽس طلاق تحت مسلم فيملي لاز 1961

جناب!
1. سائل ({complainant_name}) جو نڪاح ({respondent_spouse_name}) سان ٿيل هو.
2. ناگزير حالتن سبب طلاق جو نوٽس موڪليو وڃي ٿو.

استدعا: 90 ڏينهن بعد سرٽيفڪيٽ جاري ڪيو وڃي.

سائل: {complainant_name}
تاريخ: {today_date}`,
      pa: `جناب چیئرمین یونین کونسل: {union_council_name}
عنوان: تحریری نوٹس طلاق تحت مسلم فیملی لاز 1961

جناب عالی!
1. سائل ({complainant_name}) دا نکاح ({respondent_spouse_name}) نال ہویا سی۔
2. شدید اختلافات پاروں طلاق نوٹس بھیجیا جا رہیا اے۔

استدعا: 90 دن بعد طلاق سرٹیفکیٹ جاری کیتا جائے۔

سائل: {complainant_name}
بتاریخ: {today_date}`,
      ps: `د یونین کونسل ښاغلي رئيس / سکرټر ته: {union_council_name}
موضوع: د مسلم فیملی لاز آرډیننس ۱۹۶۱ له مخې د طلاق رسمي خبرپاڼه

محترمه!
۱. عریضه کوونکی ({complainant_name}) له ({respondent_spouse_name}) سره په مسنونه نکاح کې و.
۲. د سختو اختلافاتو پر بنسټ رسمي خبرداری لېږل کېږي.

غوښتنه: د ۹۰ ورځنۍ قانوني مودي تېرېدو وروسته د بېلېدو رسمي سند صادر کړئ.

عریضه کوونکی: {complainant_name}
نېټه: {today_date}`,
    },
    enclosuresChecklist: {
      en: ['Copy of Nikahnama', 'Applicant CNIC Copy', 'Postal Receipt of Registered Notice sent to Spouse'],
      ur: ['نکاح نامہ کی کاپی', 'سائل کا شناختی کارڈ', 'مخالف فریق کو بھیجے گئے نوٹس کی ڈاک رسید'],
      sd: ['نڪاح نامو', 'سڃاڻپ ڪارڊ', 'ڊاڪ رسيد'],
      pa: ['نکاح نامہ کاپی', 'شناختی کارڈ', 'ڈاک رسید'],
      ps: ['د نکاح نامې کاپي', 'د تذکرې کاپي', 'د پوسټي پېسو رسید'],
    },
  },
];


