import './globals.css';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import AuthContext from './auth-context';
import { authOptions } from './auth-options';
import { GTM_ID } from './lib/gtm';
import GoogleAnalytics from './components/google-analytics';
import { Suspense } from 'react';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Homepage',
  description: '',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const googleAnalyticsId = GTM_ID;
  return (
    <AuthContext session={session}>
      <html lang="en">
        <head>
          <Suspense>
            <GoogleAnalytics googleAnalyticsId={googleAnalyticsId} />
          </Suspense>
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </AuthContext>
  );
}
