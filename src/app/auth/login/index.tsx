import Divider from "@/app/components/Divider";
import ThirdPartyLoginButton from "@/app/components/ThirdPartyLoginButton";
import Image from "next/image";
import React from "react";
import LoginForm from "./_components/loginForm";

function Login() {
  return (
    <div className="flex flex-row items-center justify-center min-h-screen bg-gray-100">
      <div className="w-2/5 mb-8 py-8 justify-items-center">
        <Image
          aria-hidden
          src="/images/Illustration.png"
          alt="Window icon"
          width={500}
          height={500}
          className="items-center justify-center"
        />
      </div>

      <div className="w-2/5 mx-12 py-4 bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl text-black mb-2">Welcome to</h1>
        <h2 className="text-3xl font-semibold text-blue-800 mb-6">Unstop</h2>

        <ThirdPartyLoginButton
          imageURL="/images/google.png"
          buttonText="Login with Google"
        />

        <ThirdPartyLoginButton
          imageURL="/images/facebook.png"
          buttonText="Login with Facebook"
        />

        <Divider />

        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
