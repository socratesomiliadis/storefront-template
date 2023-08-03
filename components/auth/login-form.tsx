"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import clsx from "clsx";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import LoadingDots from "components/loading-dots";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createAccessToken } from "./actions";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field is required." })
    .email("This is not a valid email."),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const error = await createAccessToken(values.email, values.password);

      if (error) {
        const err = JSON.stringify(error);
        alert(err);
        return;
      }

      router.refresh();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-normal">
                Enter your e-mail
              </FormLabel>
              <FormControl className="mt-2">
                <Input
                  placeholder="Enter e-mail address"
                  type="email"
                  autoComplete="email"
                  className="bg-transparent border-darkGray py-8 text-2xl px-4 placeholder:text-gray text-darkGray"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="w-full flex flex-row items-center justify-between">
                <FormLabel className="text-lg font-normal">
                  Enter your password
                </FormLabel>
              </div>
              <FormControl className="mt-2">
                <Input
                  placeholder="Enter your password"
                  type="password"
                  className="bg-transparent border-darkGray py-8 text-2xl px-4 placeholder:text-gray text-darkGray"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex flex-row items-center gap-4 text-xl">
          <button
            type="submit"
            aria-label="Log-in"
            disabled={isPending}
            className={clsx(
              cn(
                "relative basis-1/3 flex items-center overflow-hidden justify-center rounded-md bg-darkGray p-4 text-white hover:opacity-90",
              ),
              {
                "cursor-not-allowed": isPending,
              },
            )}
          >
            <span
              style={{
                transform: !isPending ? "translateY(0px)" : "translateY(-150%)",
              }}
              className="transition-transform  uppercase duration-300 ease-out"
            >
              Login
            </span>
            <div
              style={{
                transform: isPending
                  ? "translateY(0px) translateX(-50%)"
                  : "translateY(120%) translateX(-50%)",
              }}
              className="absolute transition-transform duration-300 ease-out left-1/2"
            >
              <LoadingDots className="mb-3 w-[0.4rem] h-[0.4rem] bg-white/60" />
            </div>
          </button>
          <button
            aria-label="Create account"
            onClick={() => {}}
            type="button"
            className="basis-2/3  uppercase rounded-md border-[1px] border-darkGray p-4"
          >
            Create an account
          </button>
        </div>
      </form>
    </Form>
  );
}
