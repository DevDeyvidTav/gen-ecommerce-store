import type { Metadata } from "next";
import { Montserrat, Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { CartContext, CartProvider } from "@/contexts";
import { Toaster } from "@/components/ui/sonner";

const montSerrat = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Lojão tudo 18",
  description: "Lojão tudo 18",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <CartProvider>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Lojão tudo 18</title>
        </head>
        <body className={`${montSerrat.className} w-screen max-w-full md:overflow-x-hidden`}>{children}</body>
        <Toaster />
      </CartProvider>
    </html>
  );
}
