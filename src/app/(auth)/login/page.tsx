"use client";
import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/form/input";
import InputPassword from "@/components/form/inputPassword";
import Label from "@/components/form/label";
import GoogleAuth from "@/components/ui/googleAuth";
import Btn from "@/components/button/btn";
import Cover from "@/components/ui/cover";
import Line from "@/components/ui/line";
import Link from "next/link";
import Logo from "@/components/icon/logo";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const [showVisible, setShowVisible] = useState(false);
  const { loginUser, isAuthenticated, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [passwordError, setPasswordError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, authLoading, router]);

  // Don't render if authenticated
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  // PASSWORD VALIDATION FUNCTION
  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&._-])[A-Za-z\d@$!%*#?&._-]{8,}$/;

    if (!regex.test(password)) {
      return "Password must be at least 8 characters, include uppercase, lowercase, number and symbol.";
    }
    return "";
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;

    setFormData({
      ...formData,
      password,
    });

    setPasswordError(validatePassword(password));
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // prevent login if password invalid
    if (passwordError || !formData.password) return;

    setIsLoading(true);

    try {
      await loginUser(formData);

      // RESET FORM
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="grid lg:grid-cols-2 grid-cols-1">
        <div>
          <Cover />
        </div>

        <div className="flex lg:hidden px-4 mt-10 md:px-10">
          <Logo />
        </div>

        <div className="lg:px-14 px-4 md:px-10 dm-font leading-[100%] lg:absolute lg:right-0 lg:top-0 lg:w-1/2 w-full h-full overflow-y-auto">
          <h2 className="font-[700] pt-14 text-[32px] text-[var(--black-white-1200)]">
            Login
          </h2>

          <p className="font-[400] py-3 text-[16px] text-[var(--black-white-700)]">
            Don’t have an account?&nbsp;
            <Link href="/sign-up">
              <span className="leading-[25px] poppins cursor-pointer font-[500] text-[var(--primary-1200)] hover:text-[#078e63]">
                Sign Up
              </span>
            </Link>
          </p>

          <form onSubmit={handleLogin}>
            <div className="mt-[10px]">
              <Label text="Email" />
              <Input
                value={formData.email}
                placeholder="Enter your Email address"
                name="email"
                type="email"
                required
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <div className="mt-[10px]">
              <Label text="Password" />
              <InputPassword
                id="password"
                placeholder="Enter your Password"
                name="password"
                value={formData.password}
                showVisibility={showVisible}
                togglePasswordVisibility={() => setShowVisible(!showVisible)}
                onChange={handlePasswordChange}
                error={passwordError} 
              />
            </div>

            <div className="mt-[20px]">
              <Btn
                disabled={isLoading || passwordError !== ""}
                className="h-[40px] w-full bg-[var(--primary-1200)] hover:bg-[#078e63] text-white rounded-[20px] text-[16px]"
                text={isLoading ? "Loading..." : "Login"}
              />

              <Link href="/forgot-password">
                <p className="font-[400] py-2 flex justify-end text-[16px] text-[var(--primary-1200)] hover:text-[#078e63]">
                  Forgotten Password?
                </p>
              </Link>

              <Line />
            </div>
          </form>

          <GoogleAuth text="Login with Google" title="Login with Facebook" />
        </div>
      </div>
    </div>
  );
}
