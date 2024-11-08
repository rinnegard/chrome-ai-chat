import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Chatbot",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
            >
                <div className="bg-stone-400 py-8">
                    <h1 className="text-center font-semibold text-4xl">
                        Chrome Chatbot
                    </h1>
                </div>
                <div className="bg-stone-300 container mx-auto flex-1 p-4 max-w-screen-lg">
                    {children}
                </div>
            </body>
        </html>
    );
}
