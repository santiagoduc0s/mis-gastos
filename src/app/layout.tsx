"use client";

import { NextUIProvider } from "@nextui-org/react";
import "./globals.css";
import React from "react";
// import Navigation from "../components/Navigation";

import { Provider } from "react-redux";
import { store } from "@/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <Provider store={store}>
          <NextUIProvider>
            {/* <Navigation /> */}
            <main>{children}</main>
          </NextUIProvider>
        </Provider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          limit={1}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light"
        />
      </body>
    </html>
  );
}
