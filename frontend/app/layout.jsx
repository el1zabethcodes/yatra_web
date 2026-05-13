import "./globals.css";

export const metadata = {
  title: "Yatra",
  description: "Close the gap, shape the future.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
