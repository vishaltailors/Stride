import logo from "../assets/images/logo.svg";
import posterImage from "../assets/images/poster.webp";
import { Input, InputRoot, InputWrapper } from "../components/ui/input";
import { FancyButton } from "@/components/ui/fancy-button";
import { Hint, HintIcon } from "@/components/ui/hint";
import {
  RiAlertLine,
  RiEyeLine,
  RiEyeOffLine,
  RiUserLine,
} from "@remixicon/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/signin")({
  component: SignIn,
});

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("vishaltailor@stride.com");
  const [password, setPassword] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "vishaltailor@stride.com" && password === "admin") {
      navigate({ to: "/" });
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left side - Sign in Form */}
      <div className="flex w-full flex-col justify-between p-8 md:w-[60%]">
        <div>
          <img src={logo} alt="Stride Logo" className="h-8 w-8" />
        </div>

        <div className="mx-auto w-full max-w-[360px]">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="relative flex size-[68px] shrink-0 items-center justify-center rounded-full backdrop-blur-xl before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-neutral-500 before:to-transparent before:opacity-10 md:size-24">
              <div className="relative z-10 flex size-12 items-center justify-center rounded-full bg-bg-white-0 shadow-regular-xs ring-1 ring-inset ring-stroke-soft-200 md:size-16">
                <RiUserLine />
              </div>
            </div>
            <h1 className="text-title-h6">Sign in to your account</h1>
            <p className="text-paragraph-sm text-text-sub-600">
              Enter your details to login.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-label-sm text-text-strong-950"
              >
                Email Address<span className="text-error-base">*</span>
              </label>
              <InputRoot hasError={error}>
                <InputWrapper>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(false);
                    }}
                    placeholder="hello@stride.com"
                    required
                  />
                </InputWrapper>
              </InputRoot>
              {error && (
                <Hint hasError={true} className="mt-1">
                  <HintIcon as={RiAlertLine} />
                  Invalid email or password
                </Hint>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-label-sm text-text-strong-950"
              >
                Password<span className="text-error-base">*</span>
              </label>
              <InputRoot hasError={error}>
                <InputWrapper>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError(false);
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="mr-1 text-text-soft-400 hover:text-text-sub-600"
                  >
                    {showPassword ? (
                      <RiEyeOffLine size={20} />
                    ) : (
                      <RiEyeLine size={20} />
                    )}
                  </button>
                </InputWrapper>
              </InputRoot>
            </div>

            <FancyButton
              variant="primary"
              type="submit"
              className="!mt-6 w-full"
            >
              Sign in
            </FancyButton>
          </form>
        </div>

        <div className="text-center text-paragraph-sm">
          <p>© {new Date().getFullYear()} Stride</p>
          <p className="mt-1 text-paragraph-xs tracking-wide text-text-sub-600">
            "MOVE WITH PURPOSE"
          </p>
        </div>
      </div>

      {/* Right side - Background Image */}
      <div className="hidden md:block md:w-[40%]">
        <div
          className="relative h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${posterImage})` }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      </div>
    </div>
  );
}
