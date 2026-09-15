import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Call434Banner from '@/components/Call434Banner';

export const metadata: Metadata = {
  title: 'Farmer Docx 🌾 - Agricultural Loan Document Explainer',
  description: 'Understand Your Agricultural Loan Documents in Simple Language. SIH AGR-09 Solution with Multilingual & Rural Area-Admin Proxy Access.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <LanguageProvider>
            <Call434Banner />
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
