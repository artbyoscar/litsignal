import { SignUp } from "@clerk/nextjs";
import { Zap } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-cyan/10">
            <Zap className="h-6 w-6 text-accent-cyan" />
          </div>
          <span className="text-xl font-semibold text-text-primary">
            LitSignal
          </span>
        </div>
        <SignUp />
      </div>
    </div>
  );
}
