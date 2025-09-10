export const metadata = {
  title: "Instant Staffing Quote — Staff Latin",
  description: "US vs Latin America salary benchmark with 2–4 week hiring.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
