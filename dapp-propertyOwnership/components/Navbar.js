"use client";
import { shortenAddress } from "@/utils/hashChar";
import { useAccountAddress } from "@/zustand/addressStore";
import Link from "next/link";
import React from "react";
import WalletIcon from "@/public/wallet.png";

export default function Navbar() {
  const accountAddress = useAccountAddress((state) => state.accountAddress);
  return (
    <>
      <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-extrabold">
              PropertyApp
            </Link>
          </div>
          <div className="flex space-x-6">
            <Link
              href="/"
              className="font-semibold hover:underline hover:text-indigo-200 transition duration-300"
            >
              Register
            </Link>
            <Link
              href="/owned-property"
              className="font-semibold hover:underline hover:text-indigo-200 transition duration-300"
            >
              My Property
            </Link>
            {accountAddress !== "" && (
              <div className="flex items-center space-x-2">
                <img
                  src={WalletIcon.src}
                  className="w-6 h-6"
                  alt="Wallet Icon"
                />
                <span>{shortenAddress(accountAddress)}</span>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
