import "./globals.css";

export const metadata = {
  title: "To-Do App",
  description: "A simple Next.js + MongoDB CRUD app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children} {/* ❌ AuthProvider hata diya */}
      </body>
    </html>
  );
}