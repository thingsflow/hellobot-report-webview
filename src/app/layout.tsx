import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body className={inter.className}>
        <div className="max-w-xl w-full">{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
