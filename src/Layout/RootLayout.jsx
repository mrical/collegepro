import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "react-toastify/dist/ReactToastify.css";

import UserProvider from "../context/UserContext";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import EnvelopesProvider from "../context/EnvelopesContext";
function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen justify-between bg-green-500">
      <GoogleOAuthProvider
        clientId={
          "171485559217-ti3rc36r2ejeng9lg772cpbv40hgkkn9.apps.googleusercontent.com"
        }
      >
        <UserProvider>
          <EnvelopesProvider>
            <Header />
            <main className="mb-auto">
              <ToastContainer />
              <Outlet />
            </main>
            <Footer />
          </EnvelopesProvider>
        </UserProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default RootLayout;
