"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// Dynamically import Spline for client-side rendering
const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

export default function App() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/Offer"); // Redirects to /offer page
  };

  return (
    <div
      className="w-full h-screen cursor-pointer"
      onClick={handleClick}
    >
      <Spline scene="https://prod.spline.design/LqHtFulxlwBYKJaw/scene.splinecode" />
    </div>
  );
}
