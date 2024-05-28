export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <div className="content">{children}</div>
      </body>
    </html>
  );
}

