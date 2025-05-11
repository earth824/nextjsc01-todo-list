import '@/app/globals.css';
import { Metadata } from 'next';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

// Home | Basic Todo
// Login | Basic Todo

export const metadata: Metadata = {
  title: {
    template: '%s | Basic Todo',
    default: 'Basic Todo'
  },
  description: "The best todo list app. It's free"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>{children}</body>
    </html>
  );
}
