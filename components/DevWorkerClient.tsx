"use client";

import { useEffect } from "react";

export default function DevWorkerClient() {
  useEffect(() => {
    import("../mocks/browser").then(({ worker }) => {
      worker.start({
        onUnhandledRequest: "bypass",
      });
    });
  }, []);

  return null;
}
