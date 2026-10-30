"use client";

import { useReducedMotion as useMotionPreference } from "motion/react";
import { useEffect, useState } from "react";

// Keep the first client render identical to the server; CSS handles the preference immediately.
export default function useReducedMotion() {
  const preference = useMotionPreference();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated ? preference : null;
}
