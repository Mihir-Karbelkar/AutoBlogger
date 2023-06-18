import './globals.css';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import AuthContext from './auth-context';
import { authOptions } from './auth-options';
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
  return (
    <AuthContext session={session}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </AuthContext>
  );
}
