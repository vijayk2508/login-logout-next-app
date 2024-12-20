'use client'
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const userData = JSON.parse(localStorage.getItem("userData") ?? "{}");
  const {
    firstName: name = "",
    image = "",
    email = "",
    gender = "",
  } = userData;

  const handleLogout = () => {
    const rememberedCredentials = localStorage.getItem("rememberedCredentials");
    localStorage.clear();
    if (rememberedCredentials) {
      localStorage.setItem("rememberedCredentials", rememberedCredentials);
    }
    router.push("/");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome to</h1>
        <h2 className="text-3xl font-bold text-indigo-600 mb-6">Unstop</h2>
        <div className="mx-auto w-80 rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
          <Image
            src={image}
            alt={name}
            className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
            width={20}
            height={20}
          />
          <h3 className="text-lg font-bold text-gray-700">{name}</h3>
          <p className="text-sm text-gray-500">{email}</p>
          <p className="text-sm text-gray-500 mb-4">{gender}</p>
          <button 
            onClick={handleLogout}
            className="w-full rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
