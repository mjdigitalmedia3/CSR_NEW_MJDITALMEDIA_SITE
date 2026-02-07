import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  // Explicit Content-Type prevents browsers from downloading instead of displaying (Vercel/serverless)
  app.use("*", (_req, res) => {
    const htmlPath = path.resolve(distPath, "index.html");
    res.type("text/html");
    res.sendFile(htmlPath);
  });
}
