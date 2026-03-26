import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Personal-finance-expense-analytics-app/",
  plugins: [react()],
});
