import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Job Search Review Dashboard',
  description: 'Daily job search review tool'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
