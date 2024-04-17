import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import {ReactNode} from "react";
import Providers from "@/app/providers";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Tour Planning AI",
    description: "Integration with OpenIA",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {

    return (
        <ClerkProvider>
            <html lang="en" data-theme="winter">
                <body className={inter.className}>
                    <Providers>{children}</Providers>
                </body>
            </html>
        </ClerkProvider>

    );
}
