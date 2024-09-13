import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/hooks/useUser";
import {
  loginValidator,
  loginValidatorType,
} from "@/validators/login-validator";
import type { UserType } from "types";

const LoginPage = () => {
  const { setUser } = useUser();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<loginValidatorType>({
    defaultValues: {
      password: "",
      email: "",
      phoneNumber: "",
    },
    resolver: zodResolver(loginValidator),
  });

  const { mutate: handleLogin, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (values: loginValidatorType) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        { ...values },
        { withCredentials: true }
      );

      return data as { message: string; user: UserType };
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setUser(data.user);
      reset();

      //! Push to dashboard according to type of user
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Some error occured. Please try again later!");
      }
    },
  });
  return (
    <section className="flex flex-col justify-center items-center w-full h-screen">
      <div className="bg-white w-[90%] sm:w-[50%] md:w-[40%] lg:w-[30%] py-7 rounded-xl flex flex-col justify-center items-center gap-y-7 shadow shadow-gray-500">
        <p className="text-2xl font-bold">
          Clinic<span className="text-emerald-600">Ease</span>
        </p>

        <div className="flex flex-col w-full px-7 gap-y-6">
          <div className="flex flex-col gap-y-2">
            <p className="font-bold text-lg">Sign In</p>
            <p className="text-sm text-gray-700">
              to continue to <span className="font-semibold">clinicease</span>
            </p>
          </div>

          <form
            className="flex flex-col gap-y-6"
            onSubmit={handleSubmit((data) => handleLogin(data))}
          >
            <div className="flex flex-col gap-y-3">
              <Label htmlFor="email">Email</Label>
              <Input
                placeholder="Enter your email"
                type="email"
                id="email"
                required
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-rose-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-3">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                placeholder="Enter your phone number"
                type="number"
                id="phoneNumber"
                required
                {...register("phoneNumber", { required: true })}
              />
              {errors.phoneNumber && (
                <p className="text-rose-500 text-sm">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-3">
              <Label htmlFor="password">Password</Label>
              <Input
                placeholder="Enter your password"
                type="password"
                id="password"
                required
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-rose-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex justify-between">
              <Link
                to={"/forgot-password"}
                className="text-emerald-600 hover:text-emerald-800 text-sm font-semibold"
              >
                Forgot Password?
              </Link>
            </div>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Please wait..." : "Login"}
            </Button>
          </form>

          <div className="flex w-full justify-center">
            <p className="text-sm">
              Don&apos;t have an account?{" "}
              <Link
                to={"/signup"}
                className={`font-semibold hover:text-emerald-600 delay-75 transition-all cursor-pointer ${
                  isPending ? "pointer-events-none" : ""
                }`}
              >
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
