import "./globals.css";
import { AuthProvider } from "@/lib/AuthContext";
import FooterGate from "@/components/shared/FooterGate";

export const metadata = {
  title: "Yatra",
  description: "Close the gap, shape the future.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          {children}
          <FooterGate />
        </AuthProvider>
      </body>
    </html>
  );
}
