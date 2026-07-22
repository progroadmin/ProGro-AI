import { redirect } from "next/navigation";

export default function ForgotPasswordPage() {
  redirect("https://app.progro.ai/?mode=login&utm_source=progro.ai&utm_medium=website");
}
