export const metadata = {
  title: "LaunchRise Lead Engine",
  description: "Internal lead sourcing + outreach automation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
