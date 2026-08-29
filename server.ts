import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Set large JSON body limit to support base64 document images
  app.use(express.json({ limit: '20mb' }));

  // Health check route
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  function parseGeminiJsonResponse(responseText: string) {
    const cleaned = responseText
      .trim()
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();
    return JSON.parse(cleaned);
  }

  // Helper function to handle model generation with retry and fallback across multiple models
  async function generateContentWithRetry(ai: GoogleGenAI, requestParams: any) {
    const modelsToTry = [
      'gemini-3.6-flash',
      'gemini-flash-latest',
      'gemini-3.1-flash-lite',
    ];
    let lastError: any = null;

    for (const modelName of modelsToTry) {
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const response = await ai.models.generateContent({
            ...requestParams,
            model: modelName,
          });
          if (response && response.text) {
            return response;
          }
        } catch (err: any) {
          lastError = err;
          const errStr = String(err?.message || err || '');
          const isQuotaOrRateLimit =
            errStr.includes('429') ||
            errStr.includes('RESOURCE_EXHAUSTED') ||
            errStr.includes('Quota exceeded') ||
            errStr.includes('rate-limits');

          if (isQuotaOrRateLimit) {
            // Instantly try next model if this model's quota is exhausted
            console.warn(`Model ${modelName} hit rate/quota limit. Trying next model...`);
            break;
          }

          const isTransient =
            errStr.includes('503') ||
            errStr.includes('UNAVAILABLE') ||
            errStr.includes('high demand') ||
            errStr.includes('500');

          if (isTransient && attempt === 0) {
            await new Promise((r) => setTimeout(r, 600));
            continue;
          } else {
            break;
          }
        }
      }
    }

    const errMessage = String(lastError?.message || lastError || '');
    if (
      errMessage.includes('429') ||
      errMessage.includes('RESOURCE_EXHAUSTED') ||
      errMessage.includes('Quota exceeded')
    ) {
      throw new Error(
        'AI rate limit or quota temporarily reached. Local offline analysis activated.'
      );
    }

    throw lastError || new Error('Gemini API request failed across all available models.');
  }

  // Multimodal Image Analysis Route for Legal Documents
  app.post('/api/explain-image', async (req, res) => {
    try {
      const { imageBase64, mimeType, lang } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ error: 'Image data is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: 'GEMINI_API_KEY environment variable is missing on the server. Please check Settings > Secrets.',
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const langNames: Record<string, string> = {
        ur: 'Urdu (اردو)',
        sd: 'Sindhi (سنڌي)',
        pa: 'Punjabi (پنجابی)',
        ps: 'Pashto (پښتو)',
        en: 'English',
      };

      const selectedLangName = langNames[lang] || 'Urdu (اردو)';

      // Remove base64 data URL prefix if provided
      const cleanBase64 = imageBase64.replace(/^data:[^;]+;base64,/, '');

      const promptText = `You are an expert Pakistani Legal Assistant and OCR Document Classifier.
Analyze this attached image of a Pakistani document (e.g. Nikahnama, Rent Agreement, Stamp Paper, Court Summons, FIR, Sale Deed, Affidavit, Utility Bill, Contract, or Legal Notice).

Perform complete OCR text recognition and legal analysis.
Produce your full response strictly in the target language: ${selectedLangName}.

Break down the document so an average Pakistani citizen can easily understand its contents, legal implications, rights, duties, and necessary next steps under Pakistani Law.

Return a JSON object adhering strictly to this schema:
- title: Accurately identify and state the exact document type or title in ${selectedLangName} based strictly on the image (e.g., Rent Agreement, Affidavit, Police FIR, Nikahnama, Consumer Complaint, Employment Contract, Utility Bill, or General Legal Document). Do NOT default to Court Summons unless the image explicitly contains a judicial summons or court notice.
- summary: A clear, accessible summary in ${selectedLangName} explaining what this document is, key terms, obligations, and consequences.
- extractedDetails: An array of key extracted details (Parties, Dates, Amounts/Dower/Rent, Document Registration/Stamp Number, Location/Court) with 'label', 'value', and 'isExtracted' (boolean).
- nextSteps: An array of practical step-by-step action items in ${selectedLangName}.
- termsDecoded: An array of ONLY the key legal terms strictly RELEVANT to this specific document content (3 to 6 terms max) with 'term' and 'definition' in ${selectedLangName}. Do NOT include unrelated terms (e.g., do not include divorce or criminal terms in a rent agreement).
- statuteCitation: Relevant Pakistani law or statute citation (e.g., "Muslim Family Laws Ordinance 1961", "West Pakistan Urban Rent Restriction Ordinance 1959", "Code of Criminal Procedure 1898").
- practicalAdvice: Practical guidance on notary attestation, court filing, stamp duty, or verification in ${selectedLangName}.`;

      const response = await generateContentWithRetry(ai, {
        contents: {
          parts: [
            {
              inlineData: {
                data: cleanBase64,
                mimeType: mimeType || 'image/jpeg',
              },
            },
            {
              text: promptText,
            },
          ],
        },
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              extractedDetails: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    label: { type: Type.STRING },
                    value: { type: Type.STRING },
                    isExtracted: { type: Type.BOOLEAN },
                  },
                  required: ['label', 'value', 'isExtracted'],
                },
              },
              nextSteps: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              termsDecoded: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    term: { type: Type.STRING },
                    definition: { type: Type.STRING },
                  },
                  required: ['term', 'definition'],
                },
              },
              statuteCitation: { type: Type.STRING },
              practicalAdvice: { type: Type.STRING },
            },
            required: [
              'title',
              'summary',
              'extractedDetails',
              'nextSteps',
              'termsDecoded',
              'statuteCitation',
              'practicalAdvice',
            ],
          },
        },
      });

      const responseText = response.text;
      if (!responseText) {
        return res.status(500).json({ error: 'Gemini model returned an empty response.' });
      }

      const parsedData = parseGeminiJsonResponse(responseText);
      res.json(parsedData);
    } catch (err: any) {
      console.warn('AI image document analysis notice:', err.message || err);
      res.status(429).json({
        error: err.message || 'An error occurred while processing the document image.',
      });
    }
  });

  // Text Analysis Route for Legal Documents
  app.post('/api/explain-text', async (req, res) => {
    try {
      const { text, lang } = req.body;
      if (!text || !text.trim()) {
        return res.status(400).json({ error: 'Text content is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: 'GEMINI_API_KEY environment variable is missing on the server. Please check Settings > Secrets.',
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const langNames: Record<string, string> = {
        ur: 'Urdu (اردو)',
        sd: 'Sindhi (سنڌي)',
        pa: 'Punjabi (پنجابی)',
        ps: 'Pashto (پښتو)',
        en: 'English',
      };

      const selectedLangName = langNames[lang] || 'Urdu (اردو)';

      const promptText = `You are an expert Pakistani Legal Assistant and Document Classifier.
Analyze the following text of a Pakistani legal document or agreement (e.g. Tenancy/Rent Agreement, Nikahnama, Stamp Paper, Court Summons/Notice, FIR, Affidavit, Utility Bill, Sale Deed, Consumer Complaint, etc.):

--- DOCUMENT TEXT START ---
${text}
--- DOCUMENT TEXT END ---

Perform complete legal analysis and breakdown.
Produce your full response strictly in the target language: ${selectedLangName}.

Break down the document so an average Pakistani citizen can easily understand its contents, legal implications, rights, duties, and necessary next steps under Pakistani Law.

Return a JSON object adhering strictly to this schema:
- title: Accurately identify and state the exact document type or title in ${selectedLangName} based strictly on the contents of the uploaded text (e.g., Rent Agreement, Affidavit, Police Application/FIR, Nikahnama, Consumer Complaint, Employment Contract, Utility Bill, or General Legal Document). Do NOT default to Court Summons unless the text explicitly contains a court summons or judicial notice.
- summary: A clear, accessible summary in ${selectedLangName} explaining what this document is, key terms, obligations, and consequences.
- extractedDetails: An array of key extracted details (Parties, Dates, Amounts/Dower/Rent, Document Registration/Stamp Number, Location/Court) with 'label', 'value', and 'isExtracted' (boolean).
- nextSteps: An array of practical step-by-step action items in ${selectedLangName}.
- termsDecoded: An array of ONLY the key legal terms strictly RELEVANT to this specific document content (3 to 6 terms max) with 'term' and 'definition' in ${selectedLangName}. Do NOT include unrelated terms (e.g., do not include divorce or criminal terms in a rent agreement).
- statuteCitation: Relevant Pakistani law or statute citation (e.g., "Muslim Family Laws Ordinance 1961", "West Pakistan Urban Rent Restriction Ordinance 1959", "Code of Criminal Procedure 1898").
- practicalAdvice: Practical guidance on notary attestation, court filing, stamp duty, or verification in ${selectedLangName}.`;

      const response = await generateContentWithRetry(ai, {
        contents: promptText,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              extractedDetails: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    label: { type: Type.STRING },
                    value: { type: Type.STRING },
                    isExtracted: { type: Type.BOOLEAN },
                  },
                  required: ['label', 'value', 'isExtracted'],
                },
              },
              nextSteps: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              termsDecoded: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    term: { type: Type.STRING },
                    definition: { type: Type.STRING },
                  },
                  required: ['term', 'definition'],
                },
              },
              statuteCitation: { type: Type.STRING },
              practicalAdvice: { type: Type.STRING },
            },
            required: [
              'title',
              'summary',
              'extractedDetails',
              'nextSteps',
              'termsDecoded',
              'statuteCitation',
              'practicalAdvice',
            ],
          },
        },
      });

      const responseText = response.text;
      if (!responseText) {
        return res.status(500).json({ error: 'Gemini model returned an empty response.' });
      }

      const parsedData = parseGeminiJsonResponse(responseText);
      res.json(parsedData);
    } catch (err: any) {
      console.warn('AI text document analysis notice:', err.message || err);
      res.status(429).json({
        error: err.message || 'An error occurred while processing the document text.',
      });
    }
  });

  // Smart AI Legal Complaint Drafting Route
  app.post('/api/draft-complaint', async (req, res) => {
    try {
      const {
        complaintCategory,
        applicantName,
        cnicNumber,
        postalAddress,
        mobileNumber,
        oppositeParty,
        incidentDate,
        cityJurisdiction,
        claimAmount,
        incidentDetails,
        evidenceList,
        lang,
      } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: 'GEMINI_API_KEY environment variable is missing on the server.',
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const langNames: Record<string, string> = {
        ur: 'Urdu (اردو)',
        sd: 'Sindhi (سنڌي)',
        pa: 'Punjabi (پنجابی)',
        ps: 'Pashto (پښتو)',
        en: 'English',
      };

      const targetLang = langNames[lang] || 'Urdu (اردو)';

      const promptText = `You are a Senior Pakistani High Court Advocate & Legal Draftsman.
Draft a formal, legally binding court complaint / petition in target language: ${targetLang}.

COMPLAINT DETAILS:
- Authority / Forum: ${complaintCategory || 'Consumer Court / Competent Forum'}
- Applicant Name: ${applicantName || 'Applicant'}
- CNIC Number: ${cnicNumber || 'N/A'}
- Contact Address: ${postalAddress || 'N/A'}
- Mobile Phone: ${mobileNumber || 'N/A'}
- Opposite Party / Respondent: ${oppositeParty || 'Respondent'}
- Date of Incident / Cause of Action: ${incidentDate || 'N/A'}
- City / Jurisdiction: ${cityJurisdiction || 'Islamabad'}
- Claim / Damages Amount: PKR ${claimAmount || 'As assessed by Court'}
- Incident Details: "${incidentDetails || 'No details provided'}"
- Available Evidence: ${Array.isArray(evidenceList) ? evidenceList.join(', ') : 'CNIC Copy, Receipts'}

INSTRUCTIONS:
1. Follow standard Pakistani legal petition format (Court Heading, Party Descriptions, Versus, Subject Title citing exact relevant Acts/Sections like Consumer Protection Act, CrPC 154, PECA 2016, Rented Premises Act, or Wafaqi Mohtasib Order 1983).
2. Write numbered paragraphs stating facts, legal breach, and cause of action.
3. Include an explicit list of attached documentary evidence.
4. Include a formal Prayer / Relief Sought section.
5. Include Verification Statement and Signature Block.
6. Return raw text of the complete legal complaint draft ready for print/court submission.`;

      const response = await generateContentWithRetry(ai, {
        contents: promptText,
      });

      const text = response.text || '';
      res.json({ draftText: text });
    } catch (err: any) {
      console.warn('AI complaint drafting error:', err.message || err);
      res.status(500).json({ error: err.message || 'Failed to generate AI draft.' });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
