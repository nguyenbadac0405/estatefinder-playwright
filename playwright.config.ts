import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./tests",

  timeout: 60000,

  use: {
    baseURL: process.env.BASE_URL,

    screenshot: "only-on-failure",

    video: "retain-on-failure",

    trace: "retain-on-failure"
  },

  reporter: [
    ["html"],
    ["list"]
  ]
});