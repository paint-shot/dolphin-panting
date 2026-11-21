"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/admin-store";

export default function VisitTracker() {
  useEffect(() => {
    const key = "dolphin_visit_logged";
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, "1");
      trackEvent("page_view", "Homepage Visit");
    }
  }, []);

  return null;
}
