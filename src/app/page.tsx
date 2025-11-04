// ✅ src/app/page.tsx
import { redirect } from "next/navigation";

export default function HomePage() {
  // Automatically redirect from "/" → "/Appointment"
  redirect("/Appointment");

  // This line will never render — just here for safety
  return null;
}
