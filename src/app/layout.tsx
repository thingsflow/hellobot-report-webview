import './globals.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <div className="max-w-xl w-full">{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
