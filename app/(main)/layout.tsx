import RootLayout from '@/app/layout';
import { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header>Header</header>
      {children}
    </div>
  );
}
