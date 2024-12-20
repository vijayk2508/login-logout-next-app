"use client";

import React, {
  useEffect,
  useActionState,
  useTransition,
  useState,
} from "react";
import { redirect } from "next/navigation";
import InputField from "@/app/components/InputField";
import axios, { AxiosResponse } from "axios";

type ActionState = {
  message: string;
  success: boolean;
} | null;

interface LoginResponse {
  email: string;
  firstName: string;
  gender: string;
  id: string;
  image: string;
  lastName: string;
  username: string;
  accessToken: string;
  refreshToken: string;
}

const loginAction = async (
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  if (formData.get("preventSubmit") === "true") {
    return prevState;
  }

  const username = formData.get("username")?.toString() ?? "";
  const email = formData.get("email")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  if (!username || !password) {
    return { message: "Username and password are required", success: false };
  }

  if (username !== "emilys") {
    return {
      message: "Invalid username. Only 'emilys' is accepted",
      success: false,
    };
  }

  if (password.length < 8) {
    return {
      message: "Password must be at least 8 characters",
      success: false,
    };
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { message: "Invalid email format", success: false };
  }

  try {
    const response: AxiosResponse<LoginResponse> = await axios.post(
      "https://dummyjson.com/auth/login",
      {
        username,
        password,
        expiresInMins: 30,
      },
      {
        withCredentials: false,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    const { accessToken, refreshToken, ...restUserData } = response.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userData", JSON.stringify(restUserData));

    return { message: "Login successful", success: true };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        message: error.response?.data?.message || "Login failed",
        success: false,
      };
    }
    return {
      message: "An error occurred during login",
      success: false,
    };
  }
};

function LoginForm() {
  const [state, dispatch] = useActionState(loginAction, null);
  const [isPending, startTransition] = useTransition();

  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedCredentials = localStorage.getItem('rememberedCredentials');
    if (savedCredentials) {
      const credentials = JSON.parse(savedCredentials);
      setFormValues(credentials);
      setRememberMe(true);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (rememberMe) {
      localStorage.setItem('rememberedCredentials', JSON.stringify(formValues));
    } else {
      localStorage.removeItem('rememberedCredentials');
    }

    startTransition(() => {
      dispatch(formData);
    });
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      redirect("/dashboard");
    }
  }, []);

  useEffect(() => {
    if (state?.success) {
      setTimeout(() => {
        redirect("/dashboard");
      }, 100);
    }
  }, [state?.success]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        icon="/images/account.png"
        label="User name"
        placeholder="username"
        type="text"
        name="username"
        value={formValues.username}
        onChange={handleInputChange}
      />
      <InputField
        icon="/images/email.png"
        label="Email"
        placeholder="username@gmail.com"
        type="email"
        name="email"
        value={formValues.email}
        onChange={handleInputChange}
      />
      <InputField
        icon="/images/key.png"
        label="Password"
        placeholder="********"
        type="password"
        name="password"
        value={formValues.password}
        onChange={handleInputChange}
      />

      <div className="flex flex-row items-center justify-between space-x-4">
        <div className="text-sm text-gray-700">
          <input 
            type="checkbox" 
            id="rememberMe" 
            className="mr-2"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="rememberMe">Remember me</label>
        </div>
        <div className="text-sm text-blue-600 hover:underline cursor-pointer">
          Forgot Password?
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-800 border border-gray-300 rounded-lg py-2 text-white"
        disabled={state?.success}
      >
        {isPending ? "Logging in..." : "Login"}
      </button>

      {state && (
        <p className={`${state.success ? "text-green-600" : "text-red-600"}`}>
          {state.message}
        </p>
      )}

      <div className="flex flex-row items-center justify-center mt-4">
        <p className="text-sm text-gray-700 mr-1">
          Don&apos;t have an account?
        </p>
        <a className="text-blue-600 hover:underline" href="/register">
          Register
        </a>
      </div>
    </form>
  );
}

export default LoginForm;
