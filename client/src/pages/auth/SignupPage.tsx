import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  signupValidator,
  signupValidatorType,
} from "@/validators/signup-validator";

const SignupPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(signupValidator),
  });

  const { mutate: handleSignup, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (values: signupValidatorType) => {
      if (values.password !== values.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/register`,
        {
          email: values.email,
          mobile: values.phoneNumber,
          password: values.password,
        }
      );

      return data as { message: string };
    },
    onSuccess: (data) => {
      toast.success(data.message);

      navigate("/login", { replace: true });
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    },
  });
  return (
    <section className="flex flex-col justify-center items-center w-full h-screen">
      <div className="bg-white w-[90%] sm:w-[50%] md:w-[40%] lg:w-[30%] py-7 rounded-xl flex flex-col justify-center items-center gap-y-7 shadow shadow-gray-500 overflow-y-auto">
        <p className="text-2xl font-bold">
          Clinic<span className="text-emerald-600">Ease</span>
        </p>

        <div className="flex flex-col w-full px-7 gap-y-6">
          <div className="flex flex-col gap-y-2">
            <p className="font-bold text-lg">Sign Up</p>
            <p className="text-sm text-gray-700">
              create an account to continue to{" "}
              <span className="font-semibold">clinicease</span>
            </p>
          </div>

          <form
            className="flex flex-col gap-y-6"
            onSubmit={handleSubmit((data) => handleSignup(data))}
          >
            <div className="flex flex-col gap-y-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
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
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-rose-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-3">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                required
                {...register("confirmPassword", { required: true })}
              />
              {errors.confirmPassword && (
                <p className="text-rose-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Please wait..." : "Signup"}
            </Button>
          </form>
          <div className="flex w-full justify-center">
            <p className="text-sm">
              Already have an account?{" "}
              <Link
                to={"/login/patient"}
                className={`font-semibold hover:text-emerald-600 delay-75 transition-all cursor-pointer ${
                  isPending ? "pointer-events-none" : ""
                }`}
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
