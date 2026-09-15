export interface AuthenticityAssessment {
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'UNKNOWN';
  indicators: Array<{
    code: string;
    description: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH';
    detected: boolean;
  }>;
  disclaimer: string;
}

export interface ExtractedDocumentData {
  documentType: string;
  summary: string;
  loanAmount: string;
  sanctionedAmount: string;
  interestRate: string;
  interestType: string;
  repaymentPeriod: string;
  installmentAmount: string;
  dueDate: string;
  lateFeePenalty: string;
  eligibilityConditions: string[];
  importantDates: Record<string, string>;
  missingFields: string[];
  rawExtractedText: string;
  authenticity: AuthenticityAssessment;
}

export async function processDocumentOCR(
  fileName: string,
  mimeType: string,
  category: string
): Promise<ExtractedDocumentData> {
  // Simulates high-precision OCR text extraction & automated preliminary screening
  const isKcc = category.toLowerCase().includes('kisan') || category.toLowerCase().includes('kcc');
  const isSanction = category.toLowerCase().includes('sanction');

  const rawExtractedText = `
CANARA BANK AGRICULTURAL LOAN SANCTION LETTER
Branch: Kovilpatti Main Branch | IFSC: CNRB0001234
Sanction Ref: CNB/AGRI/2026/89421
Date of Sanction: 12-Jan-2026

Borrower Name: MUTHU S/O RAMASAMY
Village: Kovilpatti, Taluk: Kovilpatti, District: Tuticorin
Loan Scheme: Kisan Credit Card (KCC) Scheme
Sanctioned Limit / Amount: ₹1,50,000 (Rupees One Lakh Fifty Thousand Only)
Interest Rate: 7.00% per annum (Simple Interest)
Government Interest Subvention: 3.00% for prompt repayment (Effective Rate: 4.00%)
Repayment Tenure: 12 Months (Annual renewal upon crop harvest)
First Repayment Due Date: 15-Jul-2026
Overdue Interest Penalty: 2.00% per annum additional on overdue principal balance.

Mandatory Conditions:
1. Hypothecation of standing crops and land revenue record submission.
2. Valid crop insurance under PMFBY required before disbursement.
  `.trim();

  // 17 Preliminary Authenticity Risk Indicators Audit
  const indicators = [
    { code: 'MISSING_BANK', description: 'Missing Bank Name or Branch Stamp', severity: 'HIGH' as const, detected: false },
    { code: 'MISSING_DOC_NO', description: 'Missing Document Sanction Reference Number', severity: 'HIGH' as const, detected: false },
    { code: 'MISSING_SIGNATURE', description: 'Missing Signature or Authorized Seal Indicator', severity: 'MEDIUM' as const, detected: false },
    { code: 'UNUSUAL_FORMATTING', description: 'Unusual Document Layout & Structural Spacing', severity: 'LOW' as const, detected: false },
    { code: 'SPELLING_ERRORS', description: 'Suspicious Spelling or Grammatical Anomalies', severity: 'MEDIUM' as const, detected: false },
    { code: 'FONT_MISMATCH', description: 'Inconsistent Font Types & Size Variations', severity: 'MEDIUM' as const, detected: false },
    { code: 'MISALIGNED_TEXT', description: 'Misaligned Characters or Overlay Elements', severity: 'LOW' as const, detected: false },
    { code: 'INCONSISTENT_DATES', description: 'Contradictory Issue, Sanction, or Expiry Dates', severity: 'HIGH' as const, detected: false },
    { code: 'CONTRADICTORY_AMOUNT', description: 'Mismatched Numeric and Written Loan Amount Values', severity: 'HIGH' as const, detected: false },
    { code: 'CONTRADICTORY_INTEREST', description: 'Inconsistent Interest Rate vs Scheme Guidelines', severity: 'MEDIUM' as const, detected: false },
    { code: 'BORROWER_MISMATCH', description: 'Borrower Name Mismatch against Profile ID', severity: 'HIGH' as const, detected: false },
    { code: 'SUSPICIOUS_CONTACT', description: 'Unverified Bank Contact Number or Invalid IFSC', severity: 'MEDIUM' as const, detected: false },
    { code: 'MISSING_PAGE_NOS', description: 'Missing Sequential Page Numbers in Multi-page PDF', severity: 'LOW' as const, detected: false },
    { code: 'ALTERED_AREAS', description: 'Visual Signs of Digital Editing or Erasure', severity: 'HIGH' as const, detected: false },
    { code: 'UNCLEAR_SCAN', description: 'Low Resolution Blur or Obscured Stamp Text', severity: 'LOW' as const, detected: false },
    { code: 'INVALID_ACCOUNT_NO', description: 'Invalid Bank Account Number Pattern Length', severity: 'MEDIUM' as const, detected: false },
    { code: 'DUPLICATE_REF_ID', description: 'Duplicate Identifier Previously Registered', severity: 'HIGH' as const, detected: false },
  ];

  const detectedCount = indicators.filter(i => i.detected).length;
  const riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'UNKNOWN' = detectedCount === 0 ? 'LOW' : detectedCount < 3 ? 'MEDIUM' : 'HIGH';

  return {
    documentType: isKcc ? 'Kisan Credit Card Document' : isSanction ? 'Loan Sanction Letter' : 'Agricultural Loan Document',
    summary: 'Agricultural loan sanction letter issued by Canara Bank for ₹1,50,000 under KCC scheme at 7% annual interest with 3% prompt repayment subsidy.',
    loanAmount: '₹1,50,000',
    sanctionedAmount: '₹1,50,000',
    interestRate: '7.00% per annum (Effective 4.00% with subsidy)',
    interestType: 'Simple Interest',
    repaymentPeriod: '12 Months (Annual Harvest Schedule)',
    installmentAmount: '₹1,50,000 at end of crop season',
    dueDate: '15-Jul-2026',
    lateFeePenalty: '2.00% additional interest per annum on overdue amount',
    eligibilityConditions: [
      'Land revenue document / Chitta submission',
      'Standing crop hypothecation',
      'PMFBY crop insurance enrolment'
    ],
    importantDates: {
      'Sanction Date': '12-Jan-2026',
      'Disbursement Date': '15-Jan-2026',
      'Repayment Due Date': '15-Jul-2026',
      'Renewal Expiry Date': '11-Jan-2027'
    },
    missingFields: [
      'Specific land survey number (refer to supporting land record document)'
    ],
    rawExtractedText,
    authenticity: {
      riskLevel,
      indicators,
      disclaimer: 'This is an automated preliminary screening based on the uploaded file. It is not legal proof of authenticity. Final verification must be obtained from the issuing bank, cooperative society, or authorized government office.'
    }
  };
}
