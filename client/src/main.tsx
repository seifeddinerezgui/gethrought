import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Suspense } from "react";

document.title = "Gethrought - Cabinet d'expertise comptable et d'audit";

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Chargement...</div>}>
    <App />
  </Suspense>
);
