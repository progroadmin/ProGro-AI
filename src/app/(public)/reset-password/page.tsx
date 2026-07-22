import { redirect } from "next/navigation";

export default function ResetPasswordPage() {
  redirect("https://app.progro.ai/?mode=login&utm_source=progro.ai&utm_medium=website");
}
