import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Farmer Docx database...');

  const passwordHash = await bcrypt.hash('farmer123', 10);
  const adminHash = await bcrypt.hash('admin123', 10);
  const superHash = await bcrypt.hash('super123', 10);

  // 1. Create Farmers
  const farmerMuthu = await prisma.user.upsert({
    where: { mobile: '9876543210' },
    update: {},
    create: {
      name: 'Muthu S',
      mobile: '9876543210',
      email: 'muthu@farmerdocx.in',
      passwordHash,
      role: 'FARMER',
      preferredLanguage: 'ta',
      farmerProfile: {
        create: {
          state: 'TN',
          district: 'COIMBATORE',
          taluk: 'Kovilpatti Taluk',
          village: 'Kovilpatti',
          pincode: '628501',
          communicationMethod: 'BOTH',
          landHolding: '2.5 Acres',
        },
      },
    },
  });

  const farmerLakshmi = await prisma.user.upsert({
    where: { mobile: '9876543214' },
    update: {},
    create: {
      name: 'Lakshmi B',
      mobile: '9876543214',
      email: 'lakshmi@farmerdocx.in',
      passwordHash,
      role: 'FARMER',
      preferredLanguage: 'as',
      farmerProfile: {
        create: {
          state: 'AS',
          district: 'KAMRUP',
          taluk: 'Kamrup Sector',
          village: 'Kamrup Village',
          pincode: '781001',
          communicationMethod: 'BOTH',
          landHolding: '3.0 Acres',
        },
      },
    },
  });

  // 2. Create Area Admin
  const areaAdminUser = await prisma.user.upsert({
    where: { mobile: '9876543211' },
    update: {},
    create: {
      name: 'Area Admin Kovilpatti',
      mobile: '9876543211',
      email: 'admin@farmerdocx.in',
      passwordHash: adminHash,
      role: 'AREA_ADMIN',
      preferredLanguage: 'en',
      areaAdminProfile: {
        create: {
          employeeId: 'AA-8942',
          isVerified: true,
        },
      },
    },
  });

  // 3. Create Super Admin
  const superAdminUser = await prisma.user.upsert({
    where: { mobile: '9876543212' },
    update: {},
    create: {
      name: 'Super Admin Governance',
      mobile: '9876543212',
      email: 'superadmin@farmerdocx.in',
      passwordHash: superHash,
      role: 'SUPER_ADMIN',
      preferredLanguage: 'en',
    },
  });

  // 4. Create Sample Loan Document with Analysis
  const sampleDoc = await prisma.loanDocument.create({
    data: {
      ownerId: farmerMuthu.id,
      uploadedById: farmerMuthu.id,
      title: 'Sample Agricultural Loan Sanction Letter (Demo)',
      category: 'Loan Sanction Letter',
      institutionName: 'Canara Bank Kovilpatti Branch',
      maskedLoanAccountNumber: 'CNB****4321',
      originalFileName: 'sample_kcc_sanction.pdf',
      storageKey: 'demo/sample_kcc_sanction.pdf',
      mimeType: 'application/pdf',
      fileSize: 2048,
      processingStatus: 'COMPLETED',
      documentLanguage: 'en',
      analysis: {
        create: {
          documentType: 'Kisan Credit Card Sanction Letter',
          summary: 'Fictional Demo Document – Not an Official Bank Document. Sanction letter issued by Canara Bank for ₹1,50,000 at 7% annual interest with 3% prompt repayment subsidy.',
          tamilExplanation: 'இந்த ஆவணத்தின் படி, விவசாயிக்கு ₹1,50,000 கடன் வழங்கப்பட்டுள்ளது. வருடத்திற்கு 7% வட்டி குறிப்பிடப்பட்டுள்ளது. கடனை 12 மாதங்களுக்குள் திருப்பிச் செலுத்த வேண்டும்.',
          englishExplanation: 'According to this sanction letter, an agricultural loan limit of ₹1,50,000 has been sanctioned at 7% annual interest.',
          loanDetailsJson: JSON.stringify({
            loanAmount: '₹1,50,000',
            sanctionedAmount: '₹1,50,000',
            outstandingAmount: '₹1,50,000',
            loanAccountNumberMasked: 'CNB****4321',
            loanType: 'KCC Short Term Crop Loan',
            schemeName: 'Kisan Credit Card Scheme',
            bankName: 'Canara Bank',
          }),
          interestDetailsJson: JSON.stringify({
            interestRate: '7.00% per annum',
            subvention: '3.00% Prompt Repayment Subsidy',
            effectiveRate: '4.00% per annum',
          }),
          repaymentDetailsJson: JSON.stringify({
            repaymentPeriod: '12 Months',
            installmentAmount: '₹1,50,000',
            dueDate: '15-Jul-2026',
          }),
          eligibilityDetailsJson: JSON.stringify(['Crop Hypothecation', 'PMFBY Enrolment']),
          penaltyDetailsJson: JSON.stringify({
            penaltyRate: '2.00% additional interest per annum on overdue principal',
          }),
          importantDatesJson: JSON.stringify({
            'Sanction Date': '12-Jan-2026',
            'Repayment Due Date': '15-Jul-2026',
          }),
          missingInformationJson: JSON.stringify(['Specific land survey number (refer to Chitta record)']),
          authenticityRiskLevel: 'LOW',
          authenticityIndicatorsJson: JSON.stringify([]),
          authenticityDisclaimer: 'This platform explains loan documents and scheme rules. Final confirmation must be obtained from the issuing bank.',
          confidence: 0.98,
        },
      },
    },
  });

  // 5. Seed RAG Knowledge Base
  await prisma.knowledgeBaseDocument.create({
    data: {
      title: 'NABARD Kisan Credit Card Master Guidelines 2025-26',
      category: 'Kisan Credit Card',
      institution: 'NABARD & Reserve Bank of India',
      state: 'ALL',
      topic: 'Interest Subvention',
      language: 'en',
      content: 'Agricultural crop loans up to ₹3,00,000 carry a base interest rate of 7% p.a. Farmers receiving prompt repayment incentive get a 3% subvention, reducing effective interest rate to 4% p.a. Overdue balances after due date attract normal penal interest of 2% p.a.',
      version: '1.0',
      active: true,
      chunks: {
        create: [
          {
            chunkIndex: 0,
            content: 'Agricultural crop loans up to ₹3,00,000 carry a base interest rate of 7% p.a. Farmers receiving prompt repayment incentive get a 3% subvention, reducing effective interest rate to 4% p.a.',
          },
        ],
      },
    },
  });

  console.log('Database seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
