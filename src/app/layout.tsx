import React from 'react';
import './globals.css';
import 'reactflow/dist/style.css';
import 'react-toastify/dist/ReactToastify.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
      </head>
      <body>
        <div className="max-w-xl w-full">{children}</div>
        <div id="portal"></div>
      </body>
    </html>
  );
};

export default RootLayout;
