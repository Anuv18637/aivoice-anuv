import './globals.css'; 
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div style={{ padding: '20px' }}>
          <main>{children}</main> 
        </div>
      </body>
    </html>
  );
}
