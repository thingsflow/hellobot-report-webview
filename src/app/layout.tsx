import React from 'react';
import './globals.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head>
        <script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
      </head>
      <body>
        <div className="max-w-xl w-full">{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
