import { Metadata } from 'next';
import './globals.css'; 
import { ReactNode } from 'react';


export const metadata: Metadata = {
  title: "CIKLUM",
  robots: { index: false, follow: false },
  viewport: { initialScale: 1, width: "device-width" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://www.ciklum.com/hubfs/Brand%20Elements/ciklum_website_favicon_64x64px.png" />
      </head>
      <body>
        <nav style={{ 
          display: 'flex', 
          justifyContent: 'flex-start', 
          alignItems: 'center',   
          padding: '10px 20px',  
          backgroundColor: '#fff'  ,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px', 
        }}>
          <img 
            src="https://www.ciklum.com/hubfs/Assets%20Ciklum%20Theme/Images/Ciklum_Logo.svg" 
            alt="logo" 
            style={{
              height: '40px', 
              width: 'auto' 
            }}
          />
        </nav>

        <div style={{ padding: '20px' }}>
          <main>{children}</main> 
        </div>
      </body>
    </html>
  );
}
