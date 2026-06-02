import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type LoginSignupChoiceProps = {
  redirect?: string | null;
};

function signupHref(path: string, redirect?: string | null) {
  if (redirect && redirect.startsWith("/")) {
    return `${path}?redirect=${encodeURIComponent(redirect)}`;
  }
  return path;
}

function signinHref(redirect?: string | null) {
  if (redirect && redirect.startsWith("/")) {
    return `/login?mode=signin&redirect=${encodeURIComponent(redirect)}`;
  }
  return "/login?mode=signin";
}

/** Server-rendered team vs sponsor choice (no stale client bundle). */
export function LoginSignupChoice({ redirect }: LoginSignupChoiceProps) {
  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <h1
        className="text-center text-2xl font-semibold"
        style={{ color: "#1a1a18" }}
      >
        Create your account
      </h1>
      <p className="mt-2 text-center text-sm" style={{ color: "#6b6960" }}>
        {redirect === "/browse"
          ? "Choose how you want to use Spontus, then complete signup."
          : "Use your .edu email for teams or work email for sponsors."}
      </p>

      <Card
        className="mt-8 p-6"
        style={{ border: "0.5px solid #d5d3cd", background: "white" }}
      >
        <div className="flex flex-col gap-3">
          <Link
            href={signupHref("/signup/team", redirect)}
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 w-full text-base"
            )}
            style={{ background: "#1a3a6e", color: "#f0efeb" }}
          >
            I&apos;m a team
          </Link>
          <p className="px-1 text-center text-xs" style={{ color: "#6b6960" }}>
            College club sports · use your .edu email
          </p>
          <Link
            href={signupHref("/signup/sponsor", redirect)}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 w-full text-base"
            )}
            style={{ borderColor: "#d5d3cd", color: "#1a1a18" }}
          >
            I&apos;m a sponsor
          </Link>
          <p className="px-1 text-center text-xs" style={{ color: "#6b6960" }}>
            Brand or business · use your work email
          </p>
        </div>
      </Card>

      <p className="mt-6 text-center text-sm" style={{ color: "#6b6960" }}>
        Already have an account?{" "}
        <Link
          href={signinHref(redirect)}
          className="underline"
          style={{ color: "#1a3a6e" }}
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
