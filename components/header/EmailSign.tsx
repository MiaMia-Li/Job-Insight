import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Mail } from "lucide-react";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EmailSign = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!emailPattern.test(email)) {
        setError("Please enter a valid email");
        return;
      } else {
        setError("");
      }

      setLoading(true);
      signIn("resend", { callbackUrl: "/", email: email }).then(() => {
        setLoading(false);
      });
    } catch (error) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      console.error("Error:", error);
    }
  };
  return (
    <form className="space-y-4" onSubmit={handleSignIn}>
      <Input
        className="w-full h-11"
        id="email"
        type="email"
        placeholder="email@example.com"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        disabled={loading}
        type="submit"
        className="w-full h-11 flex items-center justify-center gap-3">
        <Mail className="w-5 h-5" />
        {loading ? "Signing in..." : "Continue with Email"}
      </Button>
    </form>
  );
};

export default EmailSign;
