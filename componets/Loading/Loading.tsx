"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LoadingPage() {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate the logo text on mount
    gsap.fromTo(
      logoRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 2, delay: 0.5, ease: "power3.out" }
    );

    // Optional: fade out loading screen after animation
    gsap.to(".loading-page", {
      opacity: 0,
      delay: 3.5,
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: () => {
        const page = document.querySelector(".loading-page") as HTMLElement;
        if (page) page.style.display = "none";
      },
    });
  }, []);

  return (
    <div className="loading-page fixed top-0 left-0 w-full h-full bg-gradient-to-r from-[#2c5364] via-[#203a43] to-[#0f2027] flex flex-col items-center justify-center gap-4 z-50">
      {/* SVG Logo */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 640"
        className="w-36 h-36 stroke-white fill-transparent stroke-[3px]"
      >
        <path d="M479.8 576L384.7 576L276.5 421.5L276.5 512.6L190.1 576L92.4 576L92.4 93.8L132.9 64L240.9 64L364.6 240.1L364.6 127.4L451 64L548.7 64L548.7 525.5L479.8 576zM103.2 99.3L103.2 560L175.2 507.1L175.2 258L390.7 565.6L475.5 565.6L527.9 527.4L449.6 527.4L133.5 76.9L103.3 99.2zM185.7 565.9L265.7 507.1L265.7 406.1L185.9 291.7L185.9 512.6L113.3 565.9L185.6 565.9L185.6 565.9zM145 74.8L455.6 517.4L538 517.4L538 74.8L458.2 74.8L458.2 392.4L235.3 74.8L145 74.8zM375.4 255.6L447.4 358.4L447.4 79.9L375.4 132.9L375.4 255.6z" />
      </svg>

      {/* Text */}
      <div className="name-container h-8 overflow-hidden">
        <div
          ref={logoRef}
          className="logo-name text-white text-xl tracking-[0.75em] uppercase ml-5 font-[Michroma]"
        >
          Nixx
        </div>
      </div>
    </div>
  );
}
