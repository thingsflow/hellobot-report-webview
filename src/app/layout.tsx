import React from 'react';
import './globals.css';
import 'reactflow/dist/style.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';

import LayoutWithClient from '@/components/LayoutWithClient';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </head>
      <body>
        <LayoutWithClient>{children}</LayoutWithClient>
        <div id="portal"></div>
      </body>
    </html>
  );
};

export default RootLayout;
