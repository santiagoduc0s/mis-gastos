"use client";

import { NextUIProvider } from "@nextui-org/react";
import "./globals.css";
import React from "react";
import Navigation from "../components/Navigation";
import Providers from "@/components/Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>Mis gastos</title>
      </head>
      <body>
        <Providers>
          <NextUIProvider>
            <Navigation />
            <main>{children}</main>
          </NextUIProvider>
        </Providers>
      </body>
    </html>
  );
}
